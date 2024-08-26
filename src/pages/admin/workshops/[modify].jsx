import workshop_icon from '../../../../public/assets/dashboard/workshop.svg'
import add from '../../../../public/assets/dashboard/add.svg'
import { Menu } from '@/components/menus/menu'
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { Loading } from '@/utils/loader';

import { Back, PictoButton } from '@/components/littleComponents';
import { GETRequest } from '@/utils/requestHeader';
import { NoIndexHead } from '@/utils/customHead';

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle, DeleteButton } from '@/components/littleComponents';
import { object, string, number } from "yup";
import NewWorkshop from '@/components/forms/newWorkshop';

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

  const event = await fetch(`${API_URL}/workshops/${query.modify}`, GETRequest).then(r => r.json())

  return {
      props: {
        current_event:event,
      }
  }
}

const schemaEvent = object({
  title:string().required("Requis."),
  speaker_name:string().nullable(),
  price:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 questionnaire.'),
  duration:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 minute.'),
  entries_available:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Minimum 1 entrée.'),
  description:string(),
}).required();

export default function EditProduct({current_event}) {
  const [event, setEvent] = useState()
  const [loading, setLoading] = useState(false)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  useEffect(() => {
    !current_event || current_event.message  ? '' : setEvent(current_event)
  }, [current_event])

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex relative lg:justify-center'>
      <Menu />
      <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
      <section className='w-rightSide flex flex-col min-h-[100vh] px-20 py-10 ml-[320px] lg:ml-0 xl:px-5 lg:w-[95vw] sm:w-full sm:pb-5 sm:pt-0'>
        <DashboardTitle text='Modification évènement' image={workshop_icon}/>
        <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
          <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
        </div>
        <div className='flex gap-3 mt-10 sm:mt-20'>
            <Back title="Retour à la liste" linkTo='/admin/workshops' />
            <PictoButton image={add} linkTo='/admin/workshops/new' />
            <DeleteButton api='auth/admin/workshops' id={event?.id} setLoading={setLoading} backLink={'/admin/workshops'} />
        </div>
        <div className='flex flex-col gap-5 items-center'>
          {/* <form className='w-full place-self-center gap-10 bg-white py-4 mt-4 px-5 items-center justify-items-center rounded-xl shadow-xl sm:mt-0'
                ref={filterBox}>
              <ThemeProvider theme={colorTheme}>
                  <TutorFilter searchResultTutors={searchResultTutors} setSearchResultTutors={setSearchResultTutors} setEvent={setEvent} />
              </ThemeProvider>
          </form> */}
          {loading
              ? <div className="w-1/2 max-w-[200px] py-20">
                      <Loading />
                  </div>
              : <NewWorkshop
                  setLoading={setLoading}
                  formResolver={{resolver: yupResolver(schemaEvent)}}
                  searchTutorData={event} setSearchTutorData={setEvent}
                  validationButton="Modifier" api={`/auth/admin/workshops/${event?.id}`} />
          }
        </div>
      </section>
    </main>
    </>
  )
}