import Layout from "@/components/layout/layout"
import Image from "next/image"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useRef, useContext, useState, useCallback } from "react";
import { UpdateButton } from "@/components/articles/updateButton";
import { CustomHead } from "@/components/customHead";
import { CustomButton } from "@/components/homepage/homepage"
import { CartContext, OpenCartContext } from "@/utils/cartProvider";
import { Newletter } from "@/components/homepage/homepage";
import { Thumb } from "@/utils/emblaThumb"
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import Close from '../../../../public/assets/essentials-icons/close.svg'
import useEmblaCarousel from 'embla-carousel-react'
import { CenterModal } from "@/components/modal";


// const QUESTION_COUNT = 4
export const QUESTION = [
    {
        title:"Quels types de produits proposez-vous ?",
        text:"Nous proposons une variété de produits axés sur le développement personnel, la créativité, le bien-être, incluant : cristaux, livres au thématiques variés, encens, tarots, oracles, pendules, bijoux, articles pour enfants, articles de méditation, articles d’occasion. "
    },
    {
        title:"Comment puis-je savoir quel produit me convient ?",
        text:"Nous vous recommandons de lire les descriptions détaillées de nos produits et leurs bénéfices potentiels. Pour des conseils personnalisés, faites appel à nos services via la séance individuelle de votre choix. Aucune indication sur ce site ne se substituera à un avis médical."
    },
    {
        title:"Les produits sont-ils éthiques et durables ?",
        text:"Nous nous engageons à fournir des produits le plus éthiquement sourcés et durables. Nous travaillons avec des fournisseurs qui respectent notre éthique et nos valeurs."
    },
    {
        title:"Quelles sont vos politiques de livraison ?",
        text:"Nous livrons partout en France et à l'international. Les frais de livraison sont calculés à la caisse selon le poids de la commande et la destination. Les délais de livraison peuvent varier de 3 à 10 jours ouvrés en France Métropolitaine. A partir d’une certaines sommes, la livraison est gratuite en France Métropolitaine. Cette somme est susceptible de varier."
    },
    {
        title:"Les cartons d’emballage utilisés sont-ils écologiques et respectueux de l’environnement ?",
        text:"L’entreprise que nous avons sélectionnée a une démarche environnementale volontaire, globale et concrète et vise à réduire efficacement l’impact de son activité sur l’environnement."
    },
    {
        title:"Comment puis-je suivre ma commande ?",
        text:"Une fois votre commande effectuée, vous recevrez un numéro de suivi par email. Vous pourrez utiliser ce numéro sur notre site web pour suivre le statut de votre commande."
    },
    {
        title:"Quelles sont vos politiques de retour et de remboursement ?",
        text:"L’acheteur dispose d'un délai de quatorze jours ouvrables à compter de la livraison de leur commande pour exercer son droit de rétractation.Pour obtenir plus d’éléments à ce sujet, vous pouvez vous vous rendre à l’Article 6 des conditions générales de vente du site."
    },
    {
        title:"Comment puis-je effectuer un paiement sécurisé sur votre site ?",
        text:"Nous utilisons une technologie de cryptage SSL pour sécuriser toutes les transactions. Vous pouvez payer par carte de crédit, PayPal ou autres méthodes de paiement électronique disponibles."
    },
    {
        title:"Offrez-vous des promotions ou des réductions ?",
        text:"Nous offrons en effet des promotions et des réductions. Inscrivez-vous à notre newsletter et suivez-nous sur les réseaux sociaux pour recevoir des alertes promotionnelles ainsi que des offres exclusives."
    },
    {
        title:"Comment puis-je vous contacter si j'ai des questions supplémentaires ?",
        text:"Pour obtenir plus d’informations, vous pouvez lire les conditions générales de vente ou la politique de confidentialité.Si votre question reste sans réponse, vous pouvez nous contacter via la page « contact » de notre site internet. Nous vous répondrons dans les plus brefs délais. "
    },
    {
        title:"Quels types de services proposez-vous ?",
        text:"Nous proposons différents services avec une distribution variée : séances individuelles, services personnalisés et des ateliers/événements/conférences collectifs : créativité, développement des capacités subtiles, découvertes de livres inspirants, apprentissages divers, approfondissement des connaissances, ..."
    },
    {
        title:"Comment puis-je savoir quel service me convient ?",
        text:"Nous vous recommandons de lire les descriptions de nos services et leurs bénéfices potentiels. Les thématiques et les approches abordées sont variées, vous trouverez surement votre bonheur. "
    },

    {
        title:"Quelle sont nos valeurs et notre éthique ?",
        text:"Bienveillance, respect, partage, confiance sont des valeurs qui nous sont chères. Nous vous proposons des espaces confidentiels où vous pourrez être vous-même en toute sérénité et sécurité. Nous vous accompagnons au mieux pour que vous preniez vos décisions de façon éclairée, nous souhaitons que vous deveniez de plus en plus autonome dans la quête de votre bien être. Vous êtes et resterez les seul(e)s décisionnaires de votre vie."
    },
    {
        title:"Ces services sont-ils accessibles en ligne ou en présentiel ?",
        text:"Pour répondre à tous les besoins, la distribution est différente selon les services : en présentiel, en visio, par retour mail."
    },
    {
        title:"Où retrouver les éléments utiles concernant mon rendez-vous ?",
        text:"Suite à votre inscription, les éléments utiles vous seront envoyés par mail. Date, lieu, numéro de commande, …"
    },
    {
        title:"Comment puis-je m’inscrire à vos services ?",
        text:"Les réservations et les paiements se font directement en ligne sur notre site internet ou en boutique (nous n’acceptons pas les chèques)."
    },

    {
        title:" Quelles sont vos politiques de remboursement ?",
        text:"Tout achat de prestations de services est définitif : produits digitaux, séances individuelles, inscription à des ateliers/évènements collectifs."
    },
    {
        title:"Comment puis-je effectuer un paiement sécurisé sur votre site ?",
        text:"Nous utilisons une technologie de cryptage SSL pour sécuriser toutes les transactions. Vous pouvez payer par carte de crédit, PayPal ou autres méthodes de paiement électronique disponibles."
    },
    {
        title:"Offrez-vous des promotions ou des réductions ?",
        text:"Nous offrons en effet des promotions et des réductions. Inscrivez-vous à notre newsletter et suivez-nous sur les réseaux sociaux pour recevoir des alertes promotionnelles ainsi que des offres exclusives."
    },
    {
        title:"Comment puis-je vous contacter si j'ai des questions supplémentaires ?",
        text:"Pour obtenir plus d’informations, vous pouvez lire les conditions générales de vente, les mentions légales ou la politique de confidentialité.Si votre question reste sans réponse, vous pouvez nous contacter via la page « contact » de notre site internet. Nous vous répondrons dans les plus brefs délais. "
    },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({query}) {
    const product =  await fetch(`${API_URL}/products/${query.art}`, GETRequest).then(r => r.json())
    return {
        props: {
            product: product,
        }
    }
}

const OPTIONS = { slidesToScroll: 'auto' }

export default function Article({product}) {
    const { setBag } = useContext(OpenCartContext);

    const { cart, dispatch } = useContext(CartContext);
    const updateCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            quantity: quantityValue,
            id:product?.id,
            title: product?.title,
            price : product?.price,
            reference: product?.reference,
            promo_price: product?.promo_price,
            picture: product?.images[0],
            stock: product?.stock
        })
    }

    //THUMBNAILS EMBLA
    const [emblaRef, emblaMainApi] = useEmblaCarousel(OPTIONS)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      containScroll: 'keepSnaps',
      dragFree: true
    })
  
    const onThumbClick = useCallback(
      (index) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
      },
      [emblaMainApi, emblaThumbsApi]
    )
  
    const onSelect = useCallback(() => {
      if (!emblaMainApi || !emblaThumbsApi) return
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
  
    useEffect(() => {
      if (!emblaMainApi) return
      onSelect()
      emblaMainApi.on('select', onSelect)
      emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])
    //THUMBNAILS EMBLA

    const [modal, setModal] = useState(false)


    //STOCK
    const [quantityFromCart, setQuantityFromCart] = useState(0)
    const [quantityValue, setQuantityValue] = useState(1)
    const [currentStock, setCurrentStock] = useState(0)

    useEffect(() => {
        let totalStock = product?.stock - quantityFromCart;
        setCurrentStock(totalStock);
    }, [quantityFromCart, product]); 

    useEffect(() => {
        const currentProductFromCart = cart?.filter(cartArt => cartArt.id === product.id)
        if(currentProductFromCart?.length > 0) {
            setQuantityFromCart(currentProductFromCart?.map(art => art.quantity).reduce((acc, current) => acc + current, 0))
            return
        }
        setQuantityFromCart(null)
    }, [cart, product])

    useEffect(() => {
        if((currentStock < quantityValue) && currentStock){
            setQuantityValue(currentStock)
        }
        if(quantityValue < 0) {
            setQuantityValue(0)
        }
    }, [currentStock, quantityValue])   

    return (
        <>
            <CustomHead pageName='Boutique' metaResume="Détails de l'article selectionné" />
            <ModalFAQ data={QUESTION} modal={modal} setModal={setModal} />
            <Layout>
                <main className="w-full mt-10 mb-20 xl:mb-10 sm:mt-5">
                    <section className="bg-background p-10 overflow-hidden mx-10 rounded-3xl flex gap-5 flex-col sm:p-5 sm:m-5 2sm:p-2">
                        <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[100%] top-0 w-[80%]"></div>
                        <Breadcrumbs separator="›" aria-label="breadcrumb" className="z-10 py-3 px-3 sm:text-xs">
                            <Link className='hover:underline underline-offset-2' href={{pathname: `/categories/${product?.breadcrumb[1]?.slug}`, query: { cat:product?.breadcrumb[1]?.id }}}>{product?.breadcrumb[1]?.title}</Link>
                            <p className="text-black">{product?.title}</p>
                        </Breadcrumbs> 
                        <div className="flex md:flex-col gap-20 h-full lg:gap-10">
                            {product?.images?.length > 0
                            ?<div className=" max-w-[1200px] m-auto w-1/2 md:w-full h-full">
                                {/* VIEWPORT */}
                                <div className="overflow-hidden rounded-2xl h-full" ref={emblaRef}>
                                    {/* CONTAINER */}
                                    <div className="flex touch-pan-y h-full">
                                        {product?.images?.map((s, index) =>
                                                <div key={index} className="min-w-0 flex-[0_0_100%] h-0 pb-[85%] max-h-[600px] md:max-h-[400px]">
                                                    <div className="w-full h-0 pb-[80%] relative">
                                                        <Image src={s?.url} fill className="object-cover rounded-2xl" alt='Article picture'/>
                                                    </div>
                                                </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="overflow-hidden" ref={emblaThumbsRef}>
                                        <div className="flex gap-5 h-28 sm:h-20">
                                            {product?.images?.map((m, index) => (
                                            <Thumb
                                                key={index}
                                                image={m?.url}
                                                onClick={() => onThumbClick(index)}
                                                selected={index === selectedIndex}
                                                index={m?.url}
                                            />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg px-6 py-10  max-w-[1200px] w-1/2 md:w-full">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            }
                            <div className="w-1/2 flex flex-col gap-10 h-[600px] justify-between md:w-full md:h-auto">
                                <div className="flex flex-col gap-3 text-secondary">
                                    <h2 className="font-extrabold  text-3xl xl:text-2xl lg:text-xl sm:text-base">{product?.title}</h2>
                                    <p className="sm:text-sm">{product?.description}</p>
                                    <div className="flex items-center gap-2 mt-5">
                                        <p className="text-2xl font-medium lg:text-xl sm:text-base">{product?.promo_price ? product?.promo_price : product?.price}€ TTC</p>
                                        { product?.promo_price
                                            ? <p className="text-xl text-[#A57A95] font-medium line-through lg:text-lg sm:text-sm">{product?.price}€ TTC</p>
                                            : ''
                                        }
                                    </div>
                                    {currentStock === 1 
                                        ? <p className="font-bold text-lg sm:text-base">{`Il n'en reste plus que un.`}</p>
                                        : <div className="flex flex-col mt-5">
                                            <p className="font-medium sm:text-sm">Quantités disponibles</p>
                                            <p className="font-bold text-lg sm:text-base">{currentStock}</p>
                                        </div>
                                    }
                                </div>
                            
                                <div className="flex flex-col">
                                    {currentStock <= 0 ?
                                    <p className="py-5 text-secondary font-semibold">{`Ce produit n'est plus en stock.`}</p>
                                    :
                                        <>
                                        <div className="flex gap-5 items-center mt-8 sm:mt-0">
                                            <UpdateButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} stock={currentStock} />
                                        </div>
                                        <div className="py-5" onClick={() => {updateCart();setBag(true)}}>
                                            <CustomButton butterfly={true} text="Acheter" style={{width:"250px", height:'40px'}} />
                                        </div>
                                        </>
                                    }
                                    <div className="flex text-sm text-secondary">
                                        <p className="">Référence : {product?.reference ? product?.reference : '0'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mx-10 flex flex-col gap-10 pt-20 lg:gap-10 sm:pt-10 sm:mx-5">
                        <div className="flex w-fit px-8 font-semibold text-lg lg:text-base rounded-xl gap-10 bg-homeGradient3 py-3 sm:gap-8 sm:px-3">
                            <p className="underline underline-offset-2 text-white cursor-pointer">Informations supplémentaire</p>
                            <p onClick={() => {setModal(true)}} className="underline underline-offset-2 text-secondary cursor-pointer">Question</p>
                        </div>
                        <div className="w-full flex flex-col text-secondary gap-5">
                            <h2 className="px-8 w-fit font-extrabold text-2xl lg:text-xl sm:text-base sm:px-4">A propos de ce produit</h2>
                            { product?.big_description 
                                ? <p className="p-8 border rounded-2xl border-primary sm:text-sm sm:p-4">{product?.big_description}</p>
                                : <p className="p-8 border rounded-2xl border-primary sm:text-sm sm:p-4">Aucune information complémentaire.</p>
                            }
                        </div>
                    </section>
                    <Newletter />
                </main>
            </Layout>
        </>
    )
}

export function ModalFAQ ({data, setModal, modal}) {
    return (

        <CenterModal open={modal} setOpen={setModal}>
            <div className="flex flex-col max-w-[1280px] w-full rounded-xl overflow-hidden text-white px-10 relative md:max-w-[95vw] md:px-3 2sm:w-screen">
                <Image src={Close} alt="Close pictogram" 
                       onClick={() => {setModal(false)}} 
                       className='self-end h-7 w-auto cursor-pointer' />
                <section className='flex flex-col gap-5 max-w-[800px] items-center md:px-0 my-5 lg:max-w-[80vw] md:max-w-[95vw]'>
                    <div className="flex items-center justify-center w-full p-10 border-[3px]  text-center bg-white border-[#C63D2F] rounded-2xl">
                        <h1 className="font-Quesha text-[#C63D2F] max-w-[600px] text-7xl xl:text-6xl md:text-4xl 2sm:text-3xl">QUESTIONS FREQUENTES</h1>
                    </div>
                    <div className="bg-menuGradient p-10 rounded-2xl w-full max-h-[50vh] scrollbar-thumb-gray-300 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded md:p-3">
                        <div className="bg-homeGradient3 flex flex-col gap-5 rounded-xl px-5 pt-5 sm:px-0">
                            {data.map((q, index) => 
                                <div key={index} className="border-gray border-b mx-10 sm:mx-5" style={index === QUESTION.length-1 ? {border:'none'} : {}}>
                                    <Question data={q} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </CenterModal>
    )
}

function Question ({data}) {
    const details = useRef(null)
    const [heightDetails, setHeightDetails] = useState()
    const [openDetails, setOpenDetails] = useState(false)

    return(
        <div className="flex flex-col pb-5">
            <section className="flex justify-between items-center cursor-pointer w-full group" onClick={() => {setHeightDetails(details?.current?.offsetHeight); setOpenDetails(!openDetails)}}>
                <div className="text-lg lg:text-base font-semibold text-white flex flex-col">
                <p>{data?.title}</p>
                </div>
                <div className='flex flex-col justify-between h-4 w-4 relative cursor-pointer lg:w-3 lg:h-3'>
                    <BlackHamburgerLine animation={openDetails ? {transform:'rotate(180deg)'} : {transform:'rotate(90deg)'}}/>
                    <BlackHamburgerLine />
                </div>
            </section>
            <section className="flex items-start w-full justify-center overflow-hidden" style={openDetails ? {maxHeight:`${heightDetails}px`, transition:'all 1s'} : { maxHeight:0, transition:'all 700ms'}}>
                <div ref={details} className="flex w-full justify-center pt-5">
                    <p className="sm:text-sm">{data?.text}</p>
                </div>
            </section>
        </div>
    )
}

function BlackHamburgerLine ({animation}) {
    return(
    <span className={`bg-white h-[2px] top-2 w-full absolute transition-all lg:top-[5px]`}
          style={animation}></span>
    )
  }