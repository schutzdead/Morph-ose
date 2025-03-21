import product_icon from '../../../../public/assets/dashboard/product.svg'
import add from '../../../../public/assets/dashboard/add.svg'
import { Menu } from '@/components/menus/menu'
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { Loading } from '@/utils/loader';

import NewProduct from '@/components/forms/newProduct';
import { Back, PictoButton } from '@/components/littleComponents';
import { GETRequest } from '@/utils/requestHeader';
import { NoIndexHead } from '@/utils/customHead';

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle, DeleteButton } from '@/components/littleComponents';
import { object, string, number } from "yup";

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
  const person = await response.json()
  if(response.status !== 200 || !person.is_admin) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const product = await fetch(`${API_URL}/products/${query.modify}`, GETRequest).then(r => r.json())
  for(const property in product) {
      if(product[property] === null) {
        product[property] = ''
      }
  }

  const cat = await fetch(`${API_URL}/categories/not-full`, GETRequest).then(r => r.json())
  let childs = []
  childs = cat?.map(c => ({title:c.title, childs:c.childs})).map(cate => cate.childs.map(child => ({id:child.id, title:`${cate.title} - ${child.title}`}))).flat()

  return {
      props: {
        current_product:product,
        all_categories : childs
      }
  }
}

const schemaProduct = object({
  title:string(),
  price:number(),
  promo_price:string(),
  vat_percent:string(),
  stock:string(),
  reference:string(),
  description:string(),
  big_description:string(),
});

export default function EditProduct({current_product, all_categories}) {
    const [productData, setProductData] = useState()
    const [loading, setLoading] = useState(false)

    const [menu, setMenu] = useState(false)
    const [hamburger, setHamburger] = useState(false)

    useEffect(() => {
      !current_product || current_product.message  ? '' : setProductData(current_product)
  }, [current_product])

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex relative lg:justify-center'>
      <Menu />
      <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
      <section className='w-rightSide flex flex-col min-h-[100vh] px-20 py-10 ml-[320px] lg:ml-0 xl:px-5 lg:w-[95vw] sm:w-full sm:pb-5 sm:pt-0'>
        <DashboardTitle text='Modification produit' image={product_icon}/>
        <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
          <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
        </div>
        <div className='flex gap-3 mt-10 sm:mt-20'>
            <Back title="Retour à la liste" linkTo='/admin/products' />
            {/* <PictoButton image={add} linkTo='/admin/products/new' /> */}
            {/* <DeleteButton api='auth/admin/products' id={current_product?.id} setLoading={setLoading} backLink={'/admin/products'} /> */}
        </div>
        <div className='flex flex-col gap-5 items-center'>
          {/* <form className='w-full place-self-center gap-10 bg-white py-4 mt-4 px-5 items-center justify-items-center rounded-xl shadow-xl sm:mt-0'
                ref={filterBox}>
              <ThemeProvider theme={colorTheme}>
                  <TutorFilter searchResultTutors={searchResultTutors} setSearchResultTutors={setSearchResultTutors} setProductData={setProductData} />
              </ThemeProvider>
          </form> */}
          {loading
              ? <div className="w-1/2 max-w-[200px] py-20">
                      <Loading />
                  </div>
              : <NewProduct
                  setLoading={setLoading}
                  formResolver={{resolver: yupResolver(schemaProduct)}}
                  searchTutorData={productData} setSearchTutorData={setProductData}
                  validationButton="Modifier" api={`/auth/admin/products/${productData?.id}`} all_categories={all_categories} />
          }
        </div>
      </section>
    </main>
    </>
  )
}