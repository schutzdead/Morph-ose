import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import Layout from "@/components/layout/layout"
import { CategoriesMenu, CatTitle, ArticleCard } from ".."
import { Newletter } from "@/components/homepage/homepage"

import Image from "next/image";
import Service from '../../../../public/assets/main/services.webp'
import Butterfly from '../../../../public/assets/main/butterfly.svg'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({query}) {
    const getCategory =  await fetch(`${API_URL}/categories/${query.cat}`, GETRequest).then(r => r.json())
    const getCategories =  await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
    return {
        props: {
            data: getCategory,
            allCat:getCategories
        }
    }
}

export default function Category({data, allCat}) {
    return(
        <>
            <CustomHead pageName='Boutique' metaResume="Retrouvez l'ensemble de nos articles" />
            <Layout>
            <div className="flex flex-col gap-20 w-full md:gap-14 flex-1">
                <CategoriesMenu cat={allCat.filter(f => f.id !== data.id)} />
                <div className="h-[60vh] w-[90vw] max-w-[1400px] -mt-10 md:-mt-5 max-h-[500px] place-self-center flex rounded-3xl lg:max-h-[425px] md:max-h-[350px] sm:max-h-[250px] sm:h-[30vh]" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Service} alt='Picture categories' className="w-[50%] rounded-3xl object-cover md:hidden" priority/>
                    <div className="flex justify-center items-center w-full px-4">
                        <div className="font-Quesha w-fit mx-4 relative text-9xl lg:text-8xl md:text-7xl sm:text-5xl">
                            <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 -left-[53px] -top-[20px] xl:w-12 xl:-left-[41px] xl:-top-[23px] md:w-8 md:-left-[25px] md:-top-[16px]" priority />
                            <h1 className="gradient-text2">{data?.title}</h1>
                        </div>
                    </div>
                </div>
                <div>
                    {data?.childs?.map(c => c.products).flat().length === 0 || !data 
                        ? <p className="text-lg font-semibold text-secondary sm:text-base pl-10 md:pl-5">Aucun article pour le moment</p>
                        : <div className="flex flex-col gap-28 md:gap-10">
                            {data?.childs?.map((m, index) => 
                                <section key={m.id} className="flex flex-col gap-10">
                                    <div style={index%2 === 0 ? {justifyContent:'start'} : {justifyContent:'end'}} className="w-full flex">
                                        <CatTitle title={m.title} butterfly={true} reverse={index%2 === 0} />
                                    </div>
                                    <div className="flex ml-5 mr-10 gap-y-10 flex-wrap md:mr-5 md:ml-0">
                                        {m?.products.length === 0 
                                        ? <p className="text-lg font-semibold text-secondary sm:text-base pl-10 md:pl-5">Aucun article.</p>
                                        : m?.products.filter(np => np.is_published).map(article => 
                                            <ArticleCard articleParams={article} key={article.id} link={{pathname: `/categories/${m?.slug}/${article?.slug}`, query: { art:article?.id }}} />
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
