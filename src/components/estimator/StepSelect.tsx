import { Home, Building, ShieldAlert, PackageOpen } from 'lucide-react';

export default function StepSelect({ data, updateData, nextStep }: any) {
  const options = [
    { id: 'Maison', icon: <Home className="w-8 h-8 mb-4"/>, label: 'Maison' },
    { id: 'Appartement', icon: <Building className="w-8 h-8 mb-4"/>, label: 'Appartement' },
    { id: 'Cave', icon: <PackageOpen className="w-8 h-8 mb-4"/>, label: 'Cave / Grenier' },
    { id: 'Diogene', icon: <ShieldAlert className="w-8 h-8 mb-4"/>, label: 'Syndrome de Diogène' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 text-balance leading-tight">Que devons-nous vider&nbsp;?</h2>
        <p className="text-outline text-lg">Sélectionnez le type d'intervention.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map(opt => {
           const isSelected = data.property_type === opt.id;
           return (
             <button
               key={opt.id}
               onClick={() => {
                 updateData({ property_type: opt.id });
                 setTimeout(nextStep, 300); // Wait for the visual feedback click
               }}
               className={`p-6 rounded-3xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer hover:-translate-y-1 ${
                 isSelected 
                  ? 'border-tertiary bg-tertiary/10 text-tertiary shadow-[0_4px_20px_rgba(255,107,0,0.2)]' 
                  : 'border-surface-container-low bg-surface hover:border-tertiary/50 hover:bg-surface-container-lowest text-primary'
               }`}
             >
               {opt.icon}
               <span className="font-bold text-base sm:text-lg text-center text-balance">{opt.label}</span>
             </button>
           )
        })}
      </div>
    </div>
  );
}
