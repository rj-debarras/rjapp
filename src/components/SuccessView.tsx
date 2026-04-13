import successVector from '../assets/images/success-vector.png';

export default function SuccessView({ onReturnHome }: { onReturnHome: () => void }) {
  return (
    <div className="bg-surface-container-lowest shadow-ambient rounded-[2rem] p-8 sm:p-12 text-center border border-surface-container-low animate-in zoom-in-95 duration-500">
      <div className="w-48 h-48 mx-auto flex items-center justify-center mb-6">
        <img src={successVector} alt="Succès" className="w-full h-full object-contain" />
      </div>
      
      <h2 className="text-3xl font-display font-bold text-primary mb-4">
        Demande Envoyée !
      </h2>
      
      <p className="text-outline text-lg mb-8 max-w-md mx-auto leading-relaxed">
        Nous avons bien reçu votre demande d'estimation. Notre concierge digital va analyser vos données et vous contactera sous 24h ouvrées.
      </p>
      
      <button 
        onClick={onReturnHome}
        className="px-8 py-4 rounded-xl bg-surface-container-low text-primary font-semibold hover:bg-surface-container-high transition-all hover:shadow-sm"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
