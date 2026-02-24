import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | TK ARÉA",
  description: "Conditions générales de vente de TK ARÉA. Services de marquage au sol, signalisation et aménagement urbain. Intervention sur tout le territoire national.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tkarea.fr/cgv" },
};

export default function CGV() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="pt-32 pb-20 container-custom">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            Conditions Générales de <span className="text-tk-orange">Vente</span>
                        </h1>
                        <p className="text-gray-400 font-medium">Révision Janvier 2026 - Mises à disposition de notre clientèle professionnelle et publique.</p>
                    </div>

                    <div className="bg-tk-orange/5 border border-tk-orange/20 p-6 rounded-xl">
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Les présentes Conditions Générales de Vente (ci-après <strong>« CGV »</strong>) constituent le socle juridique unique
                            de la relation commerciale entre la société <strong>TK ARÉA</strong> (ci-après <strong>« L'Entreprise »</strong>) et tout
                            client professionnel (société privée, BTP, génie civil), ou personne morale de droit public
                            (collectivité territoriale, mairie) (ci-après <strong>« Le Client »</strong>) désirant bénéficier de ses
                            prestations d'expertise : Marquage au sol routier et urbain, pose de signalisation verticale et
                            horizontale, ainsi que les opérations spécifiques d'aménagement extérieur.
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 1. Champs d'application et Opposabilité
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Les CGV s'appliquent sans restriction ni réserve à l'ensemble des ventes de prestations de services conclues
                            par TK ARÉA. Elles prévalent sur toutes autres conditions générales d'achat émanant du Client, sauf
                            dérogation formelle et acceptée paritairement de façon préliminaire. La signature du bordereau de
                            devis, d'un bon de commande, d'un ordre de service (OS) implique l'acceptation plénière de ces présentes clauses.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 2. Commandes et Formation du Contrat
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Le contrat de prestation n'est définitivement formé qu'à la réception de la proposition commerciale ou
                            du devis dûment régularisé et revêtu par le Client de la mention « Bon pour accord », comportant sa
                            signature (ou signature électronique valide via tiers de confiance) ainsi que le cachet de son établissement.
                            Sauf indication expresse contraire, chaque devis émis a une validité stricte de <strong>trente (30) jours francs</strong>.
                            Toute modification de commande demandée par le Client après approbation initiale donnera obligatoirement lieu
                            à l’émission d’un avenant au devis dont l'acceptation sera indispensable pour poursuivre les travaux modifiés.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 3. Tarifs, Facturation et Modalités de Paiement
                        </h2>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                            <h3 className="font-bold text-white mb-3">3.1 Fixation des Prix</h3>
                            <p className="text-gray-300 leading-relaxed text-justify text-sm">
                                Les prix sont libellés en euros courants (EUR). Ils s’entendent nets et hors taxes (HT), majorés
                                ensuite de la TVA au taux légalement en vigueur à la date d'édition de la facture. Les coûts de
                                déplacement, l'emploi des engins lourds, ainsi que la fourniture exhaustive de matières premières
                                (résines, plots de verre, peintures thermoplastiques...) sont intégrés au forfait figurant dans le Devis.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-lg mt-4">
                            <h3 className="font-bold text-white mb-3">3.2 Modalités et Acompte de Démarrage</h3>
                            <p className="text-gray-300 leading-relaxed text-justify text-sm">
                                Sauf dérogation pour les marchés publics assujettis aux règles des deniers nationaux, l’ouverture du dossier,
                                la commande des résines et la programmation des équipes requièrent obligatoirement le versement d’un
                                <strong> acompte de trente pourcent (30 %)</strong> du montant total TTC lors de la signature du devis.
                                Aucune mobilisation d’équipe terrestre ne s'opérera avant encaissement définitif de cet acompte par nos services.
                                Le solde restant, sauf accord prévoyant des paiements intermédiaires au fur et à mesure de l'avancement,
                                stipulera une exigibilité au comptant à la Livraison globale ou à trente (30) jours nets passée l’émission de de la facture finale.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-lg mt-4">
                            <h3 className="font-bold text-white mb-3">3.3 Pénalités pour Retard de Règlements</h3>
                            <p className="text-gray-300 leading-relaxed text-justify text-sm">
                                Une inobservation des délais contractuels de paiement entraînera sans nécessiter de mise en demeure préalable
                                l’exigibilité d'une pénalité de retard correspondant à <strong>10 % d'intérêts</strong> sur les tranches ou soldes
                                échus, augmentée de manière systématique d'une indemnité forfaitaire incompressible fixée à <strong>40 euros</strong>
                                pour frais de recouvrement (conformément au Code de Commerce L441-6). Touts autres frais additionnels liés
                                à des actions en contentieux seront par ailleurs intégralement imputés au débiteur visé.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 4. Exécution des Travaux (BTP) et Délais
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Les délais de déploiement et d’exécution sont donnés à titre informatif et dépendent fortement de la disponibilité
                            de nos machines volumineuses ainsi que de la météo. <strong>TK ARÉA étant tributaire exclusif des conditions
                                climatiques, un taux d'humidité excessif au sol ou une température inadéquate pourront provoquer un report immédiat
                                d’un chantier d'application de résine pour impératifs de qualité, sans droit d'indemnités et pénalités réclamées
                                par le Client.</strong>
                        </p>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Préalablement à notre arrivée, le donneur d'ordre s'engage à préparer en bonne et due forme la base de trafic,
                            le décapage préalable si convenu, le détournement physique des voies et la protection civique des lieux aux
                            alentours immédiats du site des opérations. Le défaut de cette mise à disposition pourra entraîner l'indemnisation
                            de nos équipes rendues inopérantes proportionnellement au temps perdu de mobilisation de personnel lourd.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 5. Réception des Prestations et Réserves
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            A la fin d'accomplissement de toute prestation de voirie, réseaux divers, marquage ou signalisation
                            réalisée, le maitre de chantier procédera conjointement avec l'entité commanditaire au constat d'approbation et à un rapport de
                            vérification de la conformité aux devis et normes exigés. Ce procès verbal contresigné (PV de Réception de travaux sans ou avec Réserves)
                            acteras de la fin physique du marché et initiera les différentes garanties correspondantes et libérera du même coup l’obligation de
                            conservation de l’Édifice. En l'absence de représentant du Maître d'ouvrage prévenu de ce point,
                            la fin déclarée des travaux tiendra immédiatement rang de réception définitive tacite dans un
                            délai de soixante-douze (72) heures franches.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 6. Force Majeure
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Toute circonstance échappant au contrôle de <strong>TK ARÉA</strong> venant suspendre ou empêcher l'exécution
                            normale de nos obligations se verra qualifiée de Force Majeure. De ce moment, la responsabilité des acteurs sera
                            exclusivement relevée de tout recours ultérieur en responsabilité découlant du péril. Cela intègre à titre d'exemple :
                            grèves intempestives imprévues sur une chaîne publique logistique d’approvisionnement de la peinture de
                            marquage ou pénurie globale de panneaux en tôle, confinements ordonnés par la puissance publique, cataclysmes sociaux ou épidémies d'extrême urgence, inondations subites inhérentes
                            au périmètre ciblé pour le marquage au sol, rendant par nature tout accomplissement nul.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 7. Garanties des Travaux et de Maintien
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Les opérations réalisées sous-couverts aux normes NF EN 1436 (paramètres relatifs au marquage routier
                            sur la sphère optique et l'adhérence) bénéficient des protections normatives usuelles. Les défaillances des dispositifs
                            dues à une altération exceptionnelle ou usure intempestive consécutive à de graves déversements de solvants post-livraison n'engagent pas de prise en charge
                            sauf clause d’entretien récurrente distincte signée lors des accords préalables contractés. Toute réclamation devra nous être formellement notifiée sous
                            les huit (8) jours francs pour être recevable, par courriel recommandé de constat à la signature de remise des chantiers.
                        </p>
                    </section>

                    <section className="space-y-4 mb-20">
                        <h2 className="text-2xl font-black uppercase tracking-wider text-tk-orange flex items-center gap-3">
                            <span className="w-8 h-px bg-tk-orange" /> 8. Attribution Exclusive de Juridiction
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            Les droits et obligations des entités parties signataires au présent contrat relevant des
                            présentes C.G.V. sont régis de bout en bout par et sous l'autorité absolue de la Législation de la loi Française.
                            Dans le cas hypothétique où un différend persisterait ou émergerait en vertu d’interprétation,
                            d’interruption, ou de paiement, quant ce recours à l'amendement par médiation se trouverait infructueux,
                            le contentieux relèvera de son propre ressort à la seule et pure juridiction du <strong>Tribunal de Commerce
                                d'Angers</strong> et ce, même devant le mécanisme de pluralité de mis d'appels ou défendeurs ou tierce intervention en référé spécial d'urgence.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
