import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
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
  Lock,
  Bell,
  BellRing
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
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  // Dynamic Notifications State (Empty by default, populates only when user is logged in)
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    type: 'chat' | 'system' | 'promo';
    linkTo: ActivePage;
  }>>([]);

  // Sync notifications based on user login status
  useEffect(() => {
    if (user) {
      try {
        const key = `nikahub_notifs_${user.email.toLowerCase()}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          setNotifications(JSON.parse(stored));
        } else {
          // Send initial welcome notification upon login
          const welcomeNotif = [
            {
              id: `welcome-${Date.now()}`,
              title: `Selamat Datang, ${user.name || 'Pengantin'}!`,
              message: 'Akun Anda telah aktif terverifikasi. Tim Concierge NikaHub siap membantu konsultasi reservasi.',
              time: 'Baru saja',
              unread: true,
              type: 'system' as const,
              linkTo: 'chat' as ActivePage
            }
          ];
          setNotifications(welcomeNotif);
          localStorage.setItem(key, JSON.stringify(welcomeNotif));
        }
      } catch {
        setNotifications([]);
      }
    } else {
      // If no user is logged in, notifications must be strictly empty!
      setNotifications([]);
    }
  }, [user]);

  const unreadCount = user ? notifications.filter(n => n.unread).length : 0;

  const handleOpenNotification = (notif: typeof notifications[0]) => {
    const updated = notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n);
    setNotifications(updated);
    if (user) {
      try {
        localStorage.setItem(`nikahub_notifs_${user.email.toLowerCase()}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    setNotificationDropdownOpen(false);
    onPageChange(notif.linkTo);
  };

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
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-40 px-2 sm:px-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto gap-2">
          
          {/* Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel cursor-pointer shrink-0"
            onClick={() => onPageChange('home')}
          >
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-colors">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-400 shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-xs sm:text-xs uppercase font-bold leading-tight">NikaHub</span>
                <span className="text-[8px] sm:text-[9px] tracking-wider text-champagne-300 font-sans -mt-0.5 font-light">Atelier Wedding</span>
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
            className="flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            {/* Wishlist Pill (Desktop/Tablet) */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => onPageChange('catalog')}
                className="p-2 sm:p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel text-emerald-950 hover:bg-white transition-transform active:scale-95 cursor-pointer"
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

            {/* Notification Bell Button (Replaces Menu CO) */}
            <div className="relative">
              <button 
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="group flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 pl-2.5 sm:pl-3 rounded-full bg-emerald-950 text-sand shadow-bezel border border-emerald-800 hover:bg-emerald-900 transition-all active:scale-95 cursor-pointer relative"
                title="Notifikasi & Live Chat"
              >
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider font-sans whitespace-nowrap">
                  Notifikasi
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 group-hover:bg-champagne-400 group-hover:text-emerald-950 flex items-center justify-center transition-colors shrink-0 relative">
                  <Bell className="w-3.5 h-3.5 text-champagne-400 group-hover:text-emerald-950" />
                </div>

                {/* Red Dot Notification Indicator */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 text-white text-[9px] font-bold items-center justify-center border border-white shadow-xs">
                      {unreadCount}
                    </span>
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              <AnimatePresence>
                {notificationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-950/10 p-4 space-y-3 text-emerald-950 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-rose-50 text-rose-600">
                          <BellRing className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-emerald-950">Notifikasi & Update</h4>
                          <span className="text-[10px] text-gray-500 font-medium">
                            {!user 
                              ? 'Silakan masuk akun terlebih dahulu' 
                              : unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Kosong (0 notifikasi baru)'}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setNotificationDropdownOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Area */}
                    {!user ? (
                      <div className="text-center py-6 px-3 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-serif font-bold text-sm text-emerald-950">Belum Masuk Akun</h5>
                          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                            Tidak ada notifikasi yang tampil. Silakan masuk (login) ke akun Anda terlebih dahulu untuk melihat notifikasi pesanan & obrolan Concierge.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setNotificationDropdownOpen(false);
                            onOpenLogin();
                          }}
                          className="px-5 py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                        >
                          Masuk / Daftar Akun
                        </button>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="text-center py-6 px-3 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-800">
                          <Bell className="w-6 h-6" />
                        </div>
                        <h5 className="font-serif font-bold text-sm text-emerald-950">Kosong (Tidak Ada Notifikasi)</h5>
                        <p className="text-xs text-gray-500">Belum ada notifikasi baru untuk akun Anda.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleOpenNotification(notif)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 relative ${
                              notif.unread
                                ? 'bg-rose-50/40 border-rose-200/80 hover:bg-rose-50'
                                : 'bg-[#FAF9F5] border-gray-100 hover:bg-sand/60'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                              notif.type === 'chat' ? 'bg-emerald-950 text-champagne-300' : 'bg-champagne-100 text-emerald-950'
                            }`}>
                              {notif.type === 'chat' ? <MessageSquare className="w-4 h-4 text-champagne-400" /> : <Bell className="w-4 h-4 text-champagne-700" />}
                            </div>

                            <div className="flex-1 min-w-0 pr-3">
                              <div className="flex items-center justify-between mb-0.5">
                                <h5 className="font-bold text-xs text-emerald-950 truncate">{notif.title}</h5>
                                <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-1">{notif.time}</span>
                              </div>
                              <p className="text-[11px] text-emerald-950/75 leading-relaxed line-clamp-2">
                                {notif.message}
                              </p>
                              <span className="text-[10px] font-bold text-emerald-900 hover:underline flex items-center gap-1 mt-1">
                                <span>Buka Halaman Live Chat ↗</span>
                              </span>
                            </div>

                            {notif.unread && (
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 absolute top-3 right-3 shadow-xs animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer Action to open Chat directly */}
                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setNotificationDropdownOpen(false);
                          onPageChange('chat');
                        }}
                        className="w-full py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4 text-champagne-400" />
                        <span>Buka Live Chat Concierge</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Email Authentication / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:p-1.5 sm:pl-3 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-950/15 text-emerald-950 hover:bg-white transition-all shadow-bezel cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-950 text-sand text-[10px] font-bold flex items-center justify-center uppercase shrink-0">
                    {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold truncate max-w-[80px] hidden md:inline">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-950/50 hidden sm:inline" />
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
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs shadow-bezel transition-all active:scale-95 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-950" />
                <span>Login Email</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-bezel text-emerald-950 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
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
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="fixed inset-x-3 top-16 z-50 p-5 rounded-3xl bg-white/98 backdrop-blur-2xl border border-white/60 shadow-2xl flex flex-col gap-3 text-emerald-950 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-600" />
                <span className="font-serif font-bold text-base">Menu NikaHub</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile User Profile Header */}
            {user ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950 text-sand flex items-center justify-between gap-2 shadow-md">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-bold text-champagne-300 block">Akun Terhubung</span>
                  <span className="font-bold text-xs truncate block">{user.name || user.email}</span>
                  <span className="text-[10px] text-sand/70 truncate block">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold shrink-0 hover:bg-rose-700 transition-colors"
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
                className="w-full py-3 rounded-2xl bg-champagne-400 font-bold text-emerald-950 text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk Dengan Email</span>
              </button>
            )}

            <div className="space-y-1 py-1">
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
                    className={`w-full text-left py-3 px-3.5 rounded-2xl font-medium text-xs flex items-center justify-between transition-colors ${
                      isActive 
                        ? 'bg-emerald-950 text-sand font-bold shadow-xs' 
                        : 'text-emerald-950/80 hover:bg-sand/70'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-champagne-400' : 'text-emerald-950/60'}`} />
                      {link.label}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-emerald-950/10 space-y-2">
              <button
                onClick={() => {
                  onPageChange('chat');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-full bg-emerald-950 text-sand font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform relative"
              >
                <Bell className="w-4 h-4 text-champagne-400" />
                <span>Notifikasi & Live Chat Concierge</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold ml-1 animate-pulse">
                    {unreadCount} Baru
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
