export default function AvantApresSlider() {
  return (
    <section className="py-24 bg-surface-container-lowest relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-extrabold text-primary mb-6">Le Résultat</h2>
          <p className="text-lg text-outline">Redécouvrez le potentiel de votre espace après notre passage.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 rounded-[2rem] overflow-hidden shadow-ambient bg-surface border-4 border-surface p-2 max-w-5xl mx-auto">
          {/* Avant */}
          <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1590725140246-2007823f66a2?auto=format&fit=crop&w=800&q=80" 
              alt="Avant l'intervention" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-surface-container-lowest text-primary shadow-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error" />
              Avant
            </div>
          </div>
          
          {/* Après */}
          <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Après l'intervention, espace propre" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-surface-container-lowest text-primary shadow-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Après
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
