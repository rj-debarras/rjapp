import { Check } from 'lucide-react';

export default function PricingTiers({ onStartEstimator }: { onStartEstimator: () => void }) {
  const tiers = [
    {
      title: "Débarras Gratuit",
      subtitle: "La valeur de récupération couvre exactement les frais.",
      features: ["Valorisation égale aux frais", "Tri et recyclage", "Balayage final"],
      price: "0€",
      popular: false
    },
    {
      title: "Débarras Rémunéré",
      subtitle: "Vos éléments de valeur excèdent le coût du débarras.",
      features: ["Rachat comptant de vos biens", "Déduction immédiate", "Assurance casse incluse", "Intervention prioritaire"],
      price: "Rémunération",
      popular: true
    },
    {
      title: "Débarras Classique",
      subtitle: "Prestation facturée au m³ et au poids.",
      features: ["Volume de déchets important", "Aucune valorisation possible", "Mise en déchetterie pro"],
      price: "Sur Devis",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-extrabold mb-6">Nos 3 Formules</h2>
          <p className="text-lg text-primary-fixed/80">L'estimation la plus juste, adaptée à la valeur de votre contenu.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl flex flex-col bg-[#0A1F44] transition-all
                ${tier.popular ? 'ring-4 ring-tertiary shadow-[0_0_30px_rgba(255,107,0,0.3)] transform md:-translate-y-4' : 'border border-[#1E3A8A]/30'}
              `}
            >
              {tier.popular && (
                <span className="bg-tertiary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full self-start mb-6">
                  Plus Populaire
                </span>
              )}
              <h3 className="text-2xl font-bold font-display mb-2">{tier.title}</h3>
              <p className="text-primary-fixed/70 mb-8 min-h-[3rem]">{tier.subtitle}</p>
              
              <div className="text-3xl font-extrabold font-display mb-8 text-white">{tier.price}</div>
              
              <ul className="mb-10 space-y-4 flex-1">
                {tier.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-3 text-primary-fixed/90">
                    <Check className={`w-4 h-4 shrink-0 ${tier.popular ? 'text-tertiary' : 'text-secondary'}`} />
                    {feat}
                  </li>
                ))}
              </ul>
              <a 
                href="/estimator"
                onClick={(e) => { e.preventDefault(); onStartEstimator(); }}
                className={`w-full py-4 rounded-xl font-bold text-center text-lg transition-transform hover:-translate-y-1 block ${
                  tier.popular ? 'bg-tertiary text-white' : 'bg-white text-primary hover:bg-surface-container-lowest'
                }`}
              >
                Estimer mon bien
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
