import { MessageCircle } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/format';

export default function WhatsAppBanner() {
  return (
    <section className="bg-surface py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-secondary rounded-[2.5rem] p-10 md:p-14 text-white shadow-ambient flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-xl relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4">Une urgence ? Parlez-nous sur WhatsApp.</h2>
            <p className="text-secondary-container text-lg">Envoyez-nous directement des photos de votre bien pour une pré-estimation immédiate, sans attente.</p>
          </div>
          
          <div className="relative z-10">
            <a 
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 rounded-xl bg-white text-secondary font-bold text-base md:text-lg hover:bg-surface-container-lowest hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg whitespace-nowrap"
            >
              <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#25D366] shrink-0" />
              <span>WhatsApp {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
