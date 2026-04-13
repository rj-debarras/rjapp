import { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import brandIcon from '../../assets/images/brand-icon.png';
import { formatPhoneNumber } from '../../utils/format';

interface Props {
  onViewChange: (view: any) => void;
}

export default function Header({ onViewChange }: Props) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else if (y < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/"
          onClick={(e) => { e.preventDefault(); onViewChange('landing'); }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
        >
          <img src={brandIcon} alt="Icone RJ" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
          <span className="font-display font-extrabold text-[18px] md:text-[22px] text-[#1A2E4C] tracking-tight mt-1">RJ Débarras</span>
        </a>

        {/* CTA */}
        <div className="flex gap-4">
          <a className="flex items-center gap-2 bg-gradient-to-r from-tertiary to-[#e55d00] px-5 py-2.5 rounded-full text-white font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95 shadow-[0_2px_12px_rgba(255,107,0,0.4)]" href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`}>
            <Phone className="w-4 h-4" />
            <span className="text-sm md:text-base tracking-wide">{formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
