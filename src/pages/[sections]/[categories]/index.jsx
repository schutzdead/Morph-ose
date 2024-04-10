import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/layout"
import { Loading } from "@/components/loader"
import { Tab, ArticleCard } from "@/components/categories/base"
import forFindChild from "@/utils/recursive"
import { Breadcrumbs } from "@mui/material"
import Link from "next/link"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


export async function getStaticProps({params, locale}) {
    const result = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(r => r.json())
    const sectionIndex = await result.findIndex(section => section.slug === params.sections)
    const categoriesIndex = await result[sectionIndex].childs.findIndex(category => category.slug === params.categories)
    return {
        props: {
            result:result[sectionIndex],
            data: result[sectionIndex].childs[categoriesIndex],
            title: result[sectionIndex],
            params: params,
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}

export async function getStaticPaths({locales}) {
    const categories = await fetch('https://api.bat-n3.darianne.fr/categories', GETRequest).then(r => r.json())
    return {
        paths: categories.map(category => 
                    category.childs.map(cat => 
                        locales.map(locale => {
                        return{
                            params: { 
                                categories:cat.slug,
                                sections:category.slug,
                            },
                            locale:locale
                        }
                    }))).flat(Infinity),
    fallback:false //false : return 404 if path doenst exist
    };
}

export default function Category({data, title, params, result}) {
    const { t } = useTranslation()
    const [currentProducts, setCurrentProducts] = useState()

    useEffect(()=> {
        setCurrentProducts(forFindChild(data))
    },[data])


    return(
        <>
            <CustomHead pageName='Shop' metaResume='Shop Category' />
            <Layout>
            <Breadcrumbs separator="›" aria-label="breadcrumb" className="z-10 py-3 pl-10 sm:text-xs">
                    <Link className='hover:underline underline-offset-2' href="/[sections]" as={`/${result?.slug}`}>{result?.title}</Link>
                    <p className="text-black">{data?.title}</p>
            </Breadcrumbs> 
            <div className="flex w-full pt-10 pb-16 md:pb-0 flex-1 sm:pt-5">
                <menu className="flex flex-col sticky top-28 self-start whitespace-nowrap pl-10 md:hidden">
                    {!title 
                        ? <Loading />
                        : <Tab category={title} />
                    }
                </menu>
                    {!data
                        ? <Loading />
                        : currentProducts?.length === 0 || !currentProducts
                            ? <p className="px-10">{t("article.noArticle")}</p>
                            : <div className="grid grid-cols-4 gap-x-2 px-10 xl:grid-cols-3 lg:grid-cols-2 md:px-[2%]">
                                {currentProducts.map(article => 
                                    <ArticleCard articleParams={article} params={params} key={article.id}/>
                                )}
                        </div>
                    }
            </div>
        </Layout>
        </>
    )
}
