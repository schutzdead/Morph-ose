import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import PersonalForm from "@/components/account/personnalForm";
import PasswordForm from "@/components/account/passwordForm";
import MailForm from "@/components/account/mailForm";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logout from  '../../../public/assets/logout.svg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getServerSideProps ({req, res, locale}) {
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)
    const authToken = cookies.get('auth-token') || ''
    const uniqlocale = `/${locale}/connect/`

    const response = await fetch('https://api.bat-n3.darianne.fr/auth/users/current', {
      method:'GET',
      mode: "cors",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      }
    })

    
    if(response.status !== 200) {
      return { 
        redirect: {
          destination: uniqlocale,
          permanent: false,
        },
    }}
  
    const data = await response.json()
    return {
      props: {
          data: data,
          ...(await serverSideTranslations(locale, ['common'])),
      }
    }
  }

export default function Account ({data}) {
    const { t } = useTranslation()
    const [currentPath, setCurrentPath] = useState('profile')
    const [userData, setUserData] = useState() 

    useEffect(() => {
        if(data.message) return
        for(const property in data) {
            if(data[property] === null) {
                data[property] = ''
            }
        }
        setUserData({...data.address, ...data})
        return () => {
            setUserData()
        }
    },[data])
    
    return(
      <>
        <CustomHead pageName='Account' metaResume='Client account' />
        <Layout>
          <section className="flex-1 flex z-10 relative lg:flex-col">
              <aside className="sticky top-52 self-start pl-20 min-w-[300px] lg:min-w-none lg:static lg:w-full lg:flex lg:justify-center lg:pl-0 lg:mt-10">
                <ul className="flex flex-col whitespace-nowrap gap-5 lg:flex-row">
                  <Link href='/account/' className="cursor-pointer underline-offset-4" onClick={() => {setCurrentPath('profile')}}>
                    <li style={currentPath === 'profile' ? {fontWeight:'bold', textDecoration:'underline'} : {fontWeight:'normal', textDecoration:'none'}}>{t('profile.menuProfile')}</li>
                  </Link>
                  <Link href='/account/orders/' className="cursor-pointer underline-offset-4" onClick={() => {setCurrentPath('orders')}}>
                    <li style={currentPath === 'orders' ? {fontWeight:'bold', textDecoration:'underline'} : {fontWeight:'normal', textDecoration:'none'}}>{t('profile.menuOrders')}</li>
                  </Link>
                  <div className="w-16 h-[1px] bg-black lg:hidden"></div>
                  <Link href='/logout' className="cursor-pointer">
                    <li className="flex gap-1 items-center">
                      <Image src={Logout} alt='Log out pictogram' width={10} height={10} className="w-4 h-auto" priority/>
                      <p>{t('profile.logout')}</p>
                    </li>
                  </Link>
                </ul>
              </aside>
              <main className="mt-14 w-full mr-16 ml-5 mb-10 lg:mr-0 lg:ml-0">
                <div className="flex flex-col gap-3">
                  <h1 className="text-base lg:place-self-center">{t('profile.title')}</h1>
                  <p className="text-center px-2 lg:place-self-center">{t('profile.description')}</p>
                </div>
                <div className="w-full h-[1px] bg-black my-5 lg:place-self-center lg:w-full"></div>
                <section className="grid grid-col-2 w-full gap-x-16 xl:grid-cols-1 justify-items-center xl:gap-y-10">
                  <div className="row-span-2 w-[450px] xl:w-[500px] xl:mt-10 lg:mt-5 sm:w-[400px] 2sm:w-[100vw] 2sm:px-3">
                    <PersonalForm userData={userData} />
                  </div>
                  <div className="col-start-2 w-[380px] xl:col-start-1 xl:w-[500px] sm:w-[400px] 2sm:w-[100vw] 2sm:px-3">
                    <PasswordForm userData={userData} />
                  </div>
                  <div className="col-start-2 w-[380px] mt-10 xl:col-start-1 xl:w-[500px] xl:mt-0 sm:w-[400px] 2sm:w-[100vw] 2sm:px-3">
                    <MailForm userData={userData} />
                  </div>
                </section>
              </main>
            </section>
        </Layout>
      </>
    )
}