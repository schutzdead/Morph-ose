import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/layout"
import { Breadcrumbs } from "@mui/material"
import Link from "next/link"
import { CategoriesMenu, CatTitle, ArticleCard } from ".."
import { Newletter } from "@/components/homepage/homepage"

import Image from "next/image";
import RightArrow from '../../../../public/assets/articles/right.svg'
import Service from '../../../../public/assets/main/services.webp'
import Butterfly from '../../../../public/assets/main/butterfly.svg'

export async function getServerSideProps() {
    const result = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(r => r.json())
    return {
        props: {
            data: result[0].childs[1].childs[1].products,
            menu: result
        }
    }
}

export default function Category({data, menu}) {
    const [currentProducts, setCurrentProducts] = useState()

    useEffect(()=> {
        setCurrentProducts(data)
    },[data])


    return(
        <>
            <CustomHead pageName='Boutique' metaResume="Retrouvez l'ensemble de nos articles" />
            <Layout>
            <div className="flex flex-col gap-20 w-full pt-10 md:gap-14 flex-1">
                <div className="h-[60vh] w-[90vw] max-w-[1400px] max-h-[500px] place-self-center flex rounded-3xl lg:max-h-[425px] md:max-h-[350px] sm:max-h-[250px] sm:h-[30vh]" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Service} alt='Picture categories' className="w-[50%] rounded-3xl object-cover" priority/>
                    <div className="flex justify-center items-center w-full">
                        <div className="font-Quesha w-fit relative text-9xl lg:text-8xl md:text-7xl sm:text-5xl">
                            <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 -left-[53px] -top-[20px] xl:w-12 xl:-left-[41px] xl:-top-[23px] md:w-8 md:-left-[25px] md:-top-[16px]" priority />
                            <h1 className="gradient-text2">Encens</h1>
                        </div>
                    </div>
                </div>
                <CategoriesMenu cat={menu} />
                <div>
                    {menu?.length === 0 || !menu 
                        ? <p>Aucun article</p>
                        : <div className="flex flex-col gap-28 md:gap-10">
                            {menu?.map((m, index) => 
                                <section key={m.id} className="flex flex-col gap-10">
                                    <div style={index%2 === 0 ? {justifyContent:'start'} : {justifyContent:'end'}} className="w-full flex">
                                        <CatTitle title={m.title} butterfly={true} reverse={index%2 === 0} />
                                    </div>
                                    <div className="flex ml-5 mr-10 gap-y-10 flex-wrap md:mr-5 md:ml-0">
                                        {currentProducts?.map(article => 
                                            <ArticleCard articleParams={article} key={article.id} link="/categories/subcategories/article" />
                                        )}
                                        {currentProducts?.map(article => 
                                            <ArticleCard articleParams={article} key={article.id} link="/categories/subcategories/article"/>
                                        )}
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
