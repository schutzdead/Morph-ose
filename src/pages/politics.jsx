import Header from "@/components/layout/header"

export default function CGV() {
  return (
    <>
      <Header />
        <main className="flex flex-col text-secondary items-center px-10 sm:px-6 pb-20 md:pb-10">
          <h1 className="text-5xl font-semibold py-12 text-center md:text-3xl">Conditions générales de vente</h1>
          <div className="flex flex-col items-center gap-10 w-[75%] md:w-[90%] sm:w-full ">
          <div className="flex flex-col items-start gap-3 w-full">
                <p>Les présentes conditions de vente sont conclues d’une part par la Société par actions simplifiée (SAS) Morph’ose Évolution dont le nom commercial est Merveilles de Morph’ose, au capital social de 5000€ dont le siège social est situé au 28 rue du commerce 63800 Cournon-d’Auvergne, immatriculée au Registre du Commerce et des Sociétés de Clermont-Ferrand sous le numéro 931 225 114 R.C.S. ci-après dénommée « la société » et gérant le site Merveilles de Morph’ose et, d’autre part, par toute personne physique ou morale souhaitant procéder à un achat via le site internet Merveilles de Morph’ose dénommée ci-après « l’acheteur ».</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                <h2 className="text-xl font-bold">Article 1. Objet</h2>
                <p>Les présentes conditions de vente visent à définir les relations contractuelles entre la société et l’acheteur et les conditions applicables à tout achat effectué par le biais du site internet Merveilles de Morph’ose. L’acquisition d’un produit ou d’un service à travers le présent site implique une acceptation sans réserve par l’acheteur des présentes conditions de vente dont l’acheteur reconnaît avoir pris connaissance préalablement à sa commande. </p>
                <p>La société conserve la possibilité de modifier à tout moment ces conditions de ventes afin de respecter toute nouvelle réglementation ou dans le but d’améliorer l’utilisation de son site. De ce fait, les conditions applicables seront celles en vigueur à la date de la commande par l’acheteur.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                <h2 className="text-xl font-bold">Article 2. Produits</h2>
                <div className='flex flex-col items-start w-full'>
                    <p>Les produits proposés sont ceux qui figurent sur le site Merveilles de Morph’ose de la société dans la limite des stocks disponibles. La société se réserve le droit de modifier à tout moment l’assortiment de produits. Chaque produit est présenté sur le site internet sous forme d’un descriptif reprenant ses principales caractéristiques techniques. Les photographies sont les plus fidèles possibles mais n’engagent en rien la société. La vente des produits présentés dans le site Merveilles de Morph’ose est destinée à tous les acheteurs résidants dans les pays qui autorisent pleinement l’entrée sur leur territoire de ces produits. </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 3. Tarifs</h2>
                  <p>Les prix figurant sur les fiches produits du catalogue internet sont des prix en Euros (€) toutes taxes comprises (TTC) tenant compte de la TVA applicable au jour de la commande, sauf indication contraire et hors frais de traitement et d’expédition. Tout changement du taux de la TVA pourra être répercuté sur le prix des produits. La société se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l’acheteur. </p>
                  <p>Les prix indiqués ne comprennent pas les frais de livraison, facturés en supplément du prix des produits achetés suivant le montant total de la commande. En France métropolitaine, pour toute commande supérieure ou égale à un certain montant en euros TTC, les frais de port sont offerts ; ce montant peut être modifié à tout moment par la société. Ce montant est spécifié dans un bandeau en haut de chaque page du site internet et lors de vos achats. Pour toute commande inférieure à ce montant en euros TTC, un forfait de participation aux frais d’expédition sera facturé à l’acheteur. En dehors de la France métropolitaine, en plus de la livraison, des droits de douane ou autres taxes locales ou droits d’importation ou taxes d’état sont susceptibles d’être exigibles. Ces frais sont à la charge de l’acheteur.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 4. Commande et modalités de paiement </h2>
                  <p>Avant toute commande, l’acheteur doit créer un compte sur le site Merveilles de Morph’ose. A chaque visite, l’acheteur, s’il souhaite commander ou consulter son compte (état des commandes, profil…), devra s’identifier à l’aide de ces informations. </p>
                  <p>Le fait de valider sa commande implique pour l’acheteur qu’il a l’obligation de payer le prix indiqué.  </p>
                  <p>La société propose à l’acheteur de commander et régler ses produits de façon sécurisée, avec plusieurs options de paiement sécurisé au choix, via Stripe : linK , Paypal , Carte bancaire , iDEAL , Bancontact , EPS.</p>
                  <p>La confirmation d’une commande entraîne l’acceptation des présentes conditions de vente, la reconnaissance d’en avoir parfaite connaissance et la renonciation à se prévaloir de ses  conditions d’achat. L’ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. La société communiquera à l’acheteur par courrier électronique la confirmation de l’enregistrement de sa commande.</p>
                  <p>Si l’acheteur souhaite contacter Merveilles de Morph’ose, il peut le faire via la page « contact » du site internet.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 5. Réserve de propriété – produits physqiues</h2>
                    <p>La société conserve la propriété pleine et entière des produits vendus jusqu’au parfait encaissement du prix, en principal, frais et taxes compris.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 6. Rétractation </h2>
                  <p>En vertu de l’article L121-20 du Code de la consommation, l’acheteur dispose d’un délai de quatorze jours ouvrables à compter de la livraison de leur commande pour exercer son droit de rétractation et ainsi faire retour du produit à la société pour échange ou remboursement sans pénalité, à l’exception des divers frais de retour (livraison, droits de douane ou autres taxes locales ou droits d’importation ou taxes d’état). Les frais de retour sont donc à la charge de l’acheteur.</p>
                  <p>Les produits sont à retourner dans leur état d’origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion ou tout retour incomplet peut être de nature à faire échec au droit de rétractation. </p>
                  <p>En cas d’exercice du droit de rétractation, la société procédera à l’échange ou au remboursement des sommes versées dans un délai de 30 jours suivant la notification de demande de l’acheteur et la réception des produits par la société, par envoi de nouveaux produits ou remboursement via le même moyen de paiement que celui utilisé lors de la commande.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">EXCEPTIONS AU DROIT DE RETRACTATION</h2>
                  <p>Conformément aux dispositions de l’article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s’applique pas à :  </p>
                  <p>La fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l’exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</p>
                  <p>La fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation.</p>
                  <p>La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.</p>
                  <p>La fourniture de biens susceptibles de se détériorer ou de se périmer rapidement.</p>
                  <p>La fourniture de biens qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d’hygiène ou de protection de la santé.</p>
                  <p>La fourniture de biens qui, après avoir été livrés et de par leur nature, sont mélangés de manière indissociable avec d’autres articles.</p>
                  <p>La fourniture de boissons alcoolisées dont la livraison est différée au-delà de trente jours et dont la valeur convenue à la conclusion du contrat dépend de fluctuations sur le marché échappant au contrôle du professionnel.</p>
                  <p>La fourniture d’enregistrements audio ou vidéo ou de logiciels informatiques lorsqu’ils ont été descellés par le consommateur après la livraison.</p>
                  <p>La fourniture d’un journal, d’un périodique ou d’un magazine, sauf pour les contrats d’abonnement à ces publications.</p>
                  <p>Les transactions conclues lors d’une enchère publique.</p>
                  <p>La fourniture d’un contenu numérique non fourni sur un support matériel dont l’exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">EXCEPTIONS AU DROIT DE RÉTRACTATION – PRESTATIONS DE SERVICES</h2>
                  <p>out achat de prestations de services est définitif : produits digitaux, séances individuelles, inscription à des ateliers/évènements collectifs, réservations de salle. Les séances individuelles peuvent être reportées.</p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 7. Livraison S</h2>
                  <p>Les livraisons sont faites à l’adresse indiquée sur le bon de commande qui ne peut être que dans la zone géographique convenue. Les commandes sont effectuées par des services de livraison avec suivi. Les délais de livraison sont variables selon l’adresse indiquée. </p>
                  <p>En cas de livraisons par une transporteur, la société ne peut être tenue pour responsable de retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.
                  La société ne peut être tenue pour responsable de retard de livraison dû exclusivement aux services de livraison.</p>
            </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 8. Garantie </h2>
                  <p>Tous les produits fournis par la société bénéficient de la garantie légale prévue par les articles 1641 et suivants du Code civil.</p>
                  <p>La société est tenue de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l’usage auquel on la destine, ou qui diminuent tellement cet usage que l’acheteur ne l’aurait pas acquise, ou n’en aurait donné qu’un moindre prix, s’il les avait connus.
                  Toutes les réclamations, demandes d’échange ou de remboursement doivent s’effectuer par message via la page contact du site internet Merveilles de Morph’ose dans le délai de 15 jours après la livraison.  </p>
                  <p>Les produits doivent être retournés à la société dans l’état dans lequel l’acheteur les a reçus avec l’ensemble des éléments (accessoires, emballage, notice…). Dans ce cas, les frais de retour seront remboursés à l’acheteur par la société sur présentation des justificatifs. 
                  Les dispositions de cet Article n’empêchent pas l’acheteur de bénéficier du droit de rétractation prévu à l’article 6. </p>
            </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 9. Responsabilité </h2>
                  <p>Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il appartient à l’acheteur de vérifier auprès des autorités locales les possibilités d’importation ou d’utilisation des produits ou services qu’il envisage de commander. </p>
                  <p>Par ailleurs, la société ne saurait être tenue pour responsable des dommages résultant d’une mauvaise utilisation du produit acheté.</p>
                  <p>La responsabilité de la société ne pourra être engagée pour tous les inconvénients ou dommages résultants de l’utilisation du réseau Internet tel que : perte de données, intrusion, virus, rupture du service, ou autres problèmes involontaires.</p>
            </div>
              <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="text-xl font-bold">Article 10. Propriété intellectuelle </h2>
                  <p>Tous les éléments du site de Merveilles de Morph’ose sont et restent la propriété intellectuelle et exclusive de la société. Personne n’est autorisé à reproduire, exploite, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu’ils soient sous forme de photo, logo, visuel, vidéo, texte, logiciel ou sonores. La liste est non exhaustive. 
                  Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société.  </p>
                  <p>Après commande d’un Contenu, l’acheteur ne bénéficie que d’un droit d’utilisation personnel des fichiers dans un cadre strictement privé et gratuit. L’acheteur s’engage expressément à garder confidentiel le lien de téléchargement du Contenu qui lui sera transmis et à ne pas le communiquer sous quelque forme que ce soit à un tiers.
                  Toute reproduction, représentation ou usage public collectif sont prohibés.</p>
                  <p>De même, tout échange, revente ou louage à un tiers du Contenu est strictement interdit et sera considéré comme une violation des droits d’auteurs, passible de poursuites judiciaires civiles et /ou pénales.</p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
                <h2 className="text-xl font-bold">Article 11. Données à caractère personnel</h2>
                <p>La société s’engage à préserver la confidentialité des informations fournies par l’acheteur, qu’il serait amené à transmettre pour l’utilisation de ces services. 
                Ces informations sont nécessaires à la gestion des commandes, ainsi qu’à l’amélioration des services et des informations que la société adresse à l’acheteur. </p>
                <p>Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l’exécution des services et commandes pour leur gestion, exécution, traitement et paiement.  </p>
                <p>La responsabilité de la société ne pourra être engagé en cas de non-respect de la confidentialité de ces informations par les sociétés qui contribuent aux relations cités ci-dessus.</p>
                <p>Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.  </p>
                <p>Toute information concernant l’acheteur est soumise aux dispositions de la loi n° 78-17 du 6 janvier 1978. A ce titre, l’acheteur dispose d’un droit d’accès, de modification et de suppression des informations le concernant. </p>
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
                <h2 className="text-xl font-bold">Article 12. Règlement des litiges </h2>
                <p>La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents. </p>
            </div>
          </div>
        </main>
    </>
  )
}