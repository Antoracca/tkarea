import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions Légales | TK ARÉA",
  description: "Mentions légales de TK ARÉA, entreprise spécialisée en marquage au sol, signalisation routière et aménagement urbain. Siège social : 8 Rue Mélilot, 49080 Bouchemaine.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tkarea.com/mentions-legales" },
};

export default function MentionsLegales() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="pt-32 pb-20 container-custom">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            Mentions <span className="text-tk-orange">Légales</span>
                        </h1>
                        <p className="text-gray-400 font-medium">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 1. Présentation du site
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique,
                            il est précisé aux utilisateurs du site <strong>tkarea.com</strong> l'identité des différents intervenants
                            dans le cadre de sa réalisation et de son suivi :
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-tk-orange mb-4">
                            <li><strong>Propriétaire et Éditeur du site :</strong> TK ARÉA</li>
                            <li><strong>Statut juridique :</strong> Société par Actions Simplifiée (SAS) - <em>(Information factice à adapter)</em></li>
                            <li><strong>Capital social :</strong> 10 000 €</li>
                            <li><strong>Siège social :</strong> 8 Rue Mélilot, 49080 Bouchemaine, France</li>
                            <li><strong>RCS :</strong> Angers B 123 456 789 <em>(Numéro à adapter)</em></li>
                            <li><strong>Numéro de TVA intracommunautaire :</strong> FR 12 123456789 <em>(Numéro à adapter)</em></li>
                            <li><strong>Contact :</strong> info@tkarea.com | 06 05 76 99 52</li>
                            <li><strong>Directeur de la publication :</strong> Le Président de TK ARÉA</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 2. Hébergement
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Le site <strong>tkarea.com</strong> est hébergé par la société <strong>Vercel Inc.</strong><br />
                            <strong>Siège social de l'hébergeur :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.<br />
                            <strong>Contact de l'hébergeur :</strong> privacy@vercel.com<br />
                            Les serveurs physiques garantissant le stockage des données sont situés au sein de l'Union Européenne (Région AWS Paris/Francfort), en conformité avec les exigences du Règlement Général sur la Protection des Données (RGPD).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 3. Conditions générales d'utilisation (CGU)
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            L'utilisation du site <strong>tkarea.com</strong> implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites.
                            Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, les utilisateurs du site sont donc invités à les consulter de manière régulière.
                            Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut
                            être toutefois décidée par l'éditeur, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 4. Propriété intellectuelle et contrefaçons
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            <strong>TK ARÉA</strong> est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments
                            accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels et éléments de code (React, Next.js).
                        </p>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
                            quel que soit le moyen ou le procédé utilisé, est formellement interdite, sauf autorisation écrite préalable de TK ARÉA.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée
                            comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants
                            du Code de Propriété Intellectuelle.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 5. Limitations de responsabilité
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            <strong>TK ARÉA</strong> ne pourra être tenue responsable des dommages directs et indirects causés au matériel
                            de l’utilisateur, lors de l’accès au site web <strong>tkarea.com</strong>, et résultant soit de l’utilisation d’un matériel
                            ne répondant pas aux spécifications techniques, soit de l’apparition d’un bug ou d’une incompatibilité.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Des espaces interactifs (possibilité de poser des questions dans l'espace contact ou la simulation de devis) sont à la disposition des utilisateurs.
                            <strong>TK ARÉA</strong> se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans
                            cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 6. Liens hypertextes et Cookies
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Le site <strong>tkarea.com</strong> contient un certain nombre de liens hypertextes vers d’autres sites (partenaires, réseaux sociaux, informations).
                            Cependant, <strong>TK ARÉA</strong> n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            La navigation sur le présent site est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur.
                            Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation
                            d’un ordinateur sur un site.
                            Pour plus d'informations détaillées sur l'utilisation des cookies et la gestion de vos données personnelles,
                            veuillez consulter notre <a href="/confidentialite" className="text-tk-orange hover:underline">Politique de Confidentialité</a>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 7. Droit applicable et attribution de juridiction
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Tout litige en relation avec l’utilisation du site <strong>tkarea.com</strong> est soumis au droit français.
                            Il est fait attribution exclusive de juridiction aux tribunaux compétents dont dépend le siège social de <strong>TK ARÉA</strong>,
                            à savoir le Tribunal de Commerce d'Angers, sous réserve d'une attribution de compétence spécifique
                            découlant d'un texte de loi ou réglementaire particulier.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
