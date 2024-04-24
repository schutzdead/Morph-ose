import orders_icon from '../../../../public/assets/dashboard/orders.svg'
import { Menu } from '@/components/menus/menu'
import { GETRequest, GETTokenRequest } from "@/utils/requestHeader"
import {  useState } from 'react'
import { Back } from '@/components/littleComponents'
import { NoIndexHead } from '@/utils/customHead'
import Image from "next/image"
import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'

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

  const result = await fetch(`${API_URL}/orders/tracking/${query.order_event}`, GETRequest).then(r => r.json())
  return {
      props: {
        order:result
      }
  }
}

export default function Orders({order}) {
    const [menu, setMenu] = useState(false)
    const [hamburger, setHamburger] = useState(false)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Commande évènement' image={orders_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex mt-10'>
          <Back title="Retour à la liste" linkTo='/admin/orders_event' />
        </div>
        <div className='gap-5 grid-cols-2 grid lg:flex lg:flex-col lg:gap-10 lg:items-center'>
        { order === null || order === undefined 
          ? 'Aucune donnée client'
          : 
          <>
            <section className='w-full bg-secondary/60 rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
              <h2 className="text-3xl font-extrabold text-white mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Client</h2>
              <div className='flex flex-col gap-2 text-sm'>
                  <div className='flex flex-col gap-1.5'>
                      <Informations title="Nom : " value={`${order?.lastname} ${order?.firstname}`} />
                      <Informations title="Email : " value={order?.email} />
                      <Informations title="Téléphone : " value={order?.phone} />
                </div>
              </div>
            </section>
            <section className='w-full bg-white rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
              <h2 className="text-3xl font-extrabold text-secondary mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Commande</h2>
              <div className='flex flex-col gap-1.5'>
                <Informations title="Création de la commande : " value={new Date(order.created_at).toLocaleDateString('fr')} textColor='#582D3E' />
                <Informations title="Prix total : " value={`${order?.total_price}€`} textColor='#582D3E' />
                <Informations title="Status : " value={order?.status} textColor='#582D3E' />
                <Informations title="Numéro de suivi : " value={order?.tracking_number} textColor='#582D3E' />
                <Informations title="Date évènement : " value={`${new Date(order.workshops[0]?.date).toLocaleDateString('fr')} ${new Date(order.workshops[0]?.date).toLocaleTimeString('fr')}`} textColor='#582D3E' />
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
              <section className='flex flex-col h-full justify-between w-full flex-1 text-secondary md:h-20'>
                      <div className="flex flex-col gap-1 w-full">
                          <h3 className="font-bold text-lg lg:text-base leading-none sm:text-sm">{data?.title}</h3>
                          <h3 className="whitespace-nowrap sm:text-sm ">Référence : {data?.product?.reference ? data?.product?.reference : 0}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                          <p className="font-medium text-lg sm:text-base">{data?.unit_price}€</p>
                      </div>
              </section>
          </div>
      </>
  )
}