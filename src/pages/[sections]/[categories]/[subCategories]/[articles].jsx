import Layout from "@/components/layout/layout"
import ZoomIn from "@/components/articles/zoomIn"
import Image from "next/image"
import Link from "next/link"
import { GETRequest } from "@/utils/requestHeader"

import { useEffect, useRef, useContext, useState } from "react";
import { register } from "swiper/element/bundle";
register();

import { FormControl } from "@mui/material";
import { MenuItem, Select, ThemeProvider, Button, Breadcrumbs} from "@mui/material";

import { colorTheme } from "@/components/styles/mui";
import { lock } from "@/utils/lockScreen"
import { Loading } from "@/components/loader"
import { UpdateButton } from "@/components/articles/updateButton";
import { CustomHead } from "@/components/customHead";

import { CartContext, OpenCartContext } from "@/utils/cartProvider";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({ params, locale }) {
    const result = await fetch(`https://api.bat-n3.darianne.fr/products`, GETRequest).then(r => r.json())
    const productIndex = await result.findIndex(product => product.slug === params.articles)
        return {
            props: {
                product: result[productIndex],
                ...(await serverSideTranslations(locale, ['common'])),
            }
    }
}

export async function getStaticPaths({locales}) {
    const product = await fetch('https://api.bat-n3.darianne.fr/categories', GETRequest).then(r => r.json())
    return {
        paths: product.map(category => 
            category.childs.map(cat => 
                cat.childs.map(sub =>
                    sub.products.map(p => 
                        locales.map(locale => {
                        return{
                            params: {
                                articles:p.slug,
                                subCategories: sub.slug,
                                categories:cat.slug, 
                                sections:category.slug,
                            },
                            locale:locale
                        }
                    })
                )))).flat(Infinity),
    fallback:false //false : return 404 if path doenst exist 
    };
}


export default function Article({product}) {
    const { t } = useTranslation()
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
        const swiperContainer = swiperRef.current;
        Object.assign(swiperContainer, swiperParams);
        swiperContainer.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);
    return (
        <>
            <CustomHead pageName='Product' metaResume='Product' />
            <Layout>
                <ZoomIn zoom={zoom} setZoom={setZoom} product={product} />
                <Breadcrumbs separator="›" aria-label="breadcrumb" className="z-[10] px-[3.5%] my-3 2xl:px-[2.5%] xl:px-[1.25%] lg:px-14 sm:text-xs">
                    <Link className='hover:underline underline-offset-2' href="/[sections]" as={`/${product?.breadcrumb[2]?.slug}`}>{product?.breadcrumb[2]?.title}</Link>
                    <Link className='hover:underline underline-offset-2' href="/[sections]/[categories]" as={`/${product?.breadcrumb[2]?.slug}/${product?.breadcrumb[1]?.slug}`}>
                        {product?.breadcrumb[1]?.title}
                    </Link>
                    <Link className='hover:underline underline-offset-2' href="/[sections]/[categories]/[subCategories]" as={`/${product?.breadcrumb[2]?.slug}/${product?.breadcrumb[1]?.slug}/${product?.breadcrumb[0]?.slug}`}>
                        {product?.breadcrumb[0]?.title}
                    </Link>
                    <p className="text-black">{product?.title}</p>
                </Breadcrumbs>                
                <main className="tracking-wide w-full flex-1 grid grid-cols-[24%_52%_24%] mt-10 mb-20 xl:text-xs xl:mb-10 
                                lg:grid-cols-[45%_55%] lg:px-16
                                md:grid-cols-1 md:place-items-center md:px-0 sm:mt-5">
                    <section className="leading-6 w-full flex flex-col gap-5 px-[15%] sticky self-start top-[152px]
                                        2xl:px-[10%] xl:px-[5%] 
                                        lg:row-[2_/_3] lg:col-start-1 lg:col-end-3 lg:pt-10 lg:static
                                        md:row-auto">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl xl:text-xl">Product designer</h1>
                            <h2>{product.title}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: product.description}} />
                    </section>
                    {!product 
                        ? <Loading />
                        : 
                        <section className=" grid grid-cols-2 gap-1 relative cursor-pointer lg:hidden" onClick={() => {setZoom(true);lock()}}>
                            {product.images.slice(0, 4).map(image => 
                                <Image key={uuidv4()} src={image.url} width={0} height={0} className="w-full h-auto" alt='Article picture'/>
                            )}
                        </section>
                    }
                    <swiper-container ref={swiperRef} class="grid-cols-1 w-full max-w-[340px] hidden 
                                    lg:grid lg:place-items-start
                                    md:row-[1_/_2] md:w-1/2
                                    sm:w-3/4 sm:max-w-[300px]
                                    2sm:w-full" init="false"> 
                        {product?.images.map(item => 
                            <swiper-slide key={uuidv4()}>
                                    <Image onClick={() => {setZoom(true);lock()}} src={item.url} alt='Article picture' width={0} height={0} className="w-full h-auto" priority/>
                            </swiper-slide>
                        )}
                    </swiper-container>
                    <section className="text-right leading-6 w-full flex flex-col gap-10 px-[15%] sticky self-start top-[152px]
                                        2xl:px-[10%] xl:px-[5%] lg:pl-16 lg:static
                                        md:pt-16 md:w-2/3 md:px-0
                                        sm:px-[5%] sm:w-full">
                        <h1 className="text-xl xl:text-lg">{product?.price}€</h1>
                        <form className="flex flex-col gap-2" ref={selector}>
                            <ThemeProvider theme={colorTheme}>
                            {product?.variantes.length > 0
                                ?
                                <>
                                    <div className="flex justify-between">
                                        <h2>{t('article.size')} : (FR)</h2>
                                        {/* <p className="underline underline-offset-2 cursor-pointer">Size guide</p> */}
                                    </div>
                                    <FormControl variant="standard" sx={{ textAlign:'left', minWidth: '100%' }}>
                                        <Select labelId="size" label="Size" sx={{fontSize:14}} required
                                                value={size} displayEmpty onChange={handleChangeSize}>
                                            <MenuItem value="" disabled><em className="text-[11px]">{t('article.selectSize')}</em></MenuItem>
                                            {product?.variantes?.map(v => <MenuItem key={v.id} sx={{fontSize:14}} value={v.option_values[0].title}>{v.option_values[0].title}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    {error
                                        ? <p className="text-xs text-red-800 self-start">{t('article.sizeError')}</p>
                                        : ''
                                    }
                                </>
                                :<p className="text-start">{t('article.nosize')}</p>
                            }
                                <div className="flex gap-5 items-center mt-8">
                                    <h2 className="text-left">{t('article.quantity')} :</h2>
                                    <UpdateButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} updateFct={false} article={[]} />
                                </div>
                                <Button onClick={() => {
                                    if(selector.current.checkValidity()) {
                                        setError(false);updateCart();setBag(true);lock()
                                        return
                                    }
                                    setError(true)
                                }} variant="contained" sx={{borderRadius:0, mt:4, fontSize:12}} className="bg-black">{t('article.button')}</Button>
                            </ThemeProvider>
                        </form>
                        <div className="text-xs tracking-wider flex flex-col gap-1">
                            {/* <p className="cursor-pointer">Product details</p> */}
                            <p className="cursor-pointer">{t('article.delivery')}</p>
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    )
}

const swiperParams = {
    pagination: true,
    injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
            color: black;
            width: 10px;
            height: auto;
        }
        .swiper-pagination-bullet{
            background-color: black;
        }
    `,
    ],
};