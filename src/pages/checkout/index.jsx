import { CheckoutSignIn } from "@/components/checkout/checkoutSignIn";
import { FakeBreadCrumb } from "@/components/checkout/breadcrumb";
import { GuestForm } from "@/components/checkout/guestForm";
import CheckoutHeader from "@/components/layout/checkoutHeader";
import Footer from "@/components/layout/footer";
import { ShoppingCart } from "@/components/checkout/shoppingCart";

import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "@/components/styles/mui";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { unlock } from "@/utils/lockScreen";

export async function getServerSideProps ({req, res}) {
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)
    const authToken = cookies.get('auth-token') || ''
    const response = await fetch('https://api.bat-n3.darianne.fr/auth/users/current', {
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
    },[data])

    return(
        <>
            <CheckoutHeader />
                <main>
                    <FakeBreadCrumb current={1} />
                    <div className="w-full flex justify-evenly mb-10 lg:flex-col">
                        <div className="flex flex-col items-center">
                            <h1 className="text-base my-10 md:my-6">TEST</h1>
                            {userData ? ''
                            :
                            <div className="max-w-[450px] w-full mb-20 xl:max-w-[400px] md:mb-14 sm:w-[320px]">
                                <h2 className="font-bold text-[15px] mb-3">TEST</h2>
                                <CheckoutSignIn setUserData={setUserData} />
                            </div>}
                            <div className="max-w-[500px] w-full py-14 mx-10 px-10 box-content border border-black xl:max-w-[400px] md:pt-6 md:pb-10 sm:max-w-[320px] sm:px-0 sm:mx-0 sm:border-none sm:py-5">
                                <h2 className="font-bold text-[15px] mb-3">{userData ? '' : 'TEST'}</h2>
                                <GuestForm userData={userData} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center h-fullwithHeaderCheckout sticky top-[176px] bg-gray-50 px-12 2xl:px-6 lg:mt-20 lg:relative lg:top-0 lg:flex-col-reverse lg:h-auto md:mt-10">
                            <ShoppingCart />
                        </div>
                        <div className="hidden lg:flex lg:place-self-center">
                            <ThemeProvider theme={colorTheme}>
                                <Button type="submit" form="guestForm"  variant="contained" sx={{borderRadius:0, mt:6}} className="bg-black col-span-1 col-start-2 w-[350px] sm:w-[200px]">TEST</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    )
}