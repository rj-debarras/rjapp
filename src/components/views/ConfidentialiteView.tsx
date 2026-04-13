import { ArrowLeft, Shield } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/format';

export default function ConfidentialiteView({ onReturnHome }: { onReturnHome: () => void }) {
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
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">Politique de Confidentialité</h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container-low space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">1. Responsable du traitement</h2>
                <p className="text-outline leading-relaxed">
                  Le responsable du traitement des données personnelles est :<br />
                  <strong>RJ Débarras</strong><br />
                  Email : {import.meta.env.VITE_CONTACT_EMAIL}<br />
                  Téléphone : {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">2. Données collectées</h2>
                <p className="text-outline leading-relaxed">
                  Dans le cadre de l'utilisation de notre formulaire d'estimation en ligne, nous collectons les données suivantes :
                </p>
                <ul className="list-disc list-inside text-outline space-y-1 mt-2">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Code postal</li>
                  <li>Type de bien et volume estimé</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">3. Finalité du traitement</h2>
                <p className="text-outline leading-relaxed">
                  Les données collectées sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc list-inside text-outline space-y-1 mt-2">
                  <li>Vous recontacter suite à votre demande d'estimation</li>
                  <li>Établir un devis personnalisé</li>
                  <li>Assurer le suivi de la prestation</li>
                </ul>
                <p className="text-outline leading-relaxed mt-2">
                  Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">4. Durée de conservation</h2>
                <p className="text-outline leading-relaxed">
                  Les données personnelles sont conservées pour une durée maximale de 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">5. Vos droits</h2>
                <p className="text-outline leading-relaxed">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-outline space-y-1 mt-2">
                  <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                  <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                </ul>
                <p className="text-outline leading-relaxed mt-3">
                  Pour exercer ces droits, contactez-nous à : <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="text-secondary hover:underline">{import.meta.env.VITE_CONTACT_EMAIL}</a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">6. Cookies</h2>
                <p className="text-outline leading-relaxed">
                  Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de suivi publicitaire n'est utilisé.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">7. Sécurité</h2>
                <p className="text-outline leading-relaxed">
                  Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Notre site est sécurisé par un certificat SSL (HTTPS).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">8. Contact</h2>
                <p className="text-outline leading-relaxed">
                  Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter :<br />
                  Email : <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="text-secondary hover:underline">{import.meta.env.VITE_CONTACT_EMAIL}</a><br />
                  Téléphone : {formatPhoneNumber(import.meta.env.VITE_PHONE_NUMBER)}
                </p>
              </div>
            </div>

            <p className="text-sm text-outline/60 text-center">
              Dernière mise à jour : Mars 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
