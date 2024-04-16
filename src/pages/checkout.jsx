import { CheckoutSignIn } from "@/components/checkout/checkoutSignIn";
import { GuestForm } from "@/components/checkout/guestForm";
import { ShoppingCart } from "@/components/checkout/shoppingCart";
import Layout from "@/components/layout/layout";
import Image from "next/image";

import RightArrow from '../../public/assets/articles/rightSide.svg'

import { useEffect, useState } from "react";

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
    return {
      props: {
          data: data,
      }
    }
  }

export default function Checkout ({data}) {
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
    }
    ,[data])

    return(
        <Layout>
            <main>
                <FakeBreadCrumb />
                <div className="w-full flex justify-evenly text-secondary mb-10 lg:flex-col">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text">Information de livraison</h1>
                        {userData ? ''
                        :
                        <div className="max-w-[450px] w-full mb-20 xl:max-w-[400px] md:mb-14 sm:w-[320px]">
                            <h2 className="font-bold text-[15px] mb-3">Déjà client ?</h2>
                            <CheckoutSignIn setUserData={setUserData} />
                        </div>}
                        <div className="max-w-[500px] w-full py-14 mx-10 px-10 box-content border border-secondary rounded-xl xl:max-w-[400px] md:pt-6 md:pb-10 sm:max-w-[320px] sm:px-0 sm:mx-0 sm:border-none sm:py-5">
                            <h2 className="font-bold text-[15px] mb-3">{userData ? '' : "Continuer en tant qu'invté"}</h2>
                            <GuestForm userData={userData} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-fullwithHeaderCheckout sticky top-[176px] px-12 2xl:px-6 lg:mt-20 lg:relative lg:top-0 lg:flex-col-reverse lg:h-auto md:mt-10">
                        <ShoppingCart />
                    </div>
                    <button type='submit' form="guestForm" className='w-fit col-span-1 place-self-center px-10 hidden lg:flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3'>
                            <p className='font-medium text-center'>Continuer</p>
                    </button>
                </div>
            </main>
        </Layout>
    )
}

export function FakeBreadCrumb () {
    return (
        <div className="flex items-center sticky top-28 py-10 bg-background z-20 w-full justify-center text-center px-2 sm:py-5">
                <p className="text-xs text-secondary font-semibold">Vos informations</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p className="text-xs text-secondary">Paiement</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p className="text-xs text-secondary">Commande envoyée</p>
        </div>
    )
}