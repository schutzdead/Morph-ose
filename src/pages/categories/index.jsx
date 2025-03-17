import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useRef, useState } from "react"
import Layout from "@/components/layout/layout"
import { Loading } from "@/utils/loader"
import Image from "next/image";
import Link from "next/link";
import Butterfly from '../../../public/assets/main/butterfly.svg'
import RightArrow from '../../../public/assets/articles/right.svg'
import { Newletter } from "@/components/homepage/homepage"
import Close  from '../../../public/assets/essentials-icons/close.svg'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps() {
    const getCategories =  await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
    return {
        props: {
            data: getCategories.filter(c => c?.title !== "Services"),
        }
    }
}

export default function Section({data}) {
    
    const filterBox = useRef(null)
    const [selectedSubCat, setSelectedSubCat] = useState([])
    const [selectedCat, setSelectedCat] = useState(null)

    return(
        <>
            <CustomHead pageName='Boutique' metaResume="Retrouvez l'ensemble des articles" />
            <div onClick={(e) => { if (filterBox.current && !filterBox.current.contains(e.target)) {setSelectedSubCat([]);setSelectedCat(null)} }}>
            <Layout >
            <div className="flex flex-col gap-20 w-full md:gap-14 flex-1" >
                <div className="px-10 sticky top-28 bg-background z-40 items-center pt-8 md:px-5 text-secondary" ref={filterBox}>
                    <CategoriesMenu cat={data} selectedCat={selectedCat} setSelectedCat={setSelectedCat} setSelectedSubCat={setSelectedSubCat} selectedSubCat={selectedSubCat} />
                </div>
                <div>
                    {data?.length === 0 || !data 
                        ? <p>Aucun article</p>
                        : <div className="flex flex-col gap-28 md:gap-10">
                            {data?.map((m, index) => 
                                <section key={index} className="flex flex-col gap-10 relative">
                                    <div style={index%2 === 0 ? {justifyContent:'start'} : {justifyContent:'end'}} className="w-full flex">
                                        <CatTitle title={m.title.toUpperCase()} butterfly={true} reverse={index%2 === 0} />
                                    </div>
                                    <div className="flex ml-5 mr-10 overflow-x-hidden md:mr-5 md:ml-0">
                                        {m?.childs.map(c => c.products).flat().length === 0 
                                        ? <p className="text-lg font-semibold text-secondary sm:text-base pl-10 md:pl-5">Aucun article.</p>
                                        : m?.childs.map(c => c.products).flat().filter(np => np.is_published).slice(0,6).map((article, index) => 
                                            <ArticleCard articleParams={article} key={index} link={{pathname: `/categories/${m?.slug}/${article?.slug}`, query: { art:article?.id }}} />
                                        )}
                                    </div>
                                    <Link href={{pathname: `/categories/${m?.slug}`, query: { cat:m?.id }}} className="cursor-pointer flex gap-1 items-center text-primary place-self-end mx-10 md:mx-5 font-semibold lg:text-sm underline underline-offset-2 sm:text-xs">
                                        <p>Voir tous les produits</p>
                                        <Image src={RightArrow} alt='Right arrow' className="w-4" priority/>
                                    </Link>
                                </section>
                            )}
                        </div>
                    }
                </div>
            </div>
            <Newletter />
        </Layout>
        </div>
        </>
    )
}

export function CategoriesMenu ({cat, selectedCat, setSelectedCat, setSelectedSubCat, selectedSubCat}) {
    return(
        <>
            <div className="overflow-x-auto overflow-y-hidden flex gap-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded scrollbar-thumb-primary/20 scrollbar-w-1 scrollbar pb-3">
                <Link href="/categories"><button className="bg-menuGradient text-center whitespace-nowrap font-bold text-white px-4 py-2 rounded-lg cursor-pointer">Toutes les catégories</button></Link>
                {cat.map((c, index) =>
                    <div key={index}><button className="bg-menuGradient whitespace-nowrap font-bold text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={() => {setSelectedSubCat(c.childs);setSelectedCat({id:c.id, slug:c.slug})}}>{c.title}</button></div>
                )}
            </div>
            {selectedSubCat?.length > 0
                ? <div className="absolute top-[84px] bg-background w-full left-0 pb-3">

                
                    <div className="flex text-lg md:text-base font-semibold divide-y divide-primary/30 pt-3 w-full flex-col items-center">
                            <div className="w-screen flex justify-end px-3">
                                <Image src={Close} alt="Close pictogram" onClick={() => {setSelectedSubCat([]);setSelectedCat(null);}} className='h-6 w-auto cursor-pointer' />
                            </div>
                            {selectedSubCat?.map((subC, index) =>
                                <Link key={index} className="px-3 py-4 w-full text-center hover:bg-primary/20" href={{pathname: `/categories/${selectedCat.slug}`, query: { cat:selectedCat?.id, subCat:subC.id }}} onClick={() => {setSelectedSubCat([]);setSelectedCat(null);}}>{subC.title}</Link>
                            )}
                        </div>

            </div>
                : ""
            }
        </>

    )   
}

export function CatTitle ({butterfly=false, title, reverse}) {
    return(
      <div className="relative w-fit font-bold text-5xl xl:text-4xl md:text-2xl">
        <div className="relative pl-20 md:pl-5" style={reverse ? {} : {paddingLeft:0, paddingRight:'20px'}}>
          <div style={butterfly ? {display:'block'} : {display:'none'}}>
              <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-10 left-[45px] -top-[30px] xl:w-8 xl:left-[55px] xl:-top-[25px] md:hidden" priority style={reverse ? {} : {display:'none'}} />
          </div>
          <h1 className="gradient-categories">{title}</h1>
        </div>
        <div className="h-[3px] w-full bg-categories"></div>
      </div>
    )
  }

export function ArticleCard ({articleParams, link}) {
    const [article, setArticle] = useState(null)

    useEffect(() => {
        setArticle(articleParams)
        return () => {
            setArticle(null)
        }
    },[articleParams])

    return (
        <> 
        {!article 
            ? <Loading />
            : 
                <Link href={link} className="group flex-[0_0_20%] pl-5 flex-col cursor-pointer lg:flex-[0_0_25%] sm:flex-[0_0_33%] relative">
                    <div className="transition-all duration-1000 relative hover:scale-[1.02] md:hover:scale-100">
                        {/* <div className="text-white bg-primary px-2 py-0.5 font-bold text-sm absolute rounded-md top-3 left-3 sm:text-xs sm:px-1 sm:top-1.5 sm:left-1.5">-50%</div> */}
                        <div className="w-full aspect-square">
                            {article?.images[0]
                                ? <Image src={article?.images[0]?.url} alt='Article picture' fill className="object-cover rounded-xl" priority/>
                                : <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg px-6 py-10">
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                </div>
                              </div>
                            }
                        </div>
                        
                    </div>
                    <div className="text-secondary font-semibold mt-2">
                        <h2 className="sm:text-sm line-clamp-2 overflow-ellipsis">{article?.title}</h2>
                        <div className="flex items-center gap-2">
                            <p className="text-sm sm:text-xs">{article?.promo_price ? article?.promo_price : article?.price}€ TTC</p>
                            { article?.promo_price 
                                ? <p className="text-sm text-[#6C7275] font-medium line-through sm:text-xs">{article?.price}€ TTC</p>
                                : ''
                            }
                        </div>
                    </div>
                </Link>
        }
        </>
    )
}