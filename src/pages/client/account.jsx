import profil_icon from '../../../public/assets/dashboard/profil.svg'
import ClientBurgerMenu from '@/components/menus/clientBurgerMenu'
import { ClientMenu } from '@/components/menus/clientMenu'
import {  useEffect, useState } from 'react'
import { NoIndexHead } from '@/utils/customHead'

import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import PersonalForm from '@/components/profil/personnalForm'
import PasswordForm from '@/components/profil/passwordForm'
import MailForm from '@/components/profil/mailForm'

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

  return {
      props: {
        user:user
      }
  }
}

export default function Profil({user}) {

    const [userData, setUserData] = useState() 

    useEffect(() => {
        if(user.message || !user) return
        for(const property in user) {
            if(user[property] === null) {
                user[property] = ''
            }
        }
        setUserData({...user.address, ...user})
        return () => {
            setUserData()
        }
    },[user])

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <ClientMenu />
        <ClientBurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
            <DashboardTitle text='Profil' image={profil_icon}/>
            <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
                <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
            </div>
            <section className="grid grid-col-2 pt-14 w-full gap-x-16 xl:grid-cols-1 justify-items-center xl:gap-y-20 xl:pt-5 md:pt-0">
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
        </section>
    </main>
    </>
  )
}
