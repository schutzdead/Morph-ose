import { CheckoutSignIn } from "@/components/checkout/checkoutSignIn";
import { GuestForm } from "@/components/checkout/guestForm";
import { ShoppingCart } from "@/components/checkout/shoppingCart";
import Layout from "@/components/layout/layout";
import Image from "next/image";

import RightArrow from '../../public/assets/articles/rightSide.svg'

import { useEffect, useState } from "react";
import { GETRequest } from "@/utils/requestHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps ({req, res}) {
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
    const data = await response.json()
    const ship_fr = await fetch(`${API_URL}/settings/value/shipping_france`, GETRequest).then(r => r.json())
    const ship = await fetch(`${API_URL}/settings/value/shipping`, GETRequest).then(r => r.json())
    const free = await fetch(`${API_URL}/settings/value/free_shipping`, GETRequest).then(r => r.json())
    return {
      props: {
          data: data,
          ship_fr:ship_fr,
          ship:ship,
          free:free
      }
    }
  }

export default function Checkout ({data, ship, ship_fr, free}) {
    const [userData, setUserData] = useState()
    const [shipping, setShipping] = useState(ship_fr?.value ? Number(ship_fr?.value) : 'Renseignez un pays') 
    const [zone, setZone] = useState()

    useEffect(() => {
        if(!zone) return setShipping('Renseignez un pays')
        zone === 'FRANCE' ? setShipping(Number(ship_fr?.value)) : setShipping(Number(ship?.value))
    }, [ship?.value, ship_fr?.value, zone])

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
    }
    ,[data])

    return(
        <Layout>
            <main>
                <FakeBreadCrumb />
                <div className="w-full flex justify-evenly text-secondary mb-10 lg:flex-col">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text">Informations de livraison</h1>
                        {userData ? ''
                        :
                        <div className="max-w-[450px] w-full mb-20 xl:max-w-[400px] md:mb-14 sm:w-[320px]">
                            <h2 className="font-bold text-[15px] mb-3">Déjà client ?</h2>
                            <CheckoutSignIn setUserData={setUserData} />
                        </div>}
                        <div className="max-w-[500px] w-full py-14 mx-10 px-10 box-content border border-secondary rounded-xl xl:max-w-[400px] md:pt-6 md:pb-10 sm:max-w-[320px] sm:px-0 sm:mx-0 sm:border-none sm:py-5">
                            <h2 className="font-bold text-[15px] mb-3">{userData ? '' : "S'inscrire et payer"}</h2>
                            <GuestForm userData={userData} shipping_zone={setZone} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-fullwithHeaderCheckout sticky top-[200px] px-12 2xl:px-6 lg:mt-20 lg:relative lg:top-0 lg:flex-col-reverse lg:h-auto md:mt-10">
                        <ShoppingCart shipping={shipping} free={free} />
                    </div>
                    <button type='submit' form="guestForm" className='w-fit col-span-1 place-self-center px-10 hidden lg:flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3'>
                            <p className='font-medium text-center'>Continuer</p>
                    </button>
                    <p className="hidden lg:flex text-xs mt-5 place-self-center">* En continuant vous acceptez nos conditions générales de ventes</p>
                </div>
            </main>
        </Layout>
    )
}

export function FakeBreadCrumb () {
    return (
        <div className="flex items-center sm:text-sm text-secondary sticky top-28 py-10 bg-background z-20 w-full justify-center text-center px-2 sm:py-5">
                <p className="font-semibold">Vos informations</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p>Paiement</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p>Commande envoyée</p>
        </div>
    )
}