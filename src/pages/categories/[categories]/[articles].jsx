import Layout from "@/components/layout/layout"
import Image from "next/image"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useRef, useContext, useState, useCallback } from "react";
import Link from "next/link"
import { UpdateButton } from "@/components/articles/updateButton";
import { CustomHead } from "@/components/customHead";
import { CustomButton } from "@/components/homepage/homepage"
import { lock, unlock } from "@/utils/lockScreen";
import { CartContext, OpenCartContext } from "@/utils/cartProvider";
import { Newletter } from "@/components/homepage/homepage";
import { Thumb } from "@/utils/emblaThumb"

import Close from '../../../../public/assets/articles/close.svg'
import Plus from '../../../../public/assets/header/plus.svg'

import useEmblaCarousel from 'embla-carousel-react'


const QUESTION_COUNT = 4
const QUESTION = Array.from(Array(QUESTION_COUNT).keys())

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({query}) {
    const product =  await fetch(`${API_URL}/products/${query.articles}`, GETRequest).then(r => r.json())
    return {
        props: {
            product: product,
        }
    }
}

const OPTIONS = { slidesToScroll: 'auto' }

export default function Article({product}) {
    const { setBag } = useContext(OpenCartContext);
    const { v4: uuidv4 } = require('uuid');
    const [quantityValue, setQuantityValue] = useState(1)
    const [error, setError] = useState(false)

    const selector = useRef(null)
    
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
    const [position, setPosition] = useState()
    const [body, setBody] = useState()

    useEffect(() => {
        setBody(document?.querySelector('html'))
    },[])

    return (
        <>
            <CustomHead pageName='Boutique' metaResume="Détails de l'article selectionné" />
            <ModalFAQ modal={modal} setModal={setModal} position={position} body={body} />
            <Layout>
                <main className="w-full mt-10 mb-20 xl:mb-10 sm:mt-5">
                    <section className="bg-background p-10 overflow-hidden mx-10 rounded-3xl flex gap-20 lg:gap-10 md:flex-col sm:p-5 sm:m-5 2sm:p-2">
                        <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[100%] top-0 w-[80%]"></div>
                        <div className=" max-w-[1200px] m-auto w-1/2 md:w-full h-full">
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
                                    <div className="flex gap-5 w-full">
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
                        <div className="w-1/2 flex flex-col gap-10 h-[600px] justify-between md:w-full md:h-auto">
                            <div className="flex flex-col gap-3 text-secondary">
                                <h2 className="font-extrabold  text-3xl xl:text-2xl lg:text-xl sm:text-base">{product?.title}</h2>
                                <p className="sm:text-sm">{product?.description}</p>
                                <div className="flex items-center gap-2 mt-5">
                                    <p className="text-2xl font-medium lg:text-xl sm:text-base">{product?.promo_price ? product?.promo_price : product?.price}€</p>
                                    { product?.promo_price 
                                        ? <p className="text-xl text-[#A57A95] font-medium line-through lg:text-lg sm:text-sm">{product?.price}€</p>
                                        : ''
                                    }
                                </div>
                                <div className="flex flex-col mt-5">
                                    <p className="font-medium sm:text-sm">Quantités disponibles</p>
                                    <p className="font-bold text-lg sm:text-base">{product?.stock}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="flex gap-5 items-center mt-8 sm:mt-0">
                                    <UpdateButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} updateFct={false} article={[]} />
                                </div>
                                <div className="py-5" onClick={() => {updateCart();setBag(true);lock()}}>
                                    <CustomButton butterfly={true} text="Acheter" style={{width:"250px", height:'40px'}} />
                                </div>
                                <div className="flex text-sm text-secondary">
                                    <p className="">Référence : {product?.reference ? product?.reference : '0'}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mx-10 flex flex-col gap-10 pt-20 lg:gap-10 sm:pt-10 sm:mx-5">
                        <div className="flex w-fit px-8 font-semibold text-lg lg:text-base rounded-xl gap-10 bg-homeGradient3 py-3 sm:gap-8 sm:px-3">
                            <p className="underline underline-offset-2 text-white cursor-pointer">Informations supplémentaire</p>
                            <p onClick={() => {setModal(true); setPosition(Math.max(window.screenY, document.documentElement.scrollTop, document.body.scrollTop)); body.style.overflow = 'hidden'}} className="underline underline-offset-2 text-secondary cursor-pointer">Question</p>
                        </div>
                        <div className="w-full flex flex-col text-secondary gap-5">
                            <h2 className="px-8 w-fit font-extrabold text-2xl lg:text-xl sm:text-base sm:px-4">A propos de ce produit</h2>
                            { product?.big_description 
                                ? <p className="p-8 border rounded-2xl border-primary sm:text-sm sm:p-4">Lorem ipsum dolor sit amet consectetur. Vestibulum purus aliquam purus vel sed. Eu ornare enim tincidunt hendrerit libero commodo vitae netus magnis. Id at eget est id velit non in nulla tincidunt. Ultricies neque ac adipiscing ugiat leo scelerisque vulputate posuere. Habitant pellentesque posuere et nunc. Amet erat nibh scelerisque proin sollicitudin nisl vitae. Pretium eget dolor auctor velit commodo blandit lacus adipiscing. Mollis tristique orci varius urna integer egestas sagittis. Mauris iaculis diam feugiat gravida aliquam lobortis viverra. Volutpat ultrices libero augue ut justo cursus eget a. Mi sed tortor ac sed massa venenatis sed pretium. Lorem ipsum dolor sit amet consectetur. Vestibulum purus aliquam purus vel sed. Eu ornare enim tincidunt hendrerit libero commodo vitae netus magnis. Id at eget est id velit non in nulla tincidunt. Ultricies neque ac adipiscing turpis nunc orci fringilla tristique. In scelerisque velit dui eleifend pellentesque volutpat cras vitae. Diam urna purus cursus sit.</p>
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

function ModalFAQ ({setModal, modal, position, body}) {
    const [height, setHeight] = useState(position)


    useEffect(() => {
        setHeight(position)
    }, [position])


    return (
        <div className="w-[100vw] h-[100vh] bg-black/90 absolute flex-col items-center top-0 text-white z-50" style={modal ? {display:'flex', top:`${height}px`} : {display:'none', top:`${height}px`}}>
            <div className="w-8 h-8 cursor-pointer flex justify-center items-center absolute top-3 right-5" onClick={() => {body.style.overflow = 'auto';setModal(false);unlock()}}>
                <Image src={Close} alt="Close pictogram" className='w-8'/>
            </div>
            <section className='flex flex-col gap-5 max-w-[800px] items-center sm:px-5 my-5 lg:max-w-[80vw] md:max-w-[95vw] md:mt-14'>
                <div className="flex items-center justify-center w-full p-10 border-[3px]  text-center bg-white border-[#C63D2F] rounded-2xl">
                    <h1 className="font-Quesha text-[#C63D2F] max-w-[600px] text-7xl xl:text-6xl md:text-4xl 2sm:text-3xl">QUESTIONS FREQUENTES</h1>
                </div>
                <div className="bg-menuGradient p-10 rounded-2xl w-full max-h-[50vh] scrollbar-thumb-gray-300 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded sm:p-5">
                    <div className="bg-homeGradient3 flex flex-col gap-5 rounded-xl px-5 pt-5 sm:px-0">
                        {QUESTION.map((q, index) => 
                            <div key={index} className="border-gray border-b mx-10 sm:mx-5" style={index === QUESTION.length-1 ? {border:'none'} : {}}>
                                <Question />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

function Question () {
    const details = useRef(null)
    const [heightDetails, setHeightDetails] = useState()
    const [openDetails, setOpenDetails] = useState(false)
    return(
        <div className="flex flex-col pb-5">
            <section className="flex justify-between items-center cursor-pointer w-full group" onClick={() => {setHeightDetails(details?.current?.offsetHeight); setOpenDetails(!openDetails)}}>
                <div className="text-lg lg:text-base font-semibold text-white flex flex-col">
                <p>Question 1</p>
                </div>
                <div className='flex flex-col justify-between h-4 w-4 relative cursor-pointer lg:w-3 lg:h-3'>
                    <BlackHamburgerLine animation={openDetails ? {transform:'rotate(180deg)'} : {transform:'rotate(90deg)'}}/>
                    <BlackHamburgerLine />
                </div>
            </section>
            <section className="flex items-start w-full justify-center overflow-hidden" style={openDetails ? {maxHeight:`${heightDetails}px`, transition:'all 1s'} : { maxHeight:0, transition:'all 700ms'}}>
                <div ref={details} className="flex w-full justify-center pt-5">
                    <p className="sm:text-sm">Lorem ipsum dolor sit amet consectetur. Vestibulum purus aliquam purus vel sed. Eu ornare enim tincidunt hendrerit libero commodo vitae netus magnis. Id at eget est id velit non in nulla tincidunt. Ultricies neque ac adipiscing ugiat leo scelerisque vulputate posuere. Habitant pellentesque posuere et nunc. Amet erat nibh scelerisque proin sollicitudin nisl vitae. Pretium eget dolor auctor velit commodo blandit lacus adipiscing. Mollis tristique orci varius urna integer egestas sagittis. Mauris iaculis diam feugiat gravida aliquam lobortis viverra. Volutpat ultrices libero augue ut justo cursus eget a. Mi sed tortor ac sed massa venenatis sed pretium. Lorem ipsum dolor sit amet consectetur. Vestibulum purus aliquam purus vel sed. Eu ornare enim tincidunt hendrerit libero commodo vitae netus magnis. Id at eget est id velit non in nulla tincidunt. Ultricies neque ac adipiscing turpis nunc orci fringilla tristique. In scelerisque velit dui eleifend pellentesque volutpat cras vitae. Diam urna purus cursus sit.</p>
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