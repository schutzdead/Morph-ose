import orders_icon from '../../../../public/assets/dashboard/orders.svg'
import { Menu } from '@/components/menus/menu'
import { GETTokenRequest } from "@/utils/requestHeader"
import {  useState } from 'react'
import { Back } from '@/components/littleComponents'
import { NoIndexHead } from '@/utils/customHead'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { Article } from '@/components/layout/cart'

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

  console.log(query);

  const result = await fetch(`${API_URL}/auth/admin/orders/${query.order}`, GETTokenRequest(authToken)).then(r => r.json())
  return {
      props: {
        order:result
      }
  }
}

export default function Orders({order}) {
  console.log(order);
    const { v4: uuidv4 } = require('uuid');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [menu, setMenu] = useState(false)
    const [hamburger, setHamburger] = useState(false)

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
          <div className='flex mt-10'>
          <Back title="Retour à la liste" linkTo='/admin/orders' />
        </div>
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
                      <Informations title="Nom : " value={`${order?.lastname} ${order?.firstsname}`} />
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
                      <Informations title="Création : " value={order?.email} textColor='#582D3E' />
                      <Informations title="Prix : " value={order?.shipping_price} textColor='#582D3E' />
                      <Informations title="Prix de la livraison : " value={order?.shipping_price} textColor='#582D3E' />
                      <Informations title="Status : " value={order?.status} textColor='#582D3E' />
                      <Informations title="Numéro de suivi : " value={order?.tracking_number} textColor='#582D3E' />
                </div>
                <div className='flex flex-col gap-1.5'>
                      <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Détails</h3>
                      {order?.items?.map(article => <Article key={uuidv4()} data={article}/>)}
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