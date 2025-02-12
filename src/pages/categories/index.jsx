import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/layout"
import { Loading } from "@/utils/loader"
import Image from "next/image";
import Link from "next/link";
import Butterfly from '../../../public/assets/main/butterfly.svg'
import RightArrow from '../../../public/assets/articles/right.svg'
import { Newletter } from "@/components/homepage/homepage"
import Services from '../../../public/assets/main/services.webp'

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
    return(
        <>
            <CustomHead pageName='Boutique' metaResume="Retrouvez l'ensemble des articles" />
            <Layout>
            <div className="flex flex-col gap-20 w-full md:gap-14 flex-1">
                <CategoriesMenu cat={data} />
                <div>
                    {data?.length === 0 || !data 
                        ? <p>Aucun article</p>
                        : <div className="flex flex-col gap-28 md:gap-10">
                            {data?.map((m, index) => 
                                <section key={index} className="flex flex-col gap-10 relative">
                                    <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
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
        </>
    )
}

export function CategoriesMenu ({cat}) {
    const [selectedSubCat, setSelectedSubCat] = useState([])
    const [selectedCat, setSelectedCat] = useState(null)
    
    return(
        <div className="px-10 sticky top-28 bg-background z-40 items-center py-8 md:px-5 sm:pb-4" onMouseLeave={() => {setSelectedSubCat([]);setSelectedCat(null)}}>
            <div className="overflow-x-auto overflow-y-hidden flex gap-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded scrollbar-thumb-primary/20 scrollbar-w-1 scrollbar pb-3">
                <Link href="/categories"><button className="bg-menuGradient text-center whitespace-nowrap font-bold text-white px-4 py-2 rounded-lg cursor-pointer">Toutes les catégories</button></Link>
                {cat.map((c, index) =>
                    <Link key={index} href={{pathname: `/categories/${c.slug}`, query: { cat:c.id }}}><button className="bg-menuGradient whitespace-nowrap font-bold text-white px-4 py-2 rounded-lg cursor-pointer" onMouseOver={() => {setSelectedSubCat(c.childs);setSelectedCat({id:c.id, slug:c.slug})}}>{c.title}</button></Link>
                )}
            </div>
            <div className="absolute top-[100px] bg-background w-full left-0 py-3">
                {selectedSubCat.length > 0
                    ? <div className="flex text-lg md:text-base font-semibold divide-y divide-primary/30 pt-3 w-full flex-col items-center">
                            {selectedSubCat.map((subC, index) =>
                                <Link key={index} className="px-3 py-4 w-full text-center hover:bg-primary/20" href={{pathname: `/categories/${selectedCat.slug}`, query: { cat:selectedCat?.id, subCat:subC.id }}}>{subC.title}</Link>
                            )}
                        </div>
                    : ""
                }
            </div>
        </div>

    )   
}

export function CatTitle ({butterfly=false, title, reverse}) {
    return(
      <div className="relative font-Quesha w-fit text-9xl xl:text-6xl md:text-4xl">
        <div className="relative pl-20 md:pl-10" style={reverse ? {} : {paddingLeft:0, paddingRight:'40px'}}>
          <div style={butterfly ? {display:'block'} : {display:'none'}}>
              <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-[27px] -top-[30px] xl:w-12 xl:left-[41px] xl:-top-[30px] md:w-8 md:left-[15px] md:-top-[16px]" priority style={reverse ? {} : {display:'none'}} />
          </div>
          <h1 className="gradient-text2">{title}</h1>
        </div>
        <div className="h-[3px] w-full bg-mainGradient"></div>
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
                        <div className="text-white bg-primary px-2 py-0.5 font-bold text-sm absolute rounded-md top-3 left-3 sm:text-xs sm:px-1 sm:top-1.5 sm:left-1.5">-50%</div>
                        <div className="w-full h-0 pb-[100%] relative">
                            {article?.images[0]
                                ? <Image src={article?.images[0]?.url} alt='Article picture' fill className="object-cover rounded-xl" priority/>
                                : <Image src={Services} alt='Article picture' fill className="object-cover rounded-xl" priority/>
                            }
                        </div>
                        
                    </div>
                    <div className="text-secondary font-semibold mt-2">
                        <h2 className="sm:text-sm">{article?.title}</h2>
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