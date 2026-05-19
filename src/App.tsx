import { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ServicesOverview from './components/sections/ServicesOverview';
import PricingTiers from './components/sections/PricingTiers';
import PourquoiJRDebarras from './components/sections/PourquoiJRDebarras';
import TrustAndSafety from './components/sections/TrustAndSafety';
import WhatsAppBanner from './components/sections/WhatsAppBanner';
import ProcessSteps from './components/sections/ProcessSteps';
import EstimatorView from './components/views/EstimatorView';
import DiogeneView from './components/views/DiogeneView';
import CavesView from './components/views/CavesView';
import SuccessionView from './components/views/SuccessionView';
import MentionsLegalesView from './components/views/MentionsLegalesView';
import ConfidentialiteView from './components/views/ConfidentialiteView';
import TrackingView from './components/views/TrackingView';
import SuccessView from './components/SuccessView';
import Dashboard from './components/admin/Dashboard';
import SEO from './components/layout/SEO';

export type ViewState = 'landing' | 'estimator' | 'success' | 'diogene' | 'caves' | 'succession' | 'mentions-legales' | 'confidentialite' | 'devis' | 'dashboard';

const validViews: ViewState[] = ['estimator', 'success', 'diogene', 'caves', 'succession', 'mentions-legales', 'confidentialite', 'devis', 'dashboard'];

const SEO_CONFIG: Record<ViewState, { title: string, description: string, canonicalPath: string }> = {
  'landing': {
    title: "JR Débarras — Débarras Professionnel en Île-de-France | Devis Gratuit",
    description: "Service de débarras professionnel en Île-de-France. Maison, appartement, cave, succession, syndrome de Diogène. Devis gratuit et intervention sous 24h.",
    canonicalPath: "/"
  },
  'estimator': {
    title: "Estimez votre Débarras en Ligne en 2 Minutes — JR Débarras",
    description: "Obtenez une estimation immédiate pour votre débarras. Remplissez notre formulaire simple et rapide pour un devis gratuit sans engagement en Île-de-France.",
    canonicalPath: "/estimator"
  },
  'success': {
    title: "Demande Confirmée — JR Débarras",
    description: "Votre demande d'estimation a bien été envoyée à notre équipe. Nous vous recontactons dans les plus brefs délais avec votre devis de débarras.",
    canonicalPath: "/success"
  },
  'diogene': {
    title: "Débarras Syndrome de Diogène : Discrétion et Respect — JR Débarras",
    description: "Experts en débarras pour syndrome de Diogène. Intervention rapide, discrète et respectueuse avec désinfection complète de votre logement.",
    canonicalPath: "/diogene"
  },
  'caves': {
    title: "Débarras de Caves et Greniers Rapide — JR Débarras",
    description: "Libérez de l'espace avec notre service de débarras de caves et greniers. Enlèvement d'encombrants et nettoyage complet. Devis immédiat.",
    canonicalPath: "/caves"
  },
  'succession': {
    title: "Débarras Succession Intégral et Empathique — JR Débarras",
    description: "Nous gérons le débarras de succession de A à Z with empathie. Tri minutieux, recyclage éco-responsable et rachat de vos valeurs.",
    canonicalPath: "/succession"
  },
  'mentions-legales': {
    title: "Mentions Légales — JR Débarras",
    description: "Consultez les mentions légales de JR Débarras. Informations juridiques, hébergement et responsabilités concernant nos services de débarras.",
    canonicalPath: "/mentions-legales"
  },
  'confidentialite': {
    title: "Politique de Confidentialité et Cookies — JR Débarras",
    description: "Découvrez comment JR Débarras protège vos données personnelles et gère votre vie privée conformément aux normes RPGD en vigueur.",
    canonicalPath: "/confidentialite"
  },
  'devis': {
    title: "Suivi de Devis : État de votre Demande — JR Débarras",
    description: "Consultez en temps réel l'état d'avancement de votre devis de débarras et le statut de notre intervention depuis votre espace personnel.",
    canonicalPath: "/devis"
  },
  'dashboard': {
    title: "Administration — JR Débarras",
    description: "Espace administrateur JR Débarras.",
    canonicalPath: "/dashboard"
  }
};

function getViewFromPath(): ViewState {
  const path = window.location.pathname.replace('/', '');
  if (path === '') return 'landing';
  if (validViews.includes(path as ViewState)) return path as ViewState;
  
  return 'landing'; // Fallback
}

function LandingView({ onViewChange }: { onViewChange: (view: ViewState) => void }) {
  return (
    <>
      <Hero onStartEstimator={() => onViewChange('estimator')} onSuccess={() => onViewChange('success')} />
      <TrustAndSafety />
      <PourquoiJRDebarras />
      <PricingTiers onStartEstimator={() => onViewChange('estimator')} />
      <ServicesOverview onViewChange={onViewChange} />
      <ProcessSteps />
      <WhatsAppBanner />
    </>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(getViewFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleViewChange = useCallback((newView: ViewState, query?: string) => {
    setCurrentView(newView);
    const path = newView === 'landing' ? '/' : `/${newView}${query ? `?${query}` : ''}`;
    window.history.pushState(null, '', path);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased text-primary selection:bg-tertiary selection:text-white">
      <SEO {...(SEO_CONFIG[currentView] || SEO_CONFIG['landing'])} />
      
      {currentView !== 'dashboard' && currentView !== 'estimator' && <Header onViewChange={handleViewChange} />}
      
      {/* Hide master header and unpad for Estimator layout to take full screen canvas */}
      <main className={`flex-grow flex flex-col ${['landing', 'dashboard', 'estimator'].includes(currentView) ? '' : 'pt-16 md:pt-20'}`}>
        {currentView === 'landing' && <LandingView onViewChange={handleViewChange} />}
        {currentView === 'estimator' && <EstimatorView onSuccess={() => handleViewChange('devis', 'success=true')} onReturnHome={() => handleViewChange('landing')} />}

        {currentView === 'success' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <SuccessView onReturnHome={() => handleViewChange('landing')} />
          </div>
        )}
        {currentView === 'devis' && <TrackingView />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'diogene' && <DiogeneView onReturnHome={() => handleViewChange('landing')} />}
        {currentView === 'caves' && <CavesView onReturnHome={() => handleViewChange('landing')} onStartEstimator={() => handleViewChange('estimator')} />}
        {currentView === 'succession' && <SuccessionView onReturnHome={() => handleViewChange('landing')} onStartEstimator={() => handleViewChange('estimator')} />}
        {currentView === 'mentions-legales' && <MentionsLegalesView onReturnHome={() => handleViewChange('landing')} />}
        {currentView === 'confidentialite' && <ConfidentialiteView onReturnHome={() => handleViewChange('landing')} />}
      </main>

      {currentView !== 'dashboard' && currentView !== 'estimator' && <Footer onViewChange={handleViewChange} />}
    </div>
  );
}

export default App;
