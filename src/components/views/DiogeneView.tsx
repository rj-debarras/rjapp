import { Lock, Info, Handshake, FileText, Truck, SprayCan, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/format';
import serviceDiogene from '../../assets/images/service-diogene.png';

export default function DiogeneView({ onReturnHome }: { onReturnHome: () => void }) {
  return (
    <div className="bg-surface font-sans text-primary">
      {/* Sticky Header Specific to Details View */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-surface-container-low h-16 flex items-center px-6">
        <a 
          href="/"
          onClick={(e) => { e.preventDefault(); onReturnHome(); }}
          className="flex items-center gap-2 text-primary font-bold hover:text-secondary group focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </a>
      </nav>

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-secondary/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-surface-container-low">
                <Lock className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider text-outline">Secret professionnel garanti</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary leading-[1.1] tracking-tight">
                Syndrome de Diogène : <br/>
                <span className="text-secondary">Vous n'êtes pas seul.</span> Nous sommes là.
              </h1>
              
              <p className="text-lg md:text-xl text-outline max-w-xl leading-relaxed">
                Une intervention discrète, sans jugement, avec un protocole de nettoyage et de désinfection strict. Retrouvez un logement sain en toute confidentialité.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href=`tel:${import.meta.env.VITE_PHONE_NUMBER}`}
                  className="bg-secondary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
                >
                  Demander un accompagnement
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-primary font-semibold hover:bg-surface-container-low transition-colors">
                  <Info className="w-5 h-5" />
                  En savoir plus
                </button>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  className="w-full aspect-square object-cover" 
                  alt="Modern clean interior representing peace" 
                  src={serviceDiogene} 
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[280px] hidden md:block border border-primary/10">
                <p className="text-sm font-medium italic text-primary">"Une équipe humaine qui a su redonner vie à mon foyer avec une patience infinie."</p>
                <p className="text-[10px] font-bold mt-3 uppercase text-outline">— Marc A., Paris</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-4">Notre Protocole Discret</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Vertical Line Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/10 via-secondary/40 to-secondary/10 -translate-x-1/2"></div>
            
            <div className="space-y-16 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-right md:pr-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Évaluation sans jugement</h3>
                  <p className="text-outline max-w-sm md:ml-auto">Premier contact pour comprendre vos besoins et établir un devis sur-mesure dans le respect de votre dignité.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <Handshake className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-12"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-left md:pl-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Tri méticuleux</h3>
                  <p className="text-outline max-w-sm">Recherche et mise de côté des objets de valeur, souvenirs de famille et documents importants.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <FileText className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pr-12"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-right md:pr-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Évacuation sécurisée</h3>
                  <p className="text-outline max-w-sm md:ml-auto">Enlèvement rapide et discret des encombrants vers les centres de tri spécialisés.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <Truck className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-12"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-left md:pl-12">
                  <h3 className="text-xl font-bold text-primary mb-2">Désinfection & Nettoyage</h3>
                  <p className="text-outline max-w-sm">Protocole de décontamination complet avec produits certifiés pour éliminer bactéries et odeurs.</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center shadow-lg border-4 border-surface-container-low">
                  <SprayCan className="text-secondary w-8 h-8" />
                </div>
                <div className="flex-1 md:pr-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-surface-container-lowest p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold font-display text-primary">Une urgence ? Parlez-nous directement</h2>
              <p className="text-lg text-outline">Parlez directement au responsable d'intervention. Discrétion absolue.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className="flex items-center justify-center gap-4 bg-primary text-white py-5 px-8 rounded-xl font-bold text-xl hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                <Phone className="w-6 h-6" />
                {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
              </a>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} className="flex items-center justify-center gap-4 bg-[#25D366] text-white py-5 px-8 rounded-xl font-bold text-xl hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                <MessageCircle className="w-6 h-6" />
                WhatsApp {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
