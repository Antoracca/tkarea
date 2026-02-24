import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | TK ARÉA",
  description: "Politique de confidentialité et protection des données personnelles de TK ARÉA, entreprise de marquage au sol et signalisation routière en Maine-et-Loire.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tkarea.fr/confidentialite" },
};

export default function Confidentialite() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="pt-32 pb-20 container-custom">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            Politique de <span className="text-tk-orange">Confidentialité</span>
                        </h1>
                        <p className="text-gray-400 font-medium">Date d'entrée en vigueur : {new Date('2024-01-01').toLocaleDateString('fr-FR')} - Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                    </div>

                    <div className="bg-tk-orange/5 border border-tk-orange/20 p-6 rounded-xl">
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Chez <strong>TK ARÉA</strong>, nous accordons une importance fondamentale à la protection de la vie privée
                            de nos clients et utilisateurs. La présente Politique de Confidentialité a pour but de vous exposer de manière
                            claire, transparente et exhaustive les processus de collecte, d'utilisation, de traitement et de protection
                            de vos données à caractère personnel lorsque vous naviguez sur le site <strong>tkarea.fr</strong> ou
                            interagissez avec nos services (simulateur de devis, formulaire de contact).
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 1. Responsable du Traitement
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Le responsable du traitement des données personnelles collectées dans le cadre du site et
                            des éventuelles commandes est la société <strong>TK ARÉA</strong> (SAS au capital de 10 000€),
                            dont le siège social est sis au 8 Rue Mélilot, 49080 Bouchemaine, immatriculée sous le numéro
                            de SIRET 123 456 789 00012. Le Délégué à la Protection des Données (DPO) peut être joint à tout
                            moment à l'adresse suivante : info@tkarea.com.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 2. Nature des données collectées
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Lors de l'utilisation de nos plateformes numériques, diverses informations personnelles peuvent être
                            rassemblées selon le principe de minimisation des données (seules les données strictement
                            nécessaires sont collectées).
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-3 marker:text-tk-orange">
                            <li><strong>Données d'identification :</strong> Nom, Prénom, Société (le cas échéant).</li>
                            <li><strong>Informations de contact :</strong> Adresse électronique (e-mail), numéro de téléphone, adresse postale ou de facturation.</li>
                            <li><strong>Données contextuelles au devis :</strong> Nature des travaux d'aménagement, surface estimée, contraintes techniques, photos du site envoyées via la simulation.</li>
                            <li><strong>Données de connexion et navigation :</strong> Adresse IP, type de navigateur, horodatage de connexion, via l'usage de cookies analytiques strictement nécessaires au fonctionnement ou sous réserve de votre consentement.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 3. Finalités de la collecte
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Vos données personnelles sont collectées et traitées pour les finalités explicites, légitimes
                            et déterminées suivantes :
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-tk-orange/30 transition-colors">
                                <h3 className="font-bold text-white mb-2">Gestion Contractuelle</h3>
                                <p className="text-sm text-gray-400">Établissement des devis, exécution des travaux d'aménagement urbain ou routier, traitement de la facturation et gestion du SAV.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-tk-orange/30 transition-colors">
                                <h3 className="font-bold text-white mb-2">Relation Client</h3>
                                <p className="text-sm text-gray-400">Réponse à vos messages ou prises de contact techniques via nos formulaires, envoi d'informations organisationnelles liées au chantier.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-tk-orange/30 transition-colors">
                                <h3 className="font-bold text-white mb-2">Amélioration du Service</h3>
                                <p className="text-sm text-gray-400">Analyse statistique des visites du site internet pour en détecter les anomalies et en améliorer l'ergonomie générale.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-tk-orange/30 transition-colors">
                                <h3 className="font-bold text-white mb-2">Obligations Légales</h3>
                                <p className="text-sm text-gray-400">Conservation des données de facturation pendant la durée d'obligation comptable fixée par le code de commerce (10 ans).</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 4. Bases Légales du Traitement
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Conformément à l’article 6 du RGPD, <strong>TK ARÉA</strong> s’appuie sur les bases juridiques
                            suivantes pour traiter vos données judicieusement :
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-tk-orange">
                            <li><strong>Le Consentement :</strong> Notamment pour l'utilisation des cookies d'analyse de trafic non essentiels.</li>
                            <li><strong>L'Exécution d'un Contrat :</strong> Lorsque le traitement est indispensable à la formulation d'un devis technique de BTP ou à l'exécution d'une commande d'aménagement.</li>
                            <li><strong>L'Intérêt Légitime :</strong> Pour la sécurité de notre plateforme web et la prévention des fraudes.</li>
                            <li><strong>L'Obligation Légale :</strong> Pour le respect des régulations fiscales françaises requérant la conservation de documents de comptabilité.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 5. Destinataires des Données
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            TK ARÉA est le destinataire quasi exclusif de vos informations. Nous ne revendons
                            jamais aucune donnée personnelle (mailing list / courtiers).
                            Toutefois, pour rendre le service attendu de manière sécurisée et performante, nous pouvons
                            communiquer sous couvert du strict secret professionnel vos données aux prestataires suivants :
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-tk-orange">
                            <li>L'hébergeur de notre infrastructure web (Vercel) et nos services de bases de données cloud.</li>
                            <li>Nos sous-traitants d’intervention sur le chantier, uniquement pour vous identifier et repérer le périmètre des travaux de signalisation.</li>
                            <li>Notre cabinet comptable ou d'auditeurs mandatés, soumis au secret absolu des opérations.</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed text-justify italic mt-4">
                            Note : Aucune de vos données collectées volontairement n'est hébergée ou transférée hors
                            des serveurs respectant strictement les standards de l’Union Européenne (RGPD).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 6. Durée de Conservation
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            TK ARÉA ne conserve les données de ses utilisateurs que pour la durée strictement nécessaire à la
                            mise en œuvre des finalités décrites supra :
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-tk-orange">
                            <li><strong>Prospects (Demandes de Devis sans suite) :</strong> maximum 3 ans à compter du dernier contact établi avec notre pôle commercial.</li>
                            <li><strong>Clients :</strong> pendant toute la durée de la relation commerciale, et jusqu'aux termes des garanties légales inhérentes au BTP (décennale) soit 10 ans après intervention pour des motifs structurels, et 10 ans pour les facturations.</li>
                            <li><strong>Cookies :</strong> une durée maximale de 13 mois pour les traceurs non essentiels.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 7. Sécurité des Données
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Nous mettons en œuvre des mesures organisationnelles et techniques très strictes pour protéger de bout
                            en bout la confidentialité et l'intégrité de vos informations. Les requêtes via notre plateforme sont
                            systématiquement chiffrées selon le protocole sécurisé HTTPS (SSL/TLS). Nos pare-feux logiciels
                            bloquent les tentatives d'accès aux serveurs dorsaux. L'accès à l’interface d'administration de TK ARÉA
                            est restreint par des authentifications mutli-facteurs accordées à nos seuls responsables autorisés.
                        </p>
                    </section>

                    <section className="space-y-4 mb-20">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 8. Vos Droits Informatique et Libertés
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Conformément à la législation européenne (et la loi "Informatique et Libertés" modifiée),
                            vous disposez d'un arsenal d'outils et de moyens d'opposition :
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-tk-orange mb-4">
                            <li><strong>Droit d'accès et de portabilité:</strong> Obtenir une copie brute des données que nous connaissons.</li>
                            <li><strong>Droit de rectification :</strong> Exiger la mise à jour sans délai d'informations périmées.</li>
                            <li><strong>Droit à l'effacement («droit à l'oubli») :</strong> Demander l'effacement pur de vos données de nos serveurs (dans les limites de ce qui est permis fiscalement par l'État).</li>
                            <li><strong>Droit d'opposition :</strong> Refuser expressément d'être relancé commercialement.</li>
                        </ul>
                        <div className="bg-white/5 border-l-4 border-tk-orange p-6 mt-6">
                            <p className="text-white font-medium mb-2">Comment exercer vos droits ?</p>
                            <p className="text-gray-300 text-sm">
                                Faites-nous simplement parvenir votre demande explicite en envoyant un courriel
                                au délégué à la protection des données DPO de TK ARÉA via : <strong>info@tkarea.com</strong>.<br />
                                Vous disposez également du droit de déposer une réclamation (plainte) officielle auprès
                                de la Commission Nationale de l'Informatique et des Libertés (CNIL).
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
