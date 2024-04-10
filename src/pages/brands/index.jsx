import Link from "next/link"

import { GETRequest } from "@/utils/requestHeader"
import { CustomHead } from "@/components/customHead"
import Layout from "@/components/layout/layout"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({locale}) {
     const result = await fetch(`https://api.bat-n3.darianne.fr/brands`, GETRequest).then(r => r.json())
        return {
            props: {
                brands: result,
                ...(await serverSideTranslations(locale, ['common'])),
            }
        }
  }

export default function Brands ({brands}) {
    return (
        <>
            <CustomHead pageName='Brands' metaResume='All brands' />
            <Layout>
                <main className="flex-1 mt-16 mb-8 z-30">
                    <div className="grid grid-cols-3 gap-x-20 gap-y-6 w-1/2 justify-items-center place-self-center">
                    {
                        brands.map(b => 
                        <div key={b.id} className="group">
                            <Link href="/brands/[brand]" as={`/brands/${b.slug}`}>
                                <h3  className="cursor-pointer underline-offset-4 group-hover:underline">{b.title}</h3>
                            </Link>
                        </div>  
                        )
                    }
                    </div>
                </main>
            </Layout>
        </>
    )
}
