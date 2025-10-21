import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieConsentProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ visible, onAccept, onDecline }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-auto w-full sm:w-[480px] bg-black/85 border border-white/15 rounded-t-2xl sm:rounded-2xl shadow-2xl mx-auto p-6 sm:p-8 backdrop-blur-xl space-y-4 sm:space-y-5"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Manage Cookie Preferences</h3>
                <p className="text-sm text-white/70 mt-1">
                  We use functional cookies to speed up loading screens and remember preferences. You can accept or decline—your choice will update instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/60 bg-white/5 rounded-xl px-4 py-3">
              <ShieldCheck className="w-5 h-5 text-white/70" />
              <span>
                Accepted cookies help us hide the intro loader for 10 minutes and enhance performance. No analytics or marketing cookies are used.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onDecline}
                className="w-full px-4 py-3 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors duration-200 text-sm sm:text-base"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base"
              >
                Accept & Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
