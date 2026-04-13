import { MapPin, FileText, Shield, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import brandIcon from '../../assets/images/brand-icon.png';
import { formatPhoneNumber } from '../../utils/format';

export default function Footer({ onViewChange }: { onViewChange?: (view: any) => void }) {
  return (
    <footer className="bg-primary text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={brandIcon} 
                alt="Icone RJ" 
                className="h-12 md:h-14 w-auto object-contain drop-shadow-xl"
              />
              <span className="font-display font-bold text-2xl text-white tracking-tight mt-1">RJ Débarras</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mt-2">
              Service de débarras professionnel en Île-de-France. Estimation transparente, intervention rapide, recyclage responsable.
            </p>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-display font-bold text-lg mb-1">Contact</h4>
            <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className="flex items-center gap-2 text-white/80 hover:text-tertiary transition-colors text-sm">
              <Phone className="w-4 h-4" />
              {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
            </a>
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              WhatsApp {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
            </a>
            <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
              <Mail className="w-4 h-4" />
              {import.meta.env.VITE_CONTACT_EMAIL}
            </a>
            <span className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              {import.meta.env.VITE_POSTAL_ADDRESS}
            </span>
            <span className="flex items-center gap-2 text-white/60 text-sm">
              <Clock className="w-4 h-4" />
              Lun–Sam : 08h–19h
            </span>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-display font-bold text-lg mb-1">Informations</h4>
            <a href="/devis" onClick={(e) => { e.preventDefault(); onViewChange?.('devis'); }} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm text-left">
              <Clock className="w-4 h-4" />
              États de la demande
            </a>
            <a href="/mentions-legales" onClick={(e) => { e.preventDefault(); onViewChange?.('mentions-legales'); }} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm text-left">
              <FileText className="w-4 h-4" />
              Mentions Légales
            </a>
            <a href="/confidentialite" onClick={(e) => { e.preventDefault(); onViewChange?.('confidentialite'); }} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm text-left">
              <Shield className="w-4 h-4" />
              Politique de Confidentialité
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} RJ Débarras — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
