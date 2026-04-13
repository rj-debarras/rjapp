import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function QuickEstimator({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    propertyType: 'Appartement',
    volume: 50,
    floorInfo: 'RDC',
    hasElevator: false,
    hasValuables: false,
    fullName: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_type: formData.propertyType,
          estimated_volume_m2: formData.volume,
          floor_level: formData.floorInfo,
          has_elevator: formData.hasElevator,
          has_valuables: formData.hasValuables,
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email
        }),
      });

      if (!res.ok) throw new Error('Erreur réseau');
      onSuccess();
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-ambient border border-white/20 relative w-full h-full max-w-[450px] ml-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-primary tracking-tight">Votre devis immédiat</h3>
        <p className="text-sm text-outline mt-1">Gratuit et sans engagement. Réponse sous 2H.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary uppercase tracking-wider">Type de Bien</label>
            <select 
              value={formData.propertyType}
              onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
              className="w-full bg-surface border-none text-primary rounded-xl focus:ring-secondary py-3 text-sm font-medium cursor-pointer"
            >
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
              <option value="Cave">Cave / Box</option>
              <option value="Diogène">Logement Diogène</option>
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary uppercase tracking-wider">Surface (m²)</label>
            <div className="relative">
              <input 
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value) || 0})}
                className="w-full bg-surface border-none text-primary rounded-xl focus:ring-secondary py-3 text-sm font-medium"
                min="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline text-sm font-bold opacity-50">m²</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary uppercase tracking-wider">Étage</label>
            <select 
              value={formData.floorInfo}
              onChange={(e) => setFormData({...formData, floorInfo: e.target.value})}
              className="w-full bg-surface border-none text-primary rounded-xl focus:ring-secondary py-3 text-sm font-medium cursor-pointer"
            >
              <option value="RDC">Rez-de-chaussée</option>
              <option value="1-3">1er - 3ème étage</option>
              <option value="4+">4ème ou plus</option>
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
             <label className="flex items-center gap-2 cursor-pointer bg-surface px-4 py-3 rounded-xl border border-transparent hover:border-secondary/20 transition-colors h-full">
              <input 
                type="checkbox"
                checked={formData.hasElevator}
                onChange={(e) => setFormData({...formData, hasElevator: e.target.checked})}
                className="rounded text-secondary focus:ring-secondary cursor-pointer"
              />
              <span className="text-sm font-semibold text-primary">Ascenseur ?</span>
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
           <label className="flex items-center gap-3 cursor-pointer bg-surface px-4 py-3 rounded-xl border border-transparent hover:border-secondary/20 transition-colors">
            <input 
              type="checkbox"
              checked={formData.hasValuables}
              onChange={(e) => setFormData({...formData, hasValuables: e.target.checked})}
              className="rounded text-secondary focus:ring-secondary cursor-pointer"
            />
            <span className="text-sm font-semibold text-primary flex-1">Avez-vous des objets de valeur ?</span>
          </label>
        </div>

        <hr className="border-t border-slate-100 my-4" />

        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Nom complet *" 
            required
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full bg-surface border-none text-primary placeholder:text-outline/60 rounded-xl focus:ring-secondary py-3 text-sm font-medium"
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="tel" 
              placeholder="Téléphone *" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-surface border-none text-primary placeholder:text-outline/60 rounded-xl focus:ring-secondary py-3 text-sm font-medium"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-surface border-none text-primary placeholder:text-outline/60 rounded-xl focus:ring-secondary py-3 text-sm font-medium"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs text-center font-bold bg-red-50 p-2 rounded-lg">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center py-4 rounded-xl bg-tertiary text-white font-bold text-lg hover:shadow-ambient hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(255,107,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Envoi...</>
          ) : (
            "Recevoir l'estimation gratuite"
          )}
        </button>

      </form>
    </div>
  );
}
