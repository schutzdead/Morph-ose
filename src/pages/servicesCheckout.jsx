import { CheckoutSignIn } from "@/components/checkout/checkoutSignIn";
import { GuestForm } from "@/components/checkout/guestForm";
import Layout from "@/components/layout/layout";
import Image from "next/image";

import RightArrow from '../../public/assets/articles/rightSide.svg'

import { useEffect, useState } from "react";
import { ServiceCart } from "@/components/checkout/serviceCart";
import { GETRequest } from "@/utils/requestHeader";
import { ServiceGuestForm } from "@/components/checkout/serviceGuestForm";
import { FakeBreadCrumb } from "./checkout";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps ({req, res, query}) {
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
    const result = await fetch(`${API_URL}/workshops/${query.id}`, GETRequest).then(r => r.json())
    return {
      props: {
          data: data,
          workshop:result
      }
    }
  }

export default function Checkout ({data,workshop}) {
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
                        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text sm:py-5">Information de livraison</h1>
                        {userData ? ''
                        :
                        <div className="max-w-[450px] w-full mb-20 xl:max-w-[400px] md:mb-14 sm:w-[320px]">
                            <h2 className="font-bold text-[15px] mb-3">Déjà client ?</h2>
                            <CheckoutSignIn setUserData={setUserData} />
                        </div>}
                        <div className="max-w-[500px] w-full py-14 mx-10 px-10 box-content border border-secondary rounded-xl xl:max-w-[400px] md:pt-6 md:pb-10 sm:max-w-[320px] sm:px-0 sm:mx-0 sm:border-none sm:py-5">
                            <h2 className="font-bold text-[15px] mb-3">{userData ? '' : "Continuer en tant qu'invté"}</h2>
                            <ServiceGuestForm userData={userData} workshop={workshop} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-fullwithHeaderCheckout sticky top-[200px] px-12 2xl:px-6 lg:mt-10 lg:relative lg:top-0 lg:flex-col-reverse lg:h-auto md:mt-5 sm:px-0">
                        <ServiceCart workshop={workshop} />
                    </div>
                    <button type='submit' form="guestForm" className='w-fit col-span-1 place-self-center px-10 hidden lg:flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 mt-10'>
                            <p className='font-medium text-center'>Continuer</p>
                    </button>
                </div>
            </main>
        </Layout>
    )
}