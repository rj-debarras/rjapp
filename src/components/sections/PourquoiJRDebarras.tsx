import { CheckCircle2, XCircle } from 'lucide-react';

export default function PourquoiJRDebarras() {
  const us = [
    "Savoir-faire et réputation solides depuis 2007",
    "Estimation gratuite et transparente sous 24h",
    "Valorisation de vos biens (Déduction de la facture)",
    "Tri éco-responsable (dons aux associations)",
    "Nettoyage complet inclus après intervention",
    "Équipe discrète et respectueuse"
  ];
  const them = [
    "Entreprises récentes sans garanties",
    "Devis payant ou opaque",
    "Rien n'est valorisé, tout est jeté",
    "Déchetterie sauvage ou sans tri",
    "Lieux laissés en désordre",
    "Manque de tact dans les moments difficiles"
  ];

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/5 text-primary rounded-full font-bold text-sm tracking-wide uppercase border border-primary/10">
            Entreprise de confiance depuis 2007
          </div>
          <h2 className="text-4xl font-display font-extrabold text-primary mb-6">Pourquoi choisir JR Débarras ?</h2>
          <p className="text-lg text-outline">Forts de nos 17 années d'expérience, nous vous garantissons l'exigence d'un service premium par rapport aux solutions classiques.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Les Autres */}
          <div className="bg-surface p-8 rounded-3xl border border-surface-container-low opacity-90">
            <h3 className="text-2xl font-bold font-display text-outline mb-6">Les autres</h3>
            <ul className="space-y-4">
              {them.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-outline">
                  <XCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* JR Débarras */}
          <div className="bg-primary text-white p-8 rounded-3xl shadow-ambient ring-4 ring-primary/20 relative">
            <div className="absolute -top-4 -right-4 bg-tertiary text-white px-4 py-1 rounded-full font-bold shadow-lg transform rotate-3">
              Le standard JR
            </div>
            <h3 className="text-2xl font-bold font-display mb-6">JR Débarras</h3>
            <ul className="space-y-4">
              {us.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary-container shrink-0 mt-0.5" />
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
