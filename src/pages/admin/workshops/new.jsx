import workshop_icon from '../../../../public/assets/dashboard/workshop.svg'
import { Menu } from '@/components/menus/menu'
import { useRef, useState } from "react";
import { Loading } from '@/utils/loader';
import NewWorkshop from '@/components/forms/newWorkshop';
import { Back } from '@/components/littleComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { NoIndexHead } from '@/utils/customHead';
import { object, string, number } from "yup";
import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents';
import { GETRequest } from '@/utils/requestHeader';

const API_URL = process.env.NEXT_PUBLIC_API_URL

const schemaEvent = object({
  title:string().required("Requis."),
  speaker_name:string().nullable(),
  price:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 questionnaire.'),
  duration:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 minute.'),
  entries_available:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 entrée.'),
  description:string(),
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

  const cat = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
  const all = cat?.map(c => c.childs).flat()

  return {
    props: {
      all_categories : all
    }
  }
}

export default function AddProduct({all_categories}) {
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
        <DashboardTitle text='Nouvel évènement' image={workshop_icon}/>
        <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
          <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
        </div>
        <div className='flex gap-3 mt-10 sm:mt-20'>
            <Back title="Retour à la liste" linkTo='/admin/workshops' />
        </div>
        <div ref={formationFilter} className='flex flex-col gap-5 items-center'>
          {loading
              ? <div className="w-1/2 max-w-[200px] py-20">
                    <Loading />
                </div>
              : <NewWorkshop
                  searchResult={searchResult} setSearchResult={setSearchResult}
                  setLoading={setLoading} formationFilter={formationFilter}
                  formResolver={{resolver: yupResolver(schemaEvent)}}
                  validationButton="Créer" api="/auth/admin/workshops"/>
          }
        </div>
      </section>
    </main>
    </>
  )
}