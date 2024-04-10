import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import Left from '../../../public/assets/articles/leftSide.svg'
import Right from '../../../public/assets/articles/rightSide.svg'
import { Loading } from "@/components/loader";

export function Tab ({category}) {
    return(
    <>
        {!category 
            ? <Loading />
            :category?.childs?.map(e => 
                <ul className="flex flex-col pb-10 gap-5 tracking-wide" key={e.id}>
                    <li className="cursor-pointer" >
                        <Link href="/[sections]/[categories]" as={`/${category?.slug}/${e?.slug}`}>{e?.title}</Link>
                    </li>
                    <ul className="flex flex-col gap-4 pl-5 cursor-pointer">
                        {e?.childs.map(sc => 
                            <li key={sc.id}>
                                <Link href="/[sections]/[categories]/[subCategories]" as={`/${category?.slug}/${e?.slug}/${sc.slug}`}>{sc?.title}</Link>
                            </li>
                        )}
                    </ul>
                </ul>
            )}
    </>
    )
}

export function ArticleCard ({articleParams}) {
    const breadCrumbLength = articleParams.breadcrumb.length-1
    const [article, setArticle] = useState(null)
    const [index, setIndex] = useState(0)
    const [appear, setAppear] = useState(false)

    useEffect(() => {
        setArticle(articleParams)
        if(innerWidth < 1281 && articleParams?.images.length > 1) setAppear(true)
        return () => {
            setArticle(null)
        }
    },[articleParams])

    const updateIndexRight = () => {
        if(article?.images.length <= 1) return
        if(index === article?.images.length-1) return setIndex(0)
        setIndex(index+1)
    }

    const updateIndexLeft = () => {
        if(article?.images.length <= 1) return
        if(index === 0) return setIndex(article?.images.length-1)
        setIndex(index-1)
    }

    const onlyOne = () => {
        if(article?.images.length <= 1) return
        setAppear(true)
    }

    return (
        <> 
        {!article 
            ? <Loading />
            : 
                <div className="group flex flex-col gap-3 cursor-pointer"
                    onMouseEnter={onlyOne}
                    onMouseLeave={() => {if(innerWidth && innerWidth>1281) setAppear(false)}}>
                <div className="overflow-hidden relative">
                    <Image src={Left} alt='Left arrow pictogram' className='z-10 w-10 h-auto absolute top-1/2 -translate-y-1/2 transition-all duration-300 left-1 cursor-pointer peer md:w-8 sm:w-7'
                            style={appear ? {opacity:1} : {opacity:0}}
                            onClick={() => updateIndexLeft()}/>
                    <Image src={Right} alt='Right arrow pictogram' className='z-10 w-10 h-auto absolute top-1/2 -translate-y-1/2 transition-all duration-300 right-1 cursor-pointer peer md:w-8 sm:w-7'                    
                            style={appear ? {opacity:1} : {opacity:0}}
                            onClick={() => updateIndexRight()}/>
                    <Link href="/[sections]/[categories]/[subCategories]/[articles]" as={`/${articleParams.breadcrumb[breadCrumbLength].slug}/${articleParams.breadcrumb[breadCrumbLength-1].slug}/${articleParams.breadcrumb[breadCrumbLength-2].slug}/${articleParams.slug}`}>
                        <Image src={article?.images[index].url} alt='Article picture' width={0} height={0} className="w-full h-auto object-contain transition-all duration-1000 hover:scale-105 peer-hover:scale-105 xl:hover:scale-100 xl:peer-hover:scale-100" priority/>
                    </Link>
                </div>
                <Link href="/[sections]/[categories]/[subCategories]/[articles]" as={`/${articleParams.breadcrumb[breadCrumbLength].slug}/${articleParams.breadcrumb[breadCrumbLength-1].slug}/${articleParams.breadcrumb[breadCrumbLength-2].slug}/${articleParams.slug}`} className="flex flex-col items-center xl:text-xs">
                    <h2>{article?.brands[0]?.title}</h2>
                    <h2>{article?.title}</h2>
                    <p className="transition-all opacity-0 group-hover:opacity-100 duration-300 text-xs mt-1 mb-7 xl:text-[11px] xl:opacity-100">{article?.price}€</p>
                </Link>
            </div>
        }
        </>
    )
}