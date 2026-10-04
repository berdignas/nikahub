import { useState, useEffect, useRef } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { PortfolioView } from './components/PortfolioView';
import { ContactView } from './components/ContactView';
import { ProfileDetailView } from './components/ProfileDetailView';
import { ClientProfileView } from './components/ClientProfileView';
import { ChatView } from './components/ChatView';
import { CheckoutView } from './components/CheckoutView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { LoginModal } from './components/LoginModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { WEDDING_PRODUCTS } from './data/mockData';
import { WeddingProduct, ProductCategory, BookingItem, User } from './types';
import confetti from 'canvas-confetti';
import { 
  fetchProductsFromSupabase, 
  saveProductToSupabase, 
  deleteProductFromSupabase, 
  syncLocalProductsToSupabase,
  supabase 
} from './lib/supabase';

const getSecretRoutePage = (): ActivePage => {
  try {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;

    if (
      path.includes('login-berdignas-nikahub') ||
      hash.includes('login-berdignas-nikahub') ||
      search.includes('login-berdignas-nikahub') ||
      search.includes('admin')
    ) {
      const isAdminAuth = sessionStorage.getItem('nikahub_admin_session') === 'authenticated';
      return isAdminAuth ? 'admin-dashboard' : 'admin-login';
    }
  } catch {
    // ignore
  }
  return 'home';
};

export function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>(getSecretRoutePage);
  const currentPageRef = useRef<ActivePage>(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);
  
  // Dynamic Products State synchronized with Supabase Database
  const [products, setProducts] = useState<WeddingProduct[]>(() => {
    try {
      const stored = localStorage.getItem('nikahub_products_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) return parsed;
      }
      return WEDDING_PRODUCTS;
    } catch {
      return WEDDING_PRODUCTS;
    }
  });

  // Sync with Supabase on mount and subscribe to Realtime updates
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const dbProducts = await fetchProductsFromSupabase();
        if (isMounted) {
          if (dbProducts && dbProducts.length > 0) {
            setProducts(dbProducts);
          } else {
            // Check if there are local products to migrate
            const stored = localStorage.getItem('nikahub_products_data');
            if (stored) {
              const localProds = JSON.parse(stored);
              if (localProds.length > 0) {
                setProducts(localProds);
                syncLocalProductsToSupabase().then(() => {
                  fetchProductsFromSupabase().then(res => {
                    if (isMounted && res.length > 0) setProducts(res);
                  });
                });
              }
            }
          }
        }
      } catch (err) {
        console.error('Error loading products from Supabase:', err);
      }
    };

    loadProducts();

    // Realtime listener for catalog changes
    const channel = supabase
      .channel('realtime-products-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          loadProducts();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<WeddingProduct | null>(null);
  
  // User Email Auth State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('nikahub_user') || localStorage.getItem('nikahub_active_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAuthAction, setPendingAuthAction] = useState<(() => void) | null>(null);
  const [authPromptMsg, setAuthPromptMsg] = useState<string | null>(null);
  const [modalInitialMode, setModalInitialMode] = useState<'register' | 'login' | 'verify_pending' | 'verify_success'>('login');
  const [modalInitialEmail, setModalInitialEmail] = useState<string>('');

  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Push Nav State helper to sync browser history stack with SPA state
  const pushNavState = (
    page: ActivePage,
    productId: string | null = selectedProduct?.id || null,
    cartOpen: boolean = isCartOpen,
    loginOpen: boolean = isLoginModalOpen
  ) => {
    const state = {
      page,
      selectedProductId: productId,
      isCartOpen: cartOpen,
      isLoginModalOpen: loginOpen,
      timestamp: Date.now()
    };
    window.history.pushState(state, '', window.location.href);
  };

  // Ensure history state always has a guard entry when on home dashboard
  useEffect(() => {
    if (currentPage === 'home') {
      if (!window.history.state || (window.history.state.page !== 'home_guard' && window.history.state.page !== 'home')) {
        window.history.pushState({ page: 'home_guard', timestamp: Date.now() }, '', window.location.href);
      }
    }
  }, [currentPage]);

  // Secret URL Route Detector (/login-berdignas-nikahub, #login-berdignas-nikahub, ?login-berdignas-nikahub) & Mobile Hardware Back Navigation
  useEffect(() => {
    const checkSecretRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      if (
        path.includes('login-berdignas-nikahub') ||
        hash.includes('login-berdignas-nikahub') ||
        search.includes('login-berdignas-nikahub') ||
        search.includes('admin')
      ) {
        const isAdminAuth = sessionStorage.getItem('nikahub_admin_session') === 'authenticated';
        return isAdminAuth ? ('admin-dashboard' as ActivePage) : ('admin-login' as ActivePage);
      }
      return 'home' as ActivePage;
    };

    const initialPage = checkSecretRoute();
    if (initialPage !== 'home') {
      setCurrentPage(initialPage);
    }

    // Initialize root history state to prevent exiting browser on initial back press
    if (!window.history.state || !window.history.state.page) {
      const baseState = {
        page: 'home_base',
        selectedProductId: null,
        isCartOpen: false,
        isLoginModalOpen: false,
        isRoot: true,
        timestamp: Date.now()
      };
      window.history.replaceState(baseState, '', window.location.href);
      window.history.pushState({ ...baseState, page: initialPage === 'home' ? 'home_guard' : initialPage, isRoot: false }, '', window.location.href);
    }

    // Check if URL has ?verify_email= (From email button link)
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const emailToVerify = searchParams.get('verify_email');
      if (emailToVerify) {
        const cleanEmail = emailToVerify.trim().toLowerCase();
        
        // Auto-verify user in localStorage
        try {
          const storedStr = localStorage.getItem('nikahub_users');
          const usersMap = storedStr ? JSON.parse(storedStr) : {};
          if (usersMap[cleanEmail]) {
            usersMap[cleanEmail].isVerified = true;
          } else {
            usersMap[cleanEmail] = {
              email: cleanEmail,
              name: cleanEmail.split('@')[0],
              createdAt: new Date().toISOString(),
              isVerified: true
            };
          }
          localStorage.setItem('nikahub_users', JSON.stringify(usersMap));
        } catch {
          // ignore
        }

        // Notify server of verification
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail })
        }).catch(() => null);

        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setModalInitialEmail(cleanEmail);
        setModalInitialMode('login');
        setAuthPromptMsg(`✨ Email ${cleanEmail} berhasil diverifikasi! Masukkan kata sandi Anda untuk langsung masuk ke Dashboard.`);
        setIsLoginModalOpen(true);

        // Clean query parameter from URL without page reload
        const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
        window.history.replaceState({ ...window.history.state, isLoginModalOpen: false }, document.title, cleanUrl);
      }
    } catch {
      // ignore
    }

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;

      // Close open modals/drawers cleanly on back button
      setIsLoginModalOpen(false);
      setIsCartOpen(false);

      if (state && state.page) {
        if (state.page === 'home' || state.page === 'home_base' || state.page === 'home_guard') {
          setCurrentPage('home');
          setSelectedProduct(null);
          return;
        }

        setCurrentPage(state.page);
        if (state.selectedProductId) {
          const found = products.find(p => p.id === state.selectedProductId) || WEDDING_PRODUCTS.find(p => p.id === state.selectedProductId);
          if (found) {
            setSelectedProduct(found);
          }
        } else {
          setSelectedProduct(null);
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash.includes('login-berdignas-nikahub') || window.location.hash.includes('admin')) {
        const isAdminAuth = sessionStorage.getItem('nikahub_admin_session') === 'authenticated';
        setCurrentPage(isAdminAuth ? 'admin-dashboard' : 'admin-login');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [products]);

  // Save Products changes to localStorage
  const saveProductsToStorage = (newProds: WeddingProduct[]) => {
    setProducts(newProds);
    try {
      localStorage.setItem('nikahub_products_data', JSON.stringify(newProds));
    } catch (e) {
      console.error('Failed to store products data:', e);
    }
  };

  // Admin CRUD Handlers (Synchronized to Supabase Database)
  const handleAddProduct = async (newProd: WeddingProduct) => {
    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
    try {
      await saveProductToSupabase(newProd);
    } catch (e) {
      console.error('Failed to sync added product to Supabase:', e);
    }
  };

  const handleUpdateProduct = async (updatedProd: WeddingProduct) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    saveProductsToStorage(updated);
    try {
      await saveProductToSupabase(updatedProd);
    } catch (e) {
      console.error('Failed to sync updated product to Supabase:', e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProductsToStorage(updated);
    try {
      await deleteProductFromSupabase(productId);
    } catch (e) {
      console.error('Failed to sync deleted product to Supabase:', e);
    }
  };

  const handleNavigate = (page: ActivePage, pushToHistory = true) => {
    setCurrentPage(page);
    setIsCartOpen(false);
    setIsLoginModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushToHistory) {
      pushNavState(page, null, false, false);
    }
  };

  const handleSelectProduct = (product: WeddingProduct, pushToHistory = true) => {
    setSelectedProduct(product);
    setCurrentPage('profile');
    setIsCartOpen(false);
    setIsLoginModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushToHistory) {
      pushNavState('profile', product.id, false, false);
    }
  };

  const handleBackNavigation = (fallbackPage: ActivePage = 'home') => {
    if (window.history.state && !window.history.state.isRoot) {
      window.history.back();
    } else {
      handleNavigate(fallbackPage);
    }
  };

  const handleOpenCart = (pushToHistory = true) => {
    setIsCartOpen(true);
    if (pushToHistory) {
      pushNavState(currentPage, selectedProduct?.id || null, true, isLoginModalOpen);
    }
  };

  const handleCloseCart = () => {
    if (window.history.state?.isCartOpen) {
      window.history.back();
    } else {
      setIsCartOpen(false);
    }
  };

  const openLoginModalWithPrompt = (msg?: string, action?: () => void, pushToHistory = false) => {
    setAuthPromptMsg(msg || 'Silakan masuk dengan email Anda terlebih dahulu.');
    if (action) {
      setPendingAuthAction(() => action);
    } else {
      setPendingAuthAction(null);
    }
    setModalInitialMode('login');
    setIsLoginModalOpen(true);
    if (pushToHistory) {
      pushNavState(currentPage, selectedProduct?.id || null, isCartOpen, true);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    if (window.history.state?.isLoginModalOpen) {
      window.history.replaceState({ ...window.history.state, isLoginModalOpen: false }, document.title, window.location.href);
    }
  };

  const requireAuth = (action: () => void, promptMsg?: string) => {
    if (user) {
      action();
    } else {
      openLoginModalWithPrompt(promptMsg, action);
    }
  };

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem('nikahub_user', JSON.stringify(newUser));
      localStorage.setItem('nikahub_active_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to store user session:', e);
    }
    handleCloseLoginModal();

    if (pendingAuthAction) {
      const action = pendingAuthAction;
      setPendingAuthAction(null);
      setTimeout(() => {
        action();
      }, 200);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('nikahub_user');
    } catch (e) {
      console.error('Failed to clear user session:', e);
    }
  };

  const handleAddToCart = (product: WeddingProduct, eventDate?: string) => {
    requireAuth(() => {
      setCartItems(prev => {
        const exists = prev.find(item => item.product.id === product.id);
        if (exists) {
          return prev;
        }
        return [...prev, { product, quantity: 1, eventDate }];
      });

      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 }
      });

      handleOpenCart();
    }, `Silakan login dengan Email Anda terlebih dahulu untuk memesan paket ${product.title}.`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-sand text-emerald-950 font-sans selection:bg-champagne-300">
      
      {/* Floating Island Navbar (Hidden on Admin pages) */}
      {currentPage !== 'admin-login' && currentPage !== 'admin-dashboard' && (
        <Navbar 
          currentPage={currentPage}
          onPageChange={(page) => handleNavigate(page)}
          cartCount={cartItems.length}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => handleOpenCart()}
          user={user}
          onOpenLogin={() => openLoginModalWithPrompt('Masuk dengan email aktif Anda untuk reservasi & konsultasi chat.')}
          onLogout={handleLogout}
        />
      )}

      {/* Main Page Routing View */}
      <main>
        {currentPage === 'home' && (
          <HomeView 
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onNavigateToContact={() => handleNavigate('contact')}
            featuredProducts={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogView 
            products={products}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onSelectProduct={handleSelectProduct}
            onQuickBook={(prod) => handleAddToCart(prod)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'profile' && selectedProduct && (
          <ProfileDetailView 
            product={selectedProduct}
            onBack={() => handleBackNavigation('catalog')}
            onAddToCart={handleAddToCart}
            onSelectOtherProduct={handleSelectProduct}
            allProducts={products}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioView />
        )}

        {currentPage === 'chat' && (
          <ChatView 
            user={user}
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onOpenCart={() => handleOpenCart()}
            onRequestLogin={() => openLoginModalWithPrompt('Silakan login dengan Email untuk memulai live chat concierge NikaHub.')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView 
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            user={user}
            onRequestLogin={(msg) => openLoginModalWithPrompt(msg)}
            onNavigateToCatalog={() => handleBackNavigation('catalog')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}

        {currentPage === 'client-profile' && user && (
          <ClientProfileView 
            user={user}
            onLogout={handleLogout}
            wishlistIds={wishlistIds}
            allProducts={products}
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* SECRET ADMIN LOGIN PAGE (/login-berdignas-nikahub) */}
        {currentPage === 'admin-login' && (
          <AdminLoginView 
            onLoginSuccess={() => setCurrentPage('admin-dashboard')}
            onGoHome={() => handleNavigate('home')}
          />
        )}

        {/* SECRET ADMIN DASHBOARD PAGE */}
        {currentPage === 'admin-dashboard' && (
          <AdminDashboardView 
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onLogoutAdmin={() => {
              sessionStorage.removeItem('nikahub_admin_session');
              handleNavigate('home');
            }}
          />
        )}
      </main>

      {/* Global Footer (Hidden on Admin pages) */}
      {currentPage !== 'admin-login' && currentPage !== 'admin-dashboard' && (
        <Footer />
      )}

      {/* Reservation Cart Slide-over Drawer (Menu CO) */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        user={user}
        onRequestLogin={(msg) => openLoginModalWithPrompt(msg)}
        onOpenCheckoutPage={() => {
          setIsCartOpen(false);
          handleNavigate('checkout');
        }}
      />

      {/* Email Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLogin={handleLoginSuccess}
        promptMessage={authPromptMsg}
        initialMode={modalInitialMode}
        initialEmail={modalInitialEmail}
      />

    </div>
  );
}

export default App;


