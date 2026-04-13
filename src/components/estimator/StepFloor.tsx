import { ArrowUpToLine, ArrowDownToLine, Navigation, Hand } from 'lucide-react';

export default function StepFloor({ data, updateData, nextStep }: any) {
  const options = [
    { label: "RDC", floor: "RDC", elevator: false, icon: <ArrowDownToLine /> },
    { label: "Étage (Ascenseur)", floor: "Étage", elevator: true, icon: <Navigation /> },
    { label: "Étage (Escaliers)", floor: "Étage", elevator: false, icon: <ArrowUpToLine /> },
    { label: "Complexe / Cave", floor: "Complexe", elevator: false, icon: <Hand /> }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-display font-bold text-primary mb-3 text-balance leading-tight">L'accessibilité</h3>
        <p className="text-outline text-lg">Cela nous permet d'anticiper la manutention.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, i) => {
          const isSelected = data.floor_level === opt.floor && data.has_elevator === opt.elevator;
          return (
             <button
               key={i}
               onClick={() => {
                 updateData({ floor_level: opt.floor, has_elevator: opt.elevator });
                 setTimeout(nextStep, 300);
               }}
               className={`p-4 sm:p-6 rounded-3xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer relative hover:-translate-y-1 ${
                 isSelected 
                  ? 'border-tertiary bg-tertiary/10 text-tertiary shadow-[0_4px_20px_rgba(255,107,0,0.2)]' 
                  : 'border-surface-container-low bg-surface hover:border-tertiary/50 hover:bg-surface-container-lowest text-primary'
               }`}
             >
               <div className={`[&_svg]:w-8 [&_svg]:h-8 mb-4 ${isSelected ? 'text-tertiary' : 'text-primary'}`}>
                 {opt.icon}
               </div>
               <span className="font-bold text-base sm:text-lg text-center text-balance">{opt.label}</span>
               {isSelected && (
                 <div className="absolute top-4 right-4 w-6 h-6 bg-tertiary text-white rounded-full flex items-center justify-center">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                 </div>
               )}
            </button>
          )
        })}
      </div>
    </div>
  );
}
