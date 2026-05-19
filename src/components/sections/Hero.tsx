import { ArrowRight } from 'lucide-react';
import EstimatorWizard from '../estimator/EstimatorWizard';
import heroBg from '../../assets/images/desktop-hero-bg.png';

export default function Hero({ onStartEstimator, onSuccess }: { onStartEstimator: () => void, onSuccess: () => void }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-32 bg-primary lg:bg-transparent text-primary group/hero lg:min-h-[750px] flex items-center">
      
      {/* Unified Background Image Layer */}
      <div className="block absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-primary/100 via-primary/80 to-primary/40 lg:to-transparent z-10" />
        <img 
          src={heroBg} 
          alt="Débarras professionnel" 
          className="w-full h-full object-cover object-[60%_55%] lg:object-[left_52%]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-container mb-8 font-medium shadow-sm backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#8CF5E4] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase">Intervention Rapide IDF</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-display font-extrabold text-white leading-[1.1] mb-4 tracking-tight text-balance">
            L'art de l'accompagnement <br/>
            <span className="text-[#8CF5E4] block mt-2 text-3xl sm:text-4xl lg:text-6xl">depuis 2007.</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-lg font-sans text-balance">
            Libérez votre espace sans effort. De l'estimation au recyclage, nos experts prennent tout en charge.
          </p>
          
          {/* Mobile Actions: Only display on standard devices (< lg) */}
          <div className="flex flex-col sm:flex-row gap-4 lg:hidden">
            <a 
              href="/estimator"
              onClick={(e) => { e.preventDefault(); onStartEstimator(); }}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl bg-secondary text-white font-bold text-base sm:text-lg hover:bg-secondary/90 transition-all shadow-[0_4px_20px_rgba(11,100,104,0.4)] active:scale-95 group cursor-pointer whitespace-nowrap"
            >
              Obtenir mon Devis Gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="hidden lg:flex gap-4">
             <a 
              href="/estimator"
              onClick={(e) => { e.preventDefault(); onStartEstimator(); }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary/80 text-white font-bold text-lg hover:bg-secondary transition-colors cursor-pointer shadow-xl backdrop-blur-md border border-white/20"
             >
              Devis Gratuit Express
              <ArrowRight className="w-5 h-5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Desktop Embedded Wizard */}
        <div className="hidden lg:flex relative h-full w-full max-w-[600px] ml-auto items-center">
            <div className="w-full transform transition-all duration-300 origin-right">
              <EstimatorWizard onSuccess={onSuccess} />
            </div>
        </div>

        {/* Mobile Graphic Removed - Replaced by Global Background Layer */}
      </div>
    </section>
  );
}
