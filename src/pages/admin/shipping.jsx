import shipping_icon from '../../../public/assets/dashboard/shipping.svg'
import { Menu } from '@/components/menus/menu'
import {  useMemo, useState } from 'react'
import { CircularLoading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { InterfaceTextInput } from '@/components/forms/interface_input'

import { object, number } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { GETRequest } from '@/utils/requestHeader'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const schema1 = object({
  shipping_france:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Min. 1 personne.'),
}).required();

const schema2 = object({
  shipping:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Min. 1 euro.'),
}).required();

const schema3 = object({
  free_shipping:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Min. 1 euro.'),
}).required();


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
  const person = await response.json()
  if(response.status !== 200 || !person.is_admin) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const shippingFR = await fetch(`${API_URL}/settings/value/shipping_france`, GETRequest).then(r => r.json())
  const shipping = await fetch(`${API_URL}/settings/value/shipping`, GETRequest).then(r => r.json())
  const free = await fetch(`${API_URL}/settings/value/free_shipping`, GETRequest).then(r => r.json())

  return {
      props: {
        shippingFR:shippingFR,
        shipping:shipping,
        free:free
      }
  }
}

export default function Shipping({shippingFR, shipping, free}) {

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Livraison' image={shipping_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex bg-white shadow-xl w-full rounded-xl py-10 px-10 gap-y-5 gap-x-20 flex-wrap xl:py-5 lg:py-2 sm:shadow-none lg:gap-x-10 sm:flex-col sm:items-center'>
            <FormShipping label="Frais de livraison - FRANCE" placeholder="Entrez les frais de livraison" validationTitle="shipping_france" current_schema={schema1} current_value={shippingFR} />
            <FormShipping label="Frais de livraison - HORS FRANCE" placeholder="Entrez les frais de livraison" validationTitle="shipping" current_schema={schema2} current_value={shipping} />
            <FormShipping label="Livraison gratuite" placeholder="Indiquez le montant" validationTitle="free_shipping" current_schema={schema3} current_value={free}  />
          </div>
        </section>
    </main>
    </>
  )
}

function FormShipping ({label, placeholder, validationTitle, current_schema, current_value}) {
  const [loading, setLoading] = useState(false)
  const [logErr, setlogErr] = useState(false)
  const  { handleSubmit, register, formState: {errors}} = useForm ({ resolver:  yupResolver(current_schema)})

    async function onSubmit(data) {
      setLoading(true)
      setlogErr(false)
      try {
          const response = await fetch(`/api/proxy/auth/admin/settings`, {
              method: "POST",    
              mode: "cors",
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  key:validationTitle,
                  value:data[validationTitle]
              })
          })
          const apiReponse = await response.json()
          if(response.status === 200){
              setLoading(false)
              return
          }
          setLoading(false)
          setlogErr(true)
      } catch (err) {
        console.error('Request failed:' + err)
        setLoading(false)
        setlogErr(true)
      }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex text-white gap-5">
      {loading 
        ? <CircularLoading />
        : <div className='flex flex-col'>
          {logErr ? <div className="font-medium text-[#d32f2f] mb-2">Une erreur est survenue. Contactez un développeur.</div> : ''}
          <InterfaceTextInput defaultValue={current_value?.value} label={label} placeholder={placeholder} name={validationTitle} options={{...register(validationTitle)}} commonError={errors[validationTitle]} commonErrorMessage={errors[validationTitle]?.message} labelStyle="text-secondary"/>
          <button type='submit' className='px-[45px] my-4 flex gap-3 rounded-xl py-3 text-white bg-secondary/80 hover:bg-secondary transition-all duration-500 w-full justify-center'>
              <p className='font-bold'>Valider</p>
          </button>
        </div>
      }
    </form>
  )
}