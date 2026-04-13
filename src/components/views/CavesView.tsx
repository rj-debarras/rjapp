import { ArrowLeft, ArrowRight, Warehouse, ClipboardCheck, Truck, Phone, MessageCircle, Recycle } from 'lucide-react';
import serviceCaves from '../../assets/images/service-caves.png';
import { formatPhoneNumber } from '../../utils/format';

export default function CavesView({ onReturnHome, onStartEstimator }: { onReturnHome: () => void, onStartEstimator: () => void }) {
  return (
    <div className="bg-surface font-sans text-primary">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-tertiary/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); onReturnHome(); }}
            className="flex items-center gap-2 text-outline hover:text-primary font-semibold mb-8 group focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </a>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-surface-container-low">
                <Warehouse className="w-4 h-4 text-tertiary" />
                <span className="text-xs font-bold uppercase tracking-wider text-outline">Du sol au plafond</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary leading-[1.1] tracking-tight">
                Débarras Total : <br/>
                <span className="text-tertiary">Cave, Grenier,</span> Maison entière.
              </h1>
              
              <p className="text-lg md:text-xl text-outline max-w-xl leading-relaxed">
                Que ce soit une cave encombrée depuis des années, un grenier inaccessible ou un logement complet à vider, nous débarrassons tout, rapidement et proprement.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStartEstimator}
                  className="bg-tertiary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-tertiary/20 hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Estimer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-primary font-semibold hover:bg-surface-container-low transition-colors border border-surface-container-low">
                  <Phone className="w-5 h-5" />
                  {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
                </a>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  className="w-full aspect-square object-cover" 
                  alt="Caves et greniers débarrassés" 
                  src={serviceCaves} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4">Comment ça marche ?</h2>
            <div className="w-20 h-1.5 bg-tertiary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <ClipboardCheck className="w-8 h-8" />, title: "Estimation", desc: "Visite gratuite ou estimation en ligne pour évaluer le volume à débarrasser." },
              { icon: <Truck className="w-8 h-8" />, title: "Intervention", desc: "Notre équipe arrive avec le matériel adapté. Vous n'avez rien à préparer." },
              { icon: <Recycle className="w-8 h-8" />, title: "Tri & Recyclage", desc: "Chaque objet est trié : don aux associations, recyclage ou mise en déchetterie." },
              { icon: <Warehouse className="w-8 h-8" />, title: "Rendu propre", desc: "Le lieu est laissé propre avec un balayage final inclus dans la prestation." }
            ].map((step, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="w-8 h-0.5 bg-tertiary/30 mx-auto rounded-full"></div>
                <h3 className="text-xl font-bold font-display text-primary">{step.title}</h3>
                <p className="text-outline text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Clear */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4">Ce que nous débarrassons</h2>
            <p className="text-lg text-outline">Peu importe l'état des lieux, nous avons la solution.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Meubles volumineux", "Électroménager", "Vêtements & Textiles", "Livres & Archives",
              "Bibelots & Vaisselle", "Outils & Bricolage", "Déchets verts", "Gravats légers"
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-container-lowest px-4 py-5 rounded-2xl text-center font-medium text-primary border border-surface-container-low hover:border-tertiary/40 transition-colors">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">Prêt à libérer votre espace ?</h2>
          <p className="text-lg text-primary-fixed/80 max-w-xl mx-auto">Obtenez votre estimation gratuite en quelques clics ou appelez-nous directement.</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <button onClick={onStartEstimator} className="bg-tertiary text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              Devis Gratuit
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
