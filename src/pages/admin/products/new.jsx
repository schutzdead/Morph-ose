import product_icon from '../../../../public/assets/dashboard/product.svg'
import edit from '../../../../public/assets/dashboard/edit.svg'
import { Menu } from '@/components/menus/menu'
import { useRef, useState } from "react";
import { Loading } from '@/utils/loader';
import NewProduct from '@/components/forms/newProduct';
import { Back,PictoButton } from '@/components/littleComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { NoIndexHead } from '@/utils/customHead';
import { object, string, number } from "yup";
import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents';

const API_URL = process.env.NEXT_PUBLIC_API_URL

const schemaProduct = object({
  title:string().required("Requis."),
  price:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 questionnaire.'),
  promo_price:string(),
  TVA:string(),
  stock:string(),
  reference:string(),
  description:string(),
  big_description:string(),
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
  
  if(response.status !== 200) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  return {
    props: {
      token:authToken
    }
  }
}

export default function AddProduct({token}) {
    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    const [menu, setMenu] = useState(false)
    const [hamburger, setHamburger] = useState(false)

    const formationFilter = useRef(null)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] min-h-[100vh] bg-cover bg-center flex relative lg:justify-center' 
          onClick={(e) => { if (formationFilter.current && formationFilter.current.contains(e.target) || !formationFilter.current.contains(e.target)) {setSearchResult([])} }}>
      <Menu />
      <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
      <section className='w-rightSide flex flex-col min-h-[100vh] px-20 py-10 ml-[320px] lg:ml-0 xl:px-5 lg:w-[95vw] sm:w-full sm:pb-5 sm:pt-0'>
        <DashboardTitle text='Nouveau produit' image={product_icon}/>
        <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
          <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
        </div>
        <div className='flex gap-3 mt-10 sm:mt-20'>
            <Back title="Retour à la liste" linkTo='/admin/products' />
            <PictoButton image={edit} linkTo='/admin/products/modify' />
        </div>
        <div ref={formationFilter} className='flex flex-col gap-5 items-center'>
          {loading
              ? <div className="h-[100px] w-full flex justify-center">
                <div className="w-1/2 py-10">
                    <Loading />
                </div>
              </div>
              : <NewProduct
                  searchResult={searchResult} setSearchResult={setSearchResult}
                  setLoading={setLoading} formationFilter={formationFilter}
                  formResolver={{resolver: yupResolver(schemaProduct)}}
                  validationButton="Créer" api="/auth/admin/products" token={token} />
          }
        </div>
      </section>
    </main>
    </>
  )
}