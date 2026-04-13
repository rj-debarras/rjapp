import { ArrowLeft, CheckCircle2, Shield, Clock } from 'lucide-react';
import EstimatorWizard from '../estimator/EstimatorWizard';

interface Props {
  onReturnHome: () => void;
  onSuccess: () => void;
}

export default function EstimatorView({ onReturnHome, onSuccess }: Props) {
  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      {/* Left Panel - Branding & Value Props (Hidden on mobile to preserve vertical space for the form) */}
      <div className="hidden md:flex md:w-5/12 lg:w-[45%] bg-primary text-white p-8 md:p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Soft Background Accent */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tertiary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 flex-1 flex flex-col justify-center md:justify-start">
          <button 
            onClick={(e) => { e.preventDefault(); onReturnHome(); }} 
            className="flex w-fit items-center gap-2 text-white/70 hover:text-white font-semibold mb-12 md:mb-20 group transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight tracking-tight">
            Votre devis en <span className="text-tertiary">2 minutes</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-md font-medium leading-relaxed">
            Obtenez une estimation immédiate, transparente et sur-mesure pour votre projet de débarras en Île-de-France.
          </p>

          <div className="space-y-8 mt-auto md:mt-0">
            {[
              { icon: <Clock className="w-6 h-6 text-tertiary" />, text: "Intervention sous 24h" },
              { icon: <Shield className="w-6 h-6 text-tertiary" />, text: "100% Sans engagement" },
              { icon: <CheckCircle2 className="w-6 h-6 text-tertiary" />, text: "Tarif transparent et fixe" },
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/5">
                   {prop.icon}
                </div>
                <span className="font-bold text-lg">{prop.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden md:block md:mt-16">
           <p className="text-sm font-bold text-white/30 tracking-widest uppercase">© {new Date().getFullYear()} RJ Débarras</p>
        </div>
      </div>

      {/* Right Panel - The Wizard */}
      <div className="w-full md:w-7/12 lg:w-[55%] p-4 sm:p-8 md:p-12 lg:p-20 flex flex-col bg-surface relative flex-1 min-h-screen md:min-h-0">
        <div className="w-full max-w-2xl mx-auto relative z-20 flex-1 flex flex-col pt-4 sm:pt-10 md:pt-0 md:justify-center">
            {/* Mobile-only back button */}
            <div className="md:hidden flex mb-6 w-full">
                <button 
                  onClick={(e) => { e.preventDefault(); onReturnHome(); }} 
                  className="flex items-center gap-2 text-outline hover:text-primary font-semibold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
                </button>
            </div>
            
            {/* The wizard itself inside a flexible wrapper to pop out on desktop */}
            <div className="md:shadow-2xl md:hover:shadow-3xl transition-shadow duration-500 rounded-[2rem] w-full">
               <EstimatorWizard onSuccess={onSuccess} />
            </div>
        </div>
      </div>
    </div>
  );
}
