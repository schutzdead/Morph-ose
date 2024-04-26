import pro_icon from '../../../../public/assets/dashboard/pro.svg'
import ClientBurgerMenu from '@/components/menus/clientBurgerMenu'
import { ClientMenu } from '@/components/menus/clientMenu'
import { GETRequest } from "@/utils/requestHeader"
import { useState } from 'react'
import { Back } from '@/components/littleComponents'
import { NoIndexHead } from '@/utils/customHead'

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
  
  if(response.status !== 200) {
    return { 
      redirect: {
        destination: '/client',
        permanent: false,
      },
  }}

  const result = await fetch(`${API_URL}/orders/tracking/${query.pro}`, GETRequest).then(r => r.json())
  return {
      props: {
        order:result
      }
  }
}

export default function ProOrders({order}) {
  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)
  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <ClientMenu />
        <ClientBurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Commandes Pro' image={pro_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex mt-10'>
          <Back title="Retour à la liste" linkTo='/client/pro' />
        </div>
        <div className='gap-5 grid-cols-2 grid lg:flex lg:flex-col lg:gap-10 lg:items-center'>
        { order === null || order === undefined 
          ? 'Aucune donnée client'
          : 
          <>
            <section className='w-full bg-secondary/60 rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
              <h2 className="text-3xl font-extrabold text-white mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Informations Location</h2>
              <div className='flex flex-col gap-2 text-sm'>
                  <div className='flex flex-col gap-1 pb-5 border-b border-gray-300'>
                    <Informations value={order.room_rental_reservation?.custom_title} />
                      <Informations title="Nombre de participants : " value={order.room_rental_reservation?.number_of_person} />
                      <Informations title="Prix par participant : " value={`${order.room_rental_reservation?.price_per_person}€`} />
                      <Informations title="Date : " value={new Date(order.room_rental_reservation?.room_rental?.date).toLocaleDateString('fr')} />
                      <Informations title="Heure du lancement : " value={`${order.room_rental_reservation?.start_time?.slice(0,2)}h${order.room_rental_reservation?.start_time?.slice(3,5)}`} />
                      <Informations title="Durée : " value={`${order.room_rental_reservation?.duration} min.`} />
                      <Informations title="Commentaire : " value={order.room_rental_reservation?.description} />
                </div>
              </div>
              <div className='flex flex-col gap-2 text-sm'>
                  <div className='flex flex-col gap-1'>
                      <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Evènement lié</h3>
                      {
                        order?.room_rental_reservation?.workshop
                        ?<>
                          <Informations title="Titre : " value={order?.room_rental_reservation?.workshop?.title}  />
                          <Informations title="Prix : " value={`${order?.room_rental_reservation?.workshop?.price}€`}  />
                          <Informations title="Nom de participants : " value={order?.room_rental_reservation?.workshop?.entries_available}  />
                          <Informations title="Date : " value={`${new Date(order?.room_rental_reservation?.workshop?.date).toLocaleDateString('fr')}`}  />
                          <Informations title="Heure : " value={`${new Date(order?.room_rental_reservation?.workshop?.date).toLocaleTimeString('fr')}`}  />
                          <Informations title="Durée : " value={`${order?.room_rental_reservation?.workshop?.duration} minutes`}  />
                          <Informations title="Description : " value={order?.room_rental_reservation?.workshop?.description}  />
                        </>
                          : <p className='text-white text-lg sm:text-base font-medium'>{`L'évènement n'a pas encore été crée.`}</p>
                      }
                      
                </div>
              </div>
              
            </section>
            <section className='w-full bg-white rounded-xl shadow-xl place-self-start py-10 px-14 flex flex-col xl:px-6 xl:py-5 xl:max-w-[650px] lg:place-self-auto'>
              <h2 className="text-3xl font-extrabold text-secondary mb-5 self-center xl:text-xl sm:text-lg sm:text-center">Commande</h2>
              <div className='flex flex-col gap-2 text-sm'>
                  <div className='flex flex-col gap-1 pb-5'>
                      <h3 className='text-2xl font-semibold my-3 text-secondary xl:text-lg sm:text-base sm:text-center'>Détails de la commande</h3>
                      <Informations title="Suivi : " value={order?.tracking_number}  textColor='#582D3E' />
                      <Informations title="Durée : " value={order?.room_rental_reservation?.room_rental?.title} textColor='#582D3E' />
                      <Informations title="Prix : " value={`${order?.room_rental_reservation?.room_rental?.price}€`}  textColor='#582D3E' />
                </div>
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