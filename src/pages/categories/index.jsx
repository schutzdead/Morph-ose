import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/layout"
import { Loading } from "@/components/loader"
import Image from "next/image";
import Link from "next/link";
import Butterfly from '../../../public/assets/main/butterfly.svg'
import RightArrow from '../../../public/assets/articles/right.svg'
import { Newletter } from "@/components/homepage/homepage"

export async function getServerSideProps() {
    const result = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(r => r.json())
    return {
        props: {
            data: result[0].childs[1].childs[1].products,
            menu: result
        }
    }
}

export default function Section({data, menu}) {
    const [currentProducts, setCurrentProducts] = useState()
    useEffect(()=> {
        setCurrentProducts(data)
    },[data])

    return(
        <>
            <CustomHead pageName='Boutique' metaResume="Retrouvez l'ensemble des articles" />
            <Layout>
            <div className="flex flex-col gap-20 w-full pt-10 md:gap-14 flex-1">
                <CategoriesMenu cat={menu} />
                <div>
                    {menu?.length === 0 || !menu 
                        ? <p>Aucun article</p>
                        : <div className="flex flex-col gap-28 md:gap-10">
                            {menu?.map((m, index) => 
                                <section key={m.id} className="flex flex-col gap-10">
                                    <div style={index%2 === 0 ? {justifyContent:'start'} : {justifyContent:'end'}} className="w-full flex">
                                        <CatTitle title={m.title.toUpperCase()} butterfly={true} reverse={index%2 === 0} />
                                    </div>
                                    <div className="flex ml-5 mr-10 md:mr-5 md:ml-0">
                                        {currentProducts?.map(article => 
                                            <ArticleCard articleParams={article} key={article.id} link="/categories/subcategories"/>
                                        )}
                                        {currentProducts?.slice(0,2).map(article => 
                                            <ArticleCard articleParams={article} key={article.id} link="/categories/subcategories"/>
                                        )}
                                    </div>
                                    <div className="cursor-pointer flex gap-1 items-center text-primary place-self-end mx-10 md:mx-5 font-semibold lg:text-sm underline underline-offset-2 sm:text-xs">
                                        <p>Voir tous les produits</p>
                                        <Image src={RightArrow} alt='Right arrow' className="w-4" priority/>
                                    </div>
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
    return(
        <div className="flex gap-5 mx-10 overflow-x-auto pb-4 md:mx-5">
            {cat.map(c =>
                <button key={c.id} className="bg-menuGradient font-bold text-white px-4 py-2 rounded-lg cursor-pointer">{c.title}</button>
            )}
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
                <Link href={`${link}`} className="group flex-[0_0_20%] pl-5 flex-col cursor-pointer lg:flex-[0_0_25%] sm:flex-[0_0_33%] relative">
                    <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                    <div className="transition-all duration-1000 relative hover:scale-[1.02] md:hover:scale-100">
                        <div className="text-white bg-primary px-2 py-0.5 font-bold text-sm absolute rounded-md top-3 left-3 sm:text-xs sm:px-1 sm:top-1.5 sm:left-1.5">-50%</div>
                        <Image src={article?.images[0].url} alt='Article picture' width={0} height={0} className="object-cover w-full rounded-xl" priority/>
                    </div>
                    <div className="text-secondary font-semibold mt-2">
                        <h2 className="sm:text-sm">{article?.title}</h2>
                        <div className="flex items-center gap-2">
                            <p className="text-sm sm:text-xs">{article?.price}€</p>
                            <p className="text-sm text-[#6C7275] font-medium line-through sm:text-xs">400€</p>
                        </div>
                    </div>
                </Link>
        }
        </>
    )
}