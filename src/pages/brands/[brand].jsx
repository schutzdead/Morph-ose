import { CustomHead } from "@/components/customHead"
import { GETRequest } from "@/utils/requestHeader"
import Layout from "@/components/layout/layout"
import { Loading } from "@/components/loader"
import { ArticleCard } from "@/components/categories/base"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({params, locale}) {
    const result = await fetch(`https://api.bat-n3.darianne.fr/brands`, GETRequest).then(r => r.json())
    const currentBrand = await result.findIndex(b => b.slug === params.brand)
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: result[currentBrand],
        }
    }
}

export async function getStaticPaths({locales}) {
    const brands = await fetch('https://api.bat-n3.darianne.fr/brands', GETRequest).then(r => r.json())
    return {
        paths: brands.map(brand =>
                locales.map(locale => {
                    return{
                        params: { 
                            brand:brand.slug,
                        },
                        locale:locale
                    }
                })).flat(),
    fallback:false //false : return 404 if path doenst exist
    };
}

export default function BrandPage({data}) {
    const { t } = useTranslation()
    return(
        <>
            <CustomHead pageName={data.title} metaResume='Shop Category' />
            <Layout>
                <h1 className="text-center my-14 text-3xl font-bold">{data.title}</h1>
                <div className="flex w-full pb-16 md:pb-0 flex-1">
                    {!data
                        ? <Loading />
                        : data?.products?.length === 0 || !data?.products
                            ? <p className="px-10">{t('brands.noArticle')}</p>
                            : <div className="grid grid-cols-4 gap-x-2 px-10 xl:grid-cols-3 lg:grid-cols-2 md:px-[2%]">
                                {data?.products.map(article => 
                                    <ArticleCard articleParams={article} key={article.id}/>
                                )}
                        </div>
                    }
                </div>
            </Layout>
        </>
    )
}