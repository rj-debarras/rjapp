export default function ProcessSteps() {
  const steps = [
    {
      num: "1",
      title: "Estimez en ligne",
      description: "Remplissez notre formulaire ou envoyez-nous des photos via WhatsApp pour une première approche en quelques minutes."
    },
    {
      num: "2",
      title: "Recevez votre devis",
      description: "Nous validons avec vous le volume et la valeur des objets pour un devis final gratuit et sans engagement."
    },
    {
      num: "3",
      title: "On s'occupe de tout",
      description: "Notre équipe intervient rapidement. On vide, on trie, et on recycle. Vous récupérez vos clés sans aucun effort."
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface-container-lowest relative">
      <div className="max-w-3xl mx-auto text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-display font-black mb-16 tracking-tight text-primary text-center">Le processus le plus simple</h2>
        
        <div className="relative max-w-xl mx-auto">
          {/* Left-aligned vertical connecting line */}
          <div className="absolute top-8 bottom-8 left-[2rem] w-0.5 bg-outline/20 z-0 hidden sm:block"></div>
          
          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start relative z-10 w-full group text-center sm:text-left">
                {/* Orange Circle with white ring to cut out the line */}
                <div className="shrink-0 w-16 h-16 rounded-full bg-tertiary text-primary flex items-center justify-center text-2xl font-bold shadow-lg ring-8 ring-surface-container-lowest group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {step.num}
                </div>
                
                <div className="sm:pt-2">
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-outline text-base md:text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
