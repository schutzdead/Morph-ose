import orders_icon from '../../../../public/assets/dashboard/orders.svg'
import { Menu } from '@/components/menus/menu'
import { GETRequest, GETTokenRequest } from "@/utils/requestHeader"
import {  useEffect, useState } from 'react'
import { Back } from '@/components/littleComponents'
import { NoIndexHead } from '@/utils/customHead'
import Image from "next/image"
import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { CircularLoading } from '@/utils/loader'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({req, res, query}) {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)
  const authToken = cookies.get('auth-token') || ''

  const response = await fetch(`${API_URL}/auth/users/current`, {
    method:'GET',
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
  })
  const person = await response.json()
  if(response.status !== 200 || !person.is_admin) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const result = await fetch(`${API_URL}/auth/admin/orders/${query.order}`, GETTokenRequest(authToken)).then(r => r.json())
  return {
      props: {
        order:result
      }
  }
}

export default function Orders({order}) {
  const { v4: uuidv4 } = require('uuid');
  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const [loading, setLoading] = useState(false)
  const [trackingAndPDF, setTrackingAndPDF] = useState(null)
  const [logErr, setlogErr] = useState(false)

  useEffect(() => {
    if(order?.shipping_label_url){
      setTrackingAndPDF({
        number: order?.shipping_tracking_number,
        url: order?.shipping_label_url
      })
    }
  }, [order?.shipping_label_url, order?.shipping_tracking_number])

  async function getLabel() {
    setLoading(true)
    setlogErr(false)
    if(!order) {
      return
    }
    try {
      const response = await fetch(`/api/proxy/auth/admin/orders/${order?.id}/label`, GETRequest)
      const label = await response.json()
      if(label){
        setTrackingAndPDF(label)
        setLoading(false)
        return
      }
      setLoading(false)
      setlogErr(true)
    } catch (err) {
      console.error('Request failed:' + err)
      setLoading(false)
      setlogErr(true)
    }
  }

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Commandes' image={orders_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex justify-between mt-10 md:mt-5'>
            <Back title="Retour à la liste" linkTo='/admin/orders' />
            {loading 
                ? <div className='flex items-center mb-5 px-4'>
                    <CircularLoading />
                  </div>
                : order?.status === "Payée"
                  ? trackingAndPDF 
                    ? <Link href={trackingAndPDF?.url} target='_blank' className='rounded flex items-center mb-5 cursor-pointer text-white px-3 py-2 text-sm bg-secondary sm:py-1.5 sm:px-2 font-semibold'>{`Télécharger l'étiquette`}</Link>
                    : <button onClick={getLabel} className='rounded flex items-center mb-5 cursor-pointer text-white px-3 py-2 text-sm bg-secondary sm:py-1.5 sm:px-2 font-semibold'>Générer une étiquette</button>
                  : ""
            }
          </div>
          {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-3">{`Erreur lors de la génération d'étiquette, veuillez retenter plus tard ou passer directement par le site du prestataire de livraison.`}</div> : ''}
          <div className='gap-5 grid-cols-2 grid lg:flex lg:flex-col lg:gap-10 lg:items-center'>
          { order === null || order === undefined 
            ? 'Aucune donnée client'
            : 
            <>
              <section className='w-full bg-secondary/60 rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
                <h2 className="text-3xl font-extrabold text-white mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Client</h2>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='flex flex-col gap-1.5 pb-5 border-b border-gray-300'>
                        <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Information personnelles</h3>
                        <Informations title="Nom : " value={`${order?.lastname} ${order?.firstname}`} />
                        <Informations title="Email : " value={order?.email} />
                        <Informations title="Téléphone : " value={order?.phone} />
                  </div>
                </div>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='flex flex-col gap-1.5 pb-5 border-b border-gray-300'>
                        <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Livraison</h3>
                        <Informations title="Adresse : " value={order?.shipping_address?.street} />
                        <Informations title="Ville : " value={order?.shipping_address?.city} />
                        <Informations title="Code postal : " value={order?.shipping_address?.post_code} />
                        <Informations title="Pays : " value={order?.shipping_address?.country} />
                  </div>
                </div>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='flex flex-col gap-1.5'>
                        <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Facturation</h3>
                        <Informations title="Adresse : " value={order?.billing_address?.street} />
                        <Informations title="Ville : " value={order?.billing_address?.city} />
                        <Informations title="Code postal : " value={order?.billing_address?.post_code} />
                        <Informations title="Pays : " value={order?.billing_address?.country} />
                  </div>
                </div>
              </section>
              <section className='w-full bg-white rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
                <h2 className="text-3xl font-extrabold text-secondary mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Commande</h2>
                <div className='flex flex-col gap-1.5 pb-5 border-b border-gray-300'>
                        <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Informations</h3>
                        <Informations title="Création : " value={new Date(order.created_at).toLocaleDateString('fr')} textColor='#582D3E' />
                        <Informations title="Prix total : " value={`${order?.total_items_price.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}€`} textColor='#582D3E' />
                        <Informations title="Prix de la livraison : " value={`${order?.shipping_price}€`} textColor='#582D3E' />
                        <Informations title="Status : " value={order?.status} textColor='#582D3E' />
                        <Informations title="Numéro de suivi : " value={order?.tracking_number} textColor='#582D3E' />
                        <Informations title="Suivi de livraison : " value={trackingAndPDF?.number ? trackingAndPDF?.number : "Non généré"} textColor='#582D3E' />
                  </div>
                  <div className='flex flex-col gap-1.5 w-full'>
                        <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Détails</h3>
                        <div className='flex flex-col gap-3 w-full'>{order?.items?.map(article => <OrderArticle key={uuidv4()} data={article}/>)}</div>
                  </div>
              </section>
            </>
            }
          </div>
        </section>
    </main>
    </>
  )
}

function Informations ({title, value, textColor="white"}) {
  return(
    <p className='text-lg sm:text-base font-medium' style={{color:`${textColor}`}}>
      {title}
      <span className='font-semibold'>{value}</span>
    </p>
  )
}

export function OrderArticle ({data}) {
  return(
      <>
          <div className='text-sm sm:text-xs flex gap-5 items-center justify-between w-full'>
              <section className="w-28 h-28 min-h-28 min-w-28 relative md:w-20 md:h-20 md:min-h-20 md:min-w-20">
                  <Image
                      src={data?.product?.images[0]?.url}
                      alt="Article picture"
                      fill
                      className="rounded-2xl object-cover"
                      />
              </section>
              <section className='flex flex-col h-full justify-between w-full flex-1 text-secondary'>
                      <div className="flex flex-col gap-1 w-full">
                          <h3 className="font-bold text-lg lg:text-base leading-none sm:text-sm">{data?.title}</h3>
                          <h3 className="whitespace-nowrap sm:text-sm ">Référence : {data?.product?.reference ? data?.product?.reference : 0}</h3>
                          <h3 className="whitespace-nowrap sm:text-sm ">Quantité : {data?.quantity ? data?.quantity : 0}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                          <p className="font-medium text-lg sm:text-base">{data?.unit_price}€</p>
                      </div>
              </section>
          </div>
      </>
  )
}