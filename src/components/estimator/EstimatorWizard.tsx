import { useState, useRef } from 'react';
import StepSelect from './StepSelect';
import StepSurface from './StepSurface';
import StepFloor from './StepFloor';
import StepValuables from './StepValuables';
import StepContact from './StepContact';
import { ArrowLeft } from 'lucide-react';

interface WizardProps {
  onSuccess: () => void;
}

export interface LeadData {
  property_type: string;
  estimated_volume_m2: number;
  floor_level: string;
  has_valuables: boolean;
  postal_code: string;
  client_name: string;
  client_email: string;
  client_phone: string;
}

export default function EstimatorWizard({ onSuccess }: WizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Partial<LeadData>>({});
  const [error, setError] = useState<string | null>(null);
  const directionRef = useRef<'next' | 'prev'>('next');

  const updateData = (fields: Partial<LeadData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    directionRef.current = 'next';
    setStep(s => s + 1);
  };
  const prevStep = () => {
    directionRef.current = 'prev';
    setStep(s => s - 1);
  };

  const handleSubmit = async (contactData: any) => {
    setLoading(true);
    setError(null);
    const payload = { ...data, ...contactData };
    
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();

      if (res.ok) {
        onSuccess();
      } else {
        setError(result.error || 'Une erreur est survenue lors de la soumission.');
      }
    } catch(err) {
      setError('Erreur de connexion. Veuillez vérifier votre accès internet.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepSelect data={data} updateData={updateData} nextStep={nextStep} />;
      case 2: return <StepSurface data={data} updateData={updateData} nextStep={nextStep} />;
      case 3: return <StepFloor data={data} updateData={updateData} nextStep={nextStep} />;
      case 4: return <StepValuables data={data} updateData={updateData} nextStep={nextStep} />;
      case 5: return <StepContact data={data} updateData={updateData} loading={loading} error={error} onSubmit={handleSubmit} />;
      default: return null;
    }
  };

  return (
    <div className="bg-surface-container-lowest md:shadow-ambient rounded-3xl md:rounded-[2rem] p-4 sm:p-6 md:p-10 border-0 md:border border-surface-container-low min-h-[500px] flex flex-col justify-center overflow-hidden w-full">
      <div className="flex items-center mb-8">
        {step > 1 ? (
          <button onClick={prevStep} className="p-2 -ml-2 cursor-pointer hover:bg-surface-container-low rounded-xl text-outline hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        <div className="flex-1 flex justify-center gap-2">
           {[1,2,3,4,5].map(i => (
             <div key={i} className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-tertiary shadow-[0_0_10px_rgba(255,107,0,0.4)]' : 'w-4 bg-surface-container-high'}`} />
           ))}
        </div>
        <div className="w-10"></div>
      </div>

      <div
        key={step}
        className={directionRef.current === 'next' ? 'step-enter-next' : 'step-enter-prev'}
      >
        {renderStep()}
      </div>
    </div>
  );
}
