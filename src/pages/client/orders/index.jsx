import Image from 'next/image'
import orders_icon from '../../../../public/assets/dashboard/orders.svg'
import edit2 from '../../../../public/assets/dashboard/details.svg'
import ClientBurgerMenu from '@/components/menus/clientBurgerMenu'
import { ClientMenu } from '@/components/menus/clientMenu'
import Link from 'next/link'
import { GETTokenRequest } from "@/utils/requestHeader"
import {  useState } from 'react'
import { Loading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'

import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({req, res}) {
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
  
  if(response.status !== 200) {
    return { 
      redirect: {
        destination: '/client',
        permanent: false,
      },
  }}
  const user = await response.json()
  const result = await fetch(`${API_URL}/auth/orders`, GETTokenRequest(authToken)).then(r => r.json())
  return {
      props: {
          all_orders:result?.filter(r => r.workshops?.length === 0).filter(r => !r.room_rental_reservation)
      }
  }
}

export default function Orders({all_orders}) {
  const [orders, setProducts] = useState(all_orders)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <ClientMenu />
        <ClientBurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Commandes' image={orders_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col bg-white shadow-dashboard w-full rounded-xl py-10 px-5 xl:py-5 lg:px-2 lg:py-2 sm:shadow-none'>
            {orders?.length === 0 || !orders 
            ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucune commande</p>
            : <>
              {loading ? <Loading />
              : <>
                  <div className='grid text-secondary py-5 font-bold text-base items-center justify-items-center text-center rounded-xl overflow-hidden grid-cols-[repeat(4,2fr)_1fr] xl:text-sm sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-xs'>
                      <p>Numéro</p>
                      <p>{`Nb. d'articles`}</p>
                      <p className='sm:hidden'>Paiement</p>
                      <p>Création</p>
                  </div>
                  {
                    orders?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) =>
                      <div key={order.id} className='grid grid-cols-[repeat(4,2fr)_1fr] py-3 rounded-lg text-secondary/90 justify-items-center items-center sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-sm' style={orders?.indexOf(order)%2 === 0 ? {backgroundColor:'#F5F5F5'} : {backgroundColor:"white"}}>
                        <p className='px-4 text-center'>{order.tracking_number}</p>
                        <p className='font-semibold'>{`${order?.items?.length}`}</p>
                        <p className='px-4 text-center sm:hidden'>{order.status}</p>
                        <div className='flex flex-col items-center font-bold sm:text-xs'>
                          <p>{new Date(order.created_at).toLocaleDateString('fr')}</p>
                        </div>
                        <Link href={`/client/orders/${order.tracking_number}`}>
                          <button className='group flex gap-1 w-[40px] items-center text-white py-1 justify-center'>
                            <Image src={edit2} alt="details icon" className="group-hover:scale-[1.18] transition-all duration-300 w-6 h-auto mb-[1px]" priority />
                          </button>
                        </Link>
                      </div>
                    )
                  }
                </>
              }
              </>
            }
          </div>
        </section>
    </main>
    </>
  )
}
