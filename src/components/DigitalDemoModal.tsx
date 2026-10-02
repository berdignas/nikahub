import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Smartphone, Monitor, Sparkles } from 'lucide-react';

interface DigitalDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  demoUrl: string;
}

export const DigitalDemoModal: React.FC<DigitalDemoModalProps> = ({
  isOpen,
  onClose,
  title,
  demoUrl,
}) => {
  const [deviceView, setDeviceView] = React.useState<'mobile' | 'desktop'>('mobile');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[90vh] bg-emerald-950 rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden z-10 text-sand"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-emerald-900 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate max-w-xs sm:max-w-md">
                  Live Preview: {title}
                </h3>
                <p className="text-[11px] text-champagne-300">
                  Uji coba tampilan interaktif & musik undangan digital
                </p>
              </div>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-2">
              {/* Device Toggle */}
              <div className="flex bg-emerald-950 p-1 rounded-full border border-white/10 text-xs hidden sm:flex">
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    deviceView === 'mobile' ? 'bg-champagne-400 text-emerald-950' : 'text-sand/70 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    deviceView === 'desktop' ? 'bg-champagne-400 text-emerald-950' : 'text-sand/70 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              </div>

              {/* Open in new tab link */}
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-sand transition-colors flex items-center gap-1.5"
              >
                <span>Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5 text-champagne-400" />
              </a>

              {/* Close Modal */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Preview Frame */}
          <div className="flex-1 bg-[#121711] p-2 sm:p-6 flex items-center justify-center overflow-hidden relative">
            <div className={`transition-all duration-300 h-full ${
              deviceView === 'mobile'
                ? 'w-[375px] max-w-full rounded-[2.5rem] border-[10px] border-emerald-900 shadow-2xl overflow-hidden'
                : 'w-full h-full rounded-2xl border border-white/10 overflow-hidden'
            }`}>
              <iframe
                src={demoUrl}
                title={title}
                className="w-full h-full bg-white border-0"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
