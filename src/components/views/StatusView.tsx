import { CheckCircle2, Clock, Phone, FileText, AlertCircle } from 'lucide-react';

interface StatusViewProps {
  lead: any;
}

export default function StatusView({ lead }: StatusViewProps) {
  const steps = [
    { 
      id: 1, 
      label: 'Demande Reçue', 
      status: 'completed', 
      icon: CheckCircle2, 
      desc: 'Votre demande a été enregistrée.' 
    },
    { 
      id: 2, 
      label: 'Étude technique', 
      status: lead.status === 'New' ? 'active' : 'completed', 
      icon: Clock, 
      desc: lead.status === 'New' ? 'Nous analysons votre demande.' : 'Étude terminée.'
    },
    { 
      id: 3, 
      label: 'Devis envoyé', 
      status: lead.status === 'Quoted' ? 'active' : (lead.status === 'Done' ? 'completed' : 'upcoming'), 
      icon: FileText, 
      desc: lead.status === 'Quoted' ? 'Proposition tarifaire disponible.' : 'En attente du devis.'
    },
    { 
      id: 4, 
      label: 'Intervention', 
      status: lead.status === 'Done' ? 'completed' : 'upcoming', 
      icon: Clock, 
      desc: lead.status === 'Done' ? 'Travaux terminés avec succès.' : 'Planning des travaux.'
    },
  ];

  const isSuccess = window.location.search.includes('success=true');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {lead.status === 'Cancelled' && (
        <div className="mb-10 bg-red-50 border border-red-100 rounded-[2rem] p-6 sm:p-8 flex items-center gap-6 animate-in slide-in-from-top-4 duration-500">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-red-900 mb-1">Demande Annulée</h2>
            <p className="text-red-800 text-sm">Cette demande de devis a été classée sans suite. N'hésitez pas à nous contacter pour plus d'informations.</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="mb-10 bg-green-50 border border-green-100 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-display font-bold text-green-900 mb-1">C'est envoyé ! Merci pour votre confiance.</h2>
            <p className="text-green-800 font-medium">Votre demande est bien arrivée. Notre équipe vous recontactera sous 24h avec votre estimation personnalisée.</p>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4 tracking-tight">Suivi de votre demande</h1>
        <p className="text-outline text-lg">Référence : <span className="font-mono font-bold text-tertiary">RJ-{lead.tracking_code?.toUpperCase()}</span></p>
      </div>

      {/* Stepper */}
      <div className="relative mb-16">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-high -translate-y-1/2 hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${
                step.status === 'completed' ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 
                step.status === 'active' ? 'bg-tertiary text-white shadow-lg shadow-tertiary/40 animate-pulse' : 
                'bg-surface-container-highest text-outline'
              }`}>
                <step.icon className="w-7 h-7" />
              </div>
              <div className="mt-4 text-center">
                <h3 className={`font-bold text-sm mb-1 ${step.status !== 'upcoming' ? 'text-primary' : 'text-outline/60'}`}>{step.label}</h3>
                <p className="text-xs text-outline/70 px-4">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-ambient border border-surface-container-low mb-12 transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-tertiary rounded-full" />
          Détails de la prestation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <DetailItem label="Type de bien" value={lead.property_type || 'Non spécifié'} />
            <DetailItem label="Volume estimé" value={`${lead.estimated_volume_m2 || '?'} m³`} />
            <DetailItem label="Localisation" value={lead.postal_code} />
          </div>
          <div className="space-y-6">
             <DetailItem label="Date de demande" value={new Date(lead.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} />
             <DetailItem label="Ascenseur" value={lead.has_elevator ? 'Présent' : 'Non présent'} />
             <DetailItem label="Intervention" value={lead.status === 'New' ? 'En attente d\'étude' : 'Planification en cours'} />
          </div>
        </div>
      </div>

      {/* CTA Call */}
      <div className="flex justify-center">
        <a 
          href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`}
          className="group flex items-center gap-4 bg-primary px-8 py-5 rounded-3xl text-white font-bold text-xl hover:bg-tertiary transition-all hover:shadow-2xl hover:-translate-y-2 active:scale-95 shadow-[0_4px_30px_rgba(26,46,76,0.2)]"
        >
          <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-white/20 transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <span>Appeler un conseiller</span>
        </a>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{label}</span>
      <span className="text-lg font-medium text-primary-900">{value}</span>
    </div>
  );
}
