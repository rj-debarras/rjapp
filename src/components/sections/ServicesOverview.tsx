import { Sparkles, Recycle, ShieldCheck } from 'lucide-react';
import imgCaves from '../../assets/images/service-caves.png';
import imgSuccession from '../../assets/images/service-succession.png';
import imgDiogene from '../../assets/images/service-diogene.png';

export default function ServicesOverview({ onViewChange }: { onViewChange?: (view: any) => void }) {
  const services = [
    {
      id: "caves",
      title: "Débarras Total",
      desc: "De la cave au grenier, on s'occupe de tout rapidement.",
      img: imgCaves,
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: "succession",
      title: "Succession & Partage",
      desc: "Accompagnement humain lors des transitions de vie.",
      img: imgSuccession,
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: "diogene",
      title: "Syndrome de Diogène",
      desc: "Nettoyage intensif et respectueux dans les cas complexes.",
      img: imgDiogene,
      icon: <Recycle className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-24 bg-surface relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-extrabold text-primary mb-6">Notre Expertise à Votre Service</h2>
          <p className="text-lg text-outline">Nous gérons chaque étape avec soin, vous offrant tranquillité d'esprit et soulagement.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <a 
              key={idx} 
              href={`/${svc.id}`}
              onClick={(e) => {
                e.preventDefault();
                if(onViewChange) {
                  onViewChange(svc.id as any);
                }
              }}
              className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-ambient hover:shadow-lg transition-shadow duration-300 group cursor-pointer border border-surface-container-low block"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={svc.img} 
                  alt={svc.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white bg-primary/80 backdrop-blur-md p-2 rounded-lg flex items-center justify-center border border-white/10">
                  {svc.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold font-display text-primary mb-3">{svc.title}</h3>
                <p className="text-outline">{svc.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
