import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function StepContact({ loading, error: serverError, onSubmit }: any) {
  const [form, setForm] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    postal_code: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validations
  const isNameValid = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(form.client_name.trim());
  const isPostalValid = /^[0-9]{5}$/.test(form.postal_code.trim());
  
  // Accept standard 10 digit, +33, etc. Remove spaces for check.
  const cleanPhone = form.client_phone.replace(/[\s.-]/g, '');
  const isPhoneValid = /^(0|\+33|0033)[1-9][0-9]{8}$/.test(cleanPhone);
  
  const isEmailValid = form.client_email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email);

  const isValid = isNameValid && isPostalValid && isPhoneValid && isEmailValid;

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const getInputClass = (isValidField: boolean, fieldName: string) => {
    const base = "w-full p-4 rounded-xl outline-none transition-all placeholder:text-outline/70 border-2";
    if (!touched[fieldName]) return `${base} bg-surface-container-low border-transparent focus:bg-surface-container-lowest focus:border-primary`;
    if (isValidField) return `${base} bg-emerald-50/30 border-emerald-500/30 focus:border-emerald-500`;
    return `${base} bg-red-50/50 border-red-500/50 focus:border-red-500 text-red-900`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <h2 className="text-3xl font-display font-bold text-primary text-center mb-2">Vos coordonnées</h2>
      <p className="text-outline text-center mb-8">Pour vous transmettre notre estimation gratuite.</p>
      
      <div className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Nom & Prénom"
            className={getInputClass(isNameValid, 'client_name')}
            value={form.client_name}
            onChange={(e) => setForm({...form, client_name: e.target.value})}
            onBlur={() => handleBlur('client_name')}
          />
          {touched.client_name && !isNameValid && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">Veuillez entrer un nom valide.</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              type="tel" 
              placeholder="Téléphone (ex: 06 12...)"
              className={getInputClass(isPhoneValid, 'client_phone')}
              value={form.client_phone}
              onChange={(e) => setForm({...form, client_phone: e.target.value})}
              onBlur={() => handleBlur('client_phone')}
            />
            {touched.client_phone && !isPhoneValid && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">Format de téléphone français requis.</p>}
          </div>
          <div>
            <input 
              type="text" 
              inputMode="numeric"
              maxLength={5}
              placeholder="Code Postal (ex: 75001)"
              className={getInputClass(isPostalValid, 'postal_code')}
              value={form.postal_code}
              onChange={(e) => setForm({...form, postal_code: e.target.value.replace(/\D/g, '')})}
              onBlur={() => handleBlur('postal_code')}
            />
            {touched.postal_code && !isPostalValid && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">Code postal à 5 chiffres requis.</p>}
          </div>
        </div>
        
        <div>
          <input 
            type="email" 
            placeholder="Email (Optionnel)"
            className={getInputClass(isEmailValid, 'client_email')}
            value={form.client_email}
            onChange={(e) => setForm({...form, client_email: e.target.value})}
            onBlur={() => handleBlur('client_email')}
          />
          {touched.client_email && !isEmailValid && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">Format d'email invalide.</p>}
        </div>
      </div>
      
      {serverError && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-in zoom-in-95 duration-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{serverError}</p>
        </div>
      )}

      <button 
        onClick={() => onSubmit({ ...form, client_phone: cleanPhone })}
        disabled={!isValid || loading}
        className="mt-8 w-full py-4 rounded-xl bg-tertiary text-white font-bold text-lg shadow-[0_4px_20px_rgba(255,107,0,0.3)] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center hover:scale-[1.02] active:scale-[0.98]"
      >
        {loading ? <span className="animate-pulse flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Envoi en cours...</span> : 'Demander mon Devis Gratuit'}
      </button>
      <p className="text-center text-xs text-outline mt-4 leading-relaxed">En soumettant ce formulaire, vous acceptez d'être recontacté en vue d'établir un devis gratuit.</p>
    </div>
  );
}
