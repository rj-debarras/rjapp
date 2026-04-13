import { ArrowLeft, ArrowRight, Scale, Phone, MessageCircle, Heart, ClipboardList, HandHeart, Gem, Truck } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/format';
import serviceSuccession from '../../assets/images/service-succession.png';

export default function SuccessionView({ onReturnHome, onStartEstimator }: { onReturnHome: () => void, onStartEstimator: () => void }) {
  return (
    <div className="bg-surface font-sans text-primary">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-secondary/10"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
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
                <Heart className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider text-outline">Accompagnement humain</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary leading-[1.1] tracking-tight">
                Succession & Partage : <br/>
                <span className="text-secondary">avec respect</span> et dignité.
              </h1>
              
              <p className="text-lg md:text-xl text-outline max-w-xl leading-relaxed">
                Le départ d'un proche est un moment délicat. Nous vous accompagnons dans le vide de la succession avec empathie, en préservant les souvenirs qui comptent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStartEstimator}
                  className="bg-secondary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Demander un accompagnement
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-primary font-semibold hover:bg-surface-container-low transition-colors border border-surface-container-low">
                  <Phone className="w-5 h-5" />
                  {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
                </a>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  className="w-full aspect-square object-cover" 
                  alt="Accompagnement succession respectueux" 
                  src={serviceSuccession} 
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[280px] hidden md:block border border-primary/10">
                <p className="text-sm font-medium italic text-primary">"Un service humain et bienveillant dans un moment très difficile. Merci infiniment."</p>
                <p className="text-[10px] font-bold mt-3 uppercase text-outline">— Sophie L., Versailles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4">Notre Approche</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/10 via-secondary/40 to-secondary/10 -translate-x-1/2"></div>
            
            <div className="space-y-16 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-right md:pr-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Premier contact bienveillant</h3>
                  <p className="text-outline max-w-sm md:ml-auto">Nous prenons le temps d'écouter votre situation et d'évaluer vos besoins spécifiques avec empathie.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <HandHeart className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-12"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-left md:pl-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Inventaire & Valorisation</h3>
                  <p className="text-outline max-w-sm">Identification des objets de valeur, meubles anciens, œuvres d'art. Tout est estimé et peut être déduit du coût.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <Gem className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pr-12"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-right md:pr-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Partage équitable</h3>
                  <p className="text-outline max-w-sm md:ml-auto">Nous facilitons le partage des biens entre héritiers avec un inventaire clair et détaillé.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <Scale className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-12"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-left md:pl-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Débarras & Remise en état</h3>
                  <p className="text-outline max-w-sm">Évacuation complète, nettoyage final. Le bien est prêt à être vendu ou loué.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <Truck className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pr-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4">Un service pensé pour ces moments</h2>
            <p className="text-lg text-outline max-w-2xl mx-auto">Nous comprenons que chaque succession est unique. Notre engagement est de vous simplifier la vie.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Respect & Discrétion", desc: "Pas de jugement, pas de pression. Votre rythme est le nôtre." },
              { icon: <ClipboardList className="w-6 h-6" />, title: "Inventaire détaillé", desc: "Chaque objet de valeur est répertorié et proposé à la vente ou restitué aux familles." },
              { icon: <Scale className="w-6 h-6" />, title: "Prix juste & transparent", desc: "Devis clair sans surprise. La valorisation des biens réduit votre facture." }
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container-low text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-primary">{item.title}</h3>
                <p className="text-outline text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">Besoin d'accompagnement ?</h2>
          <p className="text-lg text-primary-fixed/80 max-w-xl mx-auto">Nous sommes là pour vous épauler. Contactez-nous pour un premier échange sans engagement.</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className="bg-white text-primary py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
            </a>
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
