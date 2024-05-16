import { CheckoutSignIn } from "@/components/checkout/checkoutSignIn";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { GETRequest } from "@/utils/requestHeader";
import { FakeBreadCrumb } from "./checkout";
import { RentServiceCart } from "@/components/checkout/rentCart";
import { RentGuestForm } from "@/components/checkout/rentGuestForm";

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
    const result = await fetch(`${API_URL}/room-rentals/reservations/${query.id}`, GETRequest).then(r => r.json())
    return {
      props: {
          data: data,
          rent:result
      }
    }
  }

export default function RentCheckout ({data,rent}) {
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
                        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text sm:py-5">Informations personnelles</h1>
                        {userData ? ''
                        :
                        <div className="max-w-[450px] w-full mb-20 xl:max-w-[400px] md:mb-14 sm:w-[320px]">
                            <h2 className="font-bold text-[15px] mb-3">Déjà client ?</h2>
                            <CheckoutSignIn setUserData={setUserData} />
                        </div>}
                        <div className="max-w-[500px] w-full py-10 mx-10 px-10 box-content border border-secondary rounded-xl xl:max-w-[400px] md:pt-6 md:pb-10 sm:max-w-[320px] sm:px-0 sm:mx-0 sm:border-none sm:py-5">
                            <h2 className="font-bold text-lg sm:text-base text-[#ECA683] mb-5">Toutes ces infos faciliteront nos prochaines collaborations...</h2>
                            <h2 className="font-bold text-[15px] mb-3">{userData ? '' : "S'inscrire et payer"}</h2>
                            <RentGuestForm userData={userData} rent={rent} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-fullwithHeaderCheckout sticky top-[220px] px-12 2xl:px-6 lg:mt-10 lg:relative lg:top-0 lg:flex-col-reverse lg:h-auto md:mt-5 sm:px-0">
                        <RentServiceCart rent={rent} />
                    </div>
                    <button type='submit' form="guestForm" className='w-fit col-span-1 place-self-center px-10 hidden lg:flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 mt-10'>
                            <p className='font-medium text-center'>Continuer</p>
                    </button>
                    <p className="hidden lg:flex text-xs mt-5 place-self-center">* En continuant vous acceptez nos conditions générales de ventes</p>
                </div>
            </main>
        </Layout>
    )
}