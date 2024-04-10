import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/layout"
import { Loading } from "@/components/loader"
import { Tab, ArticleCard } from "@/components/categories/base"
import forFindChild from "@/utils/recursive"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({params, locale}) {
    const result = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(r => r.json())
    const sectionIndex = await result.findIndex(section => section.slug === params.sections)
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: result[sectionIndex],
            params: params,
        }
    }
}

export async function getStaticPaths({locales}) {
    const categories = await fetch('https://api.bat-n3.darianne.fr/categories', GETRequest).then(r => r.json())
    return {
        paths: categories.map(category => 
                    locales.map(locale => {
            return{
                params: { 
                    sections:category.slug
                },
                locale:locale
            }
        })).flat(),
    fallback:false //false : return 404 if path doenst exist
    };
}

export default function Section({data, params}) {
    const { t } = useTranslation()
    const [currentProducts, setCurrentProducts] = useState()
    useEffect(()=> {
        setCurrentProducts(forFindChild(data))
    },[data])

    return(
        <>
            <CustomHead pageName='Shop' metaResume='Shop Category' />
            <Layout>
            <div className="flex w-full pt-10 pb-16 md:pb-0 flex-1">
                <menu className="flex flex-col sticky top-28 self-start whitespace-nowrap pl-10 md:hidden">
                    {!data 
                        ? <Loading />
                        : <Tab category={data} />
                    }
                </menu>
                    {!data
                        ? <Loading />
                        : currentProducts?.length === 0 || !currentProducts
                            ? <p className="px-10">{t("article.noArticle")}</p>
                            : <div className="grid grid-cols-4 gap-x-2 px-10 xl:grid-cols-3 lg:grid-cols-2 md:px-[2%]">
                                {currentProducts?.map(article => 
                                    <ArticleCard articleParams={article} params={params} key={article.id}/>
                                )}
                        </div>
                    }
            </div>
        </Layout>
        </>
    )
}


