import { ArrowLeft, Scale } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/format';

export default function MentionsLegalesView({ onReturnHome }: { onReturnHome: () => void }) {
  return (
    <div className="bg-surface font-sans text-primary">
      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); onReturnHome(); }}
            className="flex items-center gap-2 text-outline hover:text-primary font-semibold mb-8 group focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </a>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">Mentions Légales</h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container-low space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">1. Éditeur du site</h2>
                <p className="text-outline leading-relaxed">
                  Le site <strong>rjdebarras.com</strong> est édité par :<br />
                  <strong>RJ Débarras</strong><br />
                  Siège social : {import.meta.env.VITE_POSTAL_ADDRESS}<br />
                  SIRET : {import.meta.env.VITE_COMPANY_SIRET}<br />
                  Téléphone : {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}<br />
                  Email : {import.meta.env.VITE_CONTACT_EMAIL}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">2. Directeur de la publication</h2>
                <p className="text-outline leading-relaxed">
                  {import.meta.env.VITE_PUBLICATION_DIRECTOR}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">3. Hébergement</h2>
                <p className="text-outline leading-relaxed">
                  Le site est hébergé par :<br />
                  <strong>Cloudflare, Inc.</strong><br />
                  101 Townsend Street, San Francisco, CA 94107, États-Unis<br />
                  Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.cloudflare.com</a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">4. Propriété intellectuelle</h2>
                <p className="text-outline leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de RJ Débarras, sauf mention contraire. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de RJ Débarras.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">5. Limitation de responsabilité</h2>
                <p className="text-outline leading-relaxed">
                  RJ Débarras s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, RJ Débarras ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">6. Droit applicable</h2>
                <p className="text-outline leading-relaxed">
                  Tout litige en relation avec l'utilisation du site <strong>rjdebarras.com</strong> est soumis au droit français. L'utilisateur reconnaît la compétence exclusive des tribunaux compétents de Paris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
