import { useState, useEffect } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { PortfolioView } from './components/PortfolioView';
import { ContactView } from './components/ContactView';
import { ProfileDetailView } from './components/ProfileDetailView';
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

export function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  
  // Dynamic Products State managed by Admin CRUD (Default clean empty)
  const [products, setProducts] = useState<WeddingProduct[]>(() => {
    try {
      const stored = localStorage.getItem('nikahub_products_data');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<WeddingProduct | null>(null);
  
  // User Email Auth State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('nikahub_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAuthAction, setPendingAuthAction] = useState<(() => void) | null>(null);
  const [authPromptMsg, setAuthPromptMsg] = useState<string | null>(null);
  const [modalInitialMode, setModalInitialMode] = useState<'register' | 'login' | 'verify_pending' | 'verify_success'>('register');
  const [modalInitialEmail, setModalInitialEmail] = useState<string>('');

  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Secret URL Route Detector (/login-berdignas-nikahub) & Email Verification URL query
  useEffect(() => {
    const checkSecretRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.includes('login-berdignas-nikahub') || hash.includes('login-berdignas-nikahub')) {
        const isAdminAuth = sessionStorage.getItem('nikahub_admin_session') === 'authenticated';
        if (isAdminAuth) {
          setCurrentPage('admin-dashboard');
        } else {
          setCurrentPage('admin-login');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    checkSecretRoute();
    window.addEventListener('hashchange', checkSecretRoute);
    window.addEventListener('popstate', checkSecretRoute);

    // Check if URL has ?verify_email=
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const emailToVerify = searchParams.get('verify_email');
      if (emailToVerify) {
        setModalInitialEmail(emailToVerify);
        setModalInitialMode('verify_pending');
        setIsLoginModalOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener('hashchange', checkSecretRoute);
      window.removeEventListener('popstate', checkSecretRoute);
    };
  }, []);

  // Save Products changes to localStorage
  const saveProductsToStorage = (newProds: WeddingProduct[]) => {
    setProducts(newProds);
    try {
      localStorage.setItem('nikahub_products_data', JSON.stringify(newProds));
    } catch (e) {
      console.error('Failed to store products data:', e);
    }
  };

  // Admin CRUD Handlers
  const handleAddProduct = (newProd: WeddingProduct) => {
    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
  };

  const handleUpdateProduct = (updatedProd: WeddingProduct) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    saveProductsToStorage(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProductsToStorage(updated);
  };

  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: WeddingProduct) => {
    setSelectedProduct(product);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLoginModalWithPrompt = (msg?: string, action?: () => void) => {
    setAuthPromptMsg(msg || 'Silakan masuk dengan email Anda terlebih dahulu.');
    if (action) {
      setPendingAuthAction(() => action);
    } else {
      setPendingAuthAction(null);
    }
    setIsLoginModalOpen(true);
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
    } catch (e) {
      console.error('Failed to store user session:', e);
    }
    setIsLoginModalOpen(false);

    if (pendingAuthAction) {
      const action = pendingAuthAction;
      setPendingAuthAction(null);
      setTimeout(() => {
        action();
      }, 300);
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

      setIsCartOpen(true);
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
          onPageChange={handleNavigate}
          cartCount={cartItems.length}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
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
            onBack={() => handleNavigate('catalog')}
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
            onOpenCart={() => setIsCartOpen(true)}
            onRequestLogin={() => openLoginModalWithPrompt('Silakan login dengan Email untuk memulai live chat concierge NikaHub.')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView 
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            user={user}
            onRequestLogin={(msg) => openLoginModalWithPrompt(msg)}
            onNavigateToCatalog={() => handleNavigate('catalog')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
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
            onGoHome={() => handleNavigate('home')}
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
        onClose={() => setIsCartOpen(false)}
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
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
        promptMessage={authPromptMsg}
        initialMode={modalInitialMode}
        initialEmail={modalInitialEmail}
      />

    </div>
  );
}

export default App;
