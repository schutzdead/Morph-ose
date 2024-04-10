import Layout from "@/components/layout/layout"
import ZoomIn from "@/components/articles/zoomIn"
import Image from "next/image"
import Link from "next/link"
import { GETRequest } from "@/utils/requestHeader"

import { useEffect, useRef, useContext, useState } from "react";

import { FormControl } from "@mui/material";
import { MenuItem, Select, ThemeProvider, Button, Breadcrumbs} from "@mui/material";

import { colorTheme } from "@/components/styles/mui";
import { lock } from "@/utils/lockScreen"
import { Loading } from "@/components/loader"
import { UpdateButton } from "@/components/articles/updateButton";
import { CustomHead } from "@/components/customHead";
import { CustomButton } from "@/components/homepage/homepage"

import { CartContext, OpenCartContext } from "@/utils/cartProvider";

import { PrevButton, NextButton, usePrevNextButtons } from "@/utils/emblaButton";
import { DotButton, useDotButton } from "@/utils/emblaDot";

import useEmblaCarousel from 'embla-carousel-react'

const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export async function getServerSideProps() {
    const result = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(r => r.json())
    return {
        props: {
            product: result[0].childs[1].childs[1].products[0],
        }
    }
}

const OPTIONS = { slidesToScroll: 'auto' }

export default function Article({product}) {
    const { setBag } = useContext(OpenCartContext);
    const { v4: uuidv4 } = require('uuid');
    const swiperRef = useRef(null);    
    const [dataProduct, setDataProduct] = useState()
    const [quantityValue, setQuantityValue] = useState(1)
    const [zoom, setZoom] = useState(false)
    const [size, setsize] = useState('')
    const [currentSize, setCurrentSize] = useState('')
    const [error, setError] = useState(false)
    const handleChangeSize = (e) => {
        setsize(e.target.value);
        const variantIndex = product?.variantes.findIndex(v => v.option_values[0]?.title === e.target.value)
        setCurrentSize(product?.variantes[variantIndex].id)
    }

    const selector = useRef(null)
    
    const { cart, dispatch } = useContext(CartContext);
    const updateCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            quantity: quantityValue,
            size:size,
            sizeId:currentSize,
            id:dataProduct.id,
            title: dataProduct.title,
            price : dataProduct.price,
            picture: dataProduct.images[0],
        })
    }

    useEffect(() => {
        setDataProduct(product)
    }, [cart, product]);

    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <>
            <CustomHead pageName='Boutique' metaResume="Détails de l'article selectionné" />
            <Layout>
                <main className="w-full mt-10 mb-20 xl:mb-10 sm:mt-5">
                    <section className="bg-background overflow-hidden mx-20 rounded-3xl flex gap-20">
                        <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-[80%]"></div>
                        <div className=" max-w-[1200px] m-auto w-1/2"  >
                            {/* VIEWPORT */}
                            <div className="overflow-hidden" ref={emblaRef}>
                                {/* CONTAINER */}
                                <div className="flex touch-pan-y -ml-5">
                                    {SLIDES.map((s, index) =>
                                        <div key={index} className="min-w-0 flex-[0_0_100%] h-fit">
                                            <Image key={uuidv4()} src={product.images[0].url} width={0} height={0} className="w-full h-auto" alt='Article picture'/>
                                        </div>
                                    )}
                                </div>
                                </div>
                                <div className="grid grid-cols-[auto_1fr] justify-between items-center gap-[1.2rem] mt-[1.8rem]">
                                <div className="grid grid-cols-2 gap-[0.6rem] items-center h-8 md:h-6">
                                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                                </div>
                                <div className="embla__dots">
                                    {scrollSnaps.map((_, index) => (
                                    <DotButton key={index} onClick={() => onDotButtonClick(index)} className={'embla__dot'
                                        .concat(
                                        index === selectedIndex ? ' embla__dot--selected' : ''
                                        )}
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl xl:text-xl">Product designer</h1>
                                <h2>{product.title}</h2>
                            </div>
                            {/* <div dangerouslySetInnerHTML={{__html: product.description}} /> */}
                            <p>Lot de deux boîtes d’encens de Chine. Chaque boîte est composée de 2à bâtonnets d’encens. Profitez de notre offre spéciale sur ces bâtonnets d’encens qui vous feront voyager en Asie !!  </p>
                            <h1 className="text-xl xl:text-lg">{product?.price}€</h1>
                            <form className="flex flex-col gap-2" ref={selector}>
                                {product?.variantes.length > 0
                                    ?
                                    <>
                                        <div className="flex justify-between">
                                            <h2>Finition :</h2>
                                        </div>
                                        <FormControl variant="standard" sx={{ textAlign:'left', minWidth: '100%' }}>
                                            <Select labelId="size" label="Size" sx={{fontSize:14}} required
                                                    value={size} displayEmpty onChange={handleChangeSize}>
                                                <MenuItem value="" disabled><em className="text-[11px]">Selectionné la finition</em></MenuItem>
                                                {product?.variantes?.map(v => <MenuItem key={v.id} sx={{fontSize:14}} value={v.option_values[0].title}>{v.option_values[0].title}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        {error
                                            ? <p className="text-xs text-red-800 self-start">Vous devez sélectionner une finition</p>
                                            : ''
                                        }
                                    </>
                                    :<p className="text-start">Choix unique</p>
                                }
                                    <div className="flex gap-5 items-center mt-8">
                                        <h2 className="text-left">Qunatité :</h2>
                                        <UpdateButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} updateFct={false} article={[]} />
                                    </div>
                                    <div onClick={() => { if(selector.current.checkValidity()) {
                                            setError(false);updateCart();setBag(true);lock()
                                            return
                                        } setError(true)}}>
                                        <CustomButton butterfly={true} text="Ajouter" />
                                    </div>
                            </form>
                            <div className="text-xs tracking-wider flex flex-col gap-1">
                                {/* <p className="cursor-pointer">Product details</p> */}
                                <p className="cursor-pointer">Livraison</p>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    )
}