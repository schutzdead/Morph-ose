import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import { Loading } from "@/components/loader";
import { lock, unlock } from "@/utils/lockScreen";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Logout from  '../../../public/assets/logout.svg'
import Details from  '../../../public/assets/account/eye.svg'
import Close from "../../../public/assets/close.svg"

export async function getServerSideProps ({req, res, locale}) {
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)
    const authToken = cookies.get('auth-token') || ''
    const uniqlocale = `/${locale}/connect/`
  
    const response = await fetch('https://api.bat-n3.darianne.fr/auth/orders', {
      method:'GET',
      mode: "cors",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      }
    })
    if(response.status !== 200) return { 
        redirect: {
          destination: uniqlocale,
          permanent: false,
        },
    }
  
    const data = await response.json()
    return {
      props: {
          data: data,
          ...(await serverSideTranslations(locale, ['common'])),
      }
    }
  }

  export default function Orders ({data}) {
    const { t } = useTranslation()
    const [currentPath, setCurrentPath] = useState('orders')
    const [openDetails, setOpenDetails] = useState(false)

    const [itemsData, setItemsData] = useState()

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
                  <h1 className="text-base lg:place-self-center">{t('orders.title')}</h1>
                  <p className="text-center px-2 lg:place-self-center">{t('orders.description')}</p>
                </div>
                <div className="w-full h-[1px] bg-black mt-5 mb-14 lg:place-self-center lg:w-full"></div>
                <div>
                  {!data ? <Loading />
                         : (data.length !== 0) ? 
                  <>
                    <section className="grid grid-cols-4 gap-x-6 text-secondaryDark justify-items-center md:px-2 text-center">
                        <h2>{t('orders.order')} #</h2>
                        <h2>Date</h2>
                        <h2>Status</h2>
                    </section>
                    <section className="grid grid-cols-4 gap-x-6 text-center items-center gap-y-5 my-10 justify-items-center md:mt-5 md:px-1 sm:text-xs">
                        {
                          data.reverse().map(e => 
                            <Order data={e} key={e.tracking_number} openDetails={openDetails} setOpenDetails={setOpenDetails} setItemsData={setItemsData}/>
                          )
                        }
                    </section>
                  </>
                  : <p>{t('orders.noCommand')}</p>
                  }
                </div>
              </main>
            </section>
            <OrderDetails data={itemsData} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        </Layout>

      </>
    )
}

function Order ({data, setOpenDetails, setItemsData}) {
  return(
    <>
      <div>{data.tracking_number.slice(4,data.tracking_number.length)}</div>
      <div>{new Date(data.created_at).toLocaleDateString("fr")}</div>
      <div>{data.status}</div>
      <div className="flex gap-5 md:gap-2">
        <Image src={Details} alt='Eye pictogram' width={10} height={10} className="w-7 h-auto cursor-pointer md:w-6" onClick={() => {setOpenDetails(true); lock(); window?.scrollTo({top: 0, left: 0}); setItemsData(data)}} priority/>
      </div>        
    </>
  )
}

function OrderDetails ({data, openDetails, setOpenDetails}) {
  return(
    <div className="w-[100vw] h-[100vh] bg-black/60 items-center justify-center overflow-hidden z-50 absolute top-0 left-0"
             style={openDetails ? {display:"flex"} : {display:"none"}}>
      <div className="flex flex-col bg-white w-[600px] max-h-[90%] pt-2 pb-5 px-5 relative sm:w-[90%]">
            <Image src={Close} alt="Close pictogram" 
                onClick={() => {setOpenDetails(false); unlock()}} 
                className='self-end -mr-2 h-7 w-auto cursor-pointer' />
            <div className="flex flex-col gap-2 mt-5 mb-10 p-3 border border-black">
              <p className="font-bold">Order informations</p>
              <div>
                <p>E-mail : {data?.email}</p>
                <p>Shipping address : {data?.shipping_address.street.toLowerCase()}</p>
              </div>
              <div>
                <p>Command price : {data?.items.reduce((accumulator, currentValue) => accumulator + (currentValue.unit_price * currentValue.quantity), 0)}€</p>
                <p>Shipping price : {data?.shipping_price}€</p>
              </div>
            </div>
            {!data 
              ? <Loading />
              : 
                <div className="flex flex-col overflow-y-auto overflow-x-hidden mb-5 items-center gap-1 max-">
                  {data.items.map(d => <OrderArticle key={d.id} data={d} />)}
                </div>
            }
      </div>
    </div>
  )
}

function OrderArticle (data) {
  return(
      <div className="flex flex-col gap-5 w-full mt-5 md:gap-7">
          <div className='flex gap-5 w-full px-5 sm:px-3'>
              <Image 
                  src={data.data.product.images[0].url} 
                  alt="Article picture" 
                  width={120}
                  height={160}
                  className="w-[80px] h-auto"
                  />
              <section className='flex flex-col h-full w-full'>
                      <div className="flex flex-col">
                          <h3 className="whitespace-nowrap mb-2">{data.data.title}</h3>
                          {data.data.size 
                                ? <p>Size : {data.data.size}</p>
                                : ''}
                          <p className="whitespace-nowrap text-xs text-secondaryDark">Price : {data.data.unit_price}€</p>
                          <p className="whitespace-nowrap text-xs text-secondaryDark">Quantity : {data.data.quantity}</p>
                      </div>
              </section>
              <p className="w-full text-end whitespace-nowrap">{Math.round((data.data.unit_price * data.data.quantity) * 100) / 100} €</p>
          </div>
          <div className="bg-secondaryLight h-[1px] w-full"></div>
      </div>
  )
}