import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X,
  PhoneCall,
  Store,
  Home,
  Layers,
  MessageSquare,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Lock
} from 'lucide-react';
import { User } from '../types';

export type ActivePage = 
  | 'home' 
  | 'catalog' 
  | 'portfolio' 
  | 'contact' 
  | 'profile' 
  | 'chat' 
  | 'checkout'
  | 'admin-login'
  | 'admin-dashboard';

interface NavbarProps {
  currentPage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  user: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  user,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Hidden/Internal page 'checkout', 'admin-login', 'admin-dashboard' are NOT in navLinks
  const navLinks: { id: ActivePage; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'catalog', label: 'Katalog Layanan', icon: Store },
    { id: 'portfolio', label: 'Inspirasi Event', icon: Layers },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'contact', label: 'Konsultasi & Atelier', icon: PhoneCall },
  ];

  return (
    <>
      {/* Floating Island Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-colors">
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-xs uppercase font-bold">NikaHub</span>
                <span className="text-[9px] tracking-wider text-champagne-300 font-sans -mt-1 font-light">Atelier Wedding</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Center Floating Links */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-bezel text-sm font-medium text-emerald-950"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const Icon = link.icon;

              return (
                <button
                  key={link.id}
                  onClick={() => onPageChange(link.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300 text-xs font-semibold cursor-pointer ${
                    isActive 
                      ? 'text-sand bg-emerald-950 shadow-sm' 
                      : 'text-emerald-950/70 hover:text-emerald-950 hover:bg-black/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-champagne-400' : 'text-emerald-950/50'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </motion.nav>

          {/* Right Action Icons */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* Wishlist Pill */}
            <div className="relative">
              <button 
                onClick={() => onPageChange('catalog')}
                className="p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel text-emerald-950 hover:bg-white transition-transform active:scale-95 cursor-pointer"
                title="Favorit"
              >
                <Heart className="w-4 h-4 text-emerald-950/70" />
              </button>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-champagne-500 text-emerald-950 text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Checkout / Halaman CO Drawer Trigger */}
            <button 
              onClick={() => onPageChange('checkout')}
              className="group flex items-center gap-2 p-1.5 pl-3 rounded-full bg-emerald-950 text-sand shadow-bezel border border-emerald-800 hover:bg-emerald-900 transition-all active:scale-95 cursor-pointer"
              title="Halaman Checkout CO"
            >
              <span className="text-xs font-semibold tracking-wider font-sans">
                {cartCount > 0 ? `${cartCount} CO` : 'Menu CO'}
              </span>
              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-champagne-400 group-hover:text-emerald-950 flex items-center justify-center transition-colors">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Email Authentication / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-950/15 text-emerald-950 hover:bg-white transition-all shadow-bezel cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-950 text-sand text-[10px] font-bold flex items-center justify-center uppercase">
                    {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold truncate max-w-[90px] hidden sm:inline">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-950/50" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-emerald-950/10 p-3 space-y-2 text-emerald-950 z-50"
                    >
                      <div className="p-3 rounded-xl bg-sand/60 border border-sand-300">
                        <span className="text-[10px] font-bold text-emerald-950/50 uppercase tracking-wider block">Akun Terverifikasi</span>
                        <p className="text-xs font-bold truncate text-emerald-950 mt-0.5">{user.name || 'Calon Pengantin'}</p>
                        <p className="text-[11px] truncate text-emerald-950/70">{user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onPageChange('checkout');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-950/5 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4 text-emerald-800" />
                          <span>Halaman Checkout / CO ({cartCount})</span>
                        </button>

                        <button
                          onClick={() => {
                            onPageChange('chat');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-950/5 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 text-champagne-700" />
                          <span>Live Chat Concierge</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            onLogout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Keluar (Logout Email)</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs shadow-bezel transition-all active:scale-95 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-950" />
                <span>Login Email</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel text-emerald-950 active:scale-95 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </motion.div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/60 shadow-2xl flex flex-col gap-3 text-emerald-950 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-600" />
                <span className="font-serif font-bold text-lg">Menu NikaHub</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile User Profile Header */}
            {user ? (
              <div className="p-3 rounded-2xl bg-emerald-950 text-sand flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-champagne-300 block">Akun Terhubung</span>
                  <span className="font-bold text-xs truncate block">{user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded-full bg-rose-600/80 text-white text-[10px] font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 rounded-2xl bg-champagne-400 font-bold text-emerald-950 text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk Dengan Email</span>
              </button>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onPageChange(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 px-3 rounded-xl font-medium text-sm flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-emerald-950 text-sand font-bold' 
                      : 'text-emerald-950/80 hover:bg-sand'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-emerald-950/10 space-y-2">
              <button
                onClick={() => {
                  onPageChange('checkout');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-emerald-950 text-sand font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-champagne-400" />
                <span>Buka Halaman CO & Reservasi ({cartCount})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
