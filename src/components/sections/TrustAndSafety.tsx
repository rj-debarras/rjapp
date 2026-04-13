import { ShieldCheck, Leaf, Clock } from 'lucide-react';

export default function TrustAndSafety() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Agencement Discret et Respectueux",
      description: "Notre équipe intervient avec dignité et respect avec un accompagnement empathique du début à la fin."
    },
    {
      icon: <Leaf className="w-6 h-6 text-secondary" />,
      title: "Recyclage Éco-Responsable",
      description: "Plus de 85% des objets récupérés ont droit à une seconde vie via nos partenaires associatifs et centres de tri."
    },
    {
      icon: <Clock className="w-6 h-6 text-tertiary" />,
      title: "Rapidité d'Intervention",
      description: "Nous pouvons intervenir sous 24h dans toute l'Île-de-France, répondant aux urgences les plus strictes."
    }
  ];

  return (
    <section className="py-20 bg-surface-container-lowest relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-primary mb-4">L'art de l'accompagnement</h2>
          <p className="text-lg text-outline">Nous ne faisons pas que vider des maisons, nous fermons un chapitre pour que vous puissiez ouvrir le suivant.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="bg-surface-bright p-8 rounded-2xl hover:shadow-ambient transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-display text-primary mb-3">{item.title}</h3>
              <p className="text-outline leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
