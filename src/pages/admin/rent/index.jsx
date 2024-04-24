import Image from 'next/image'
import left_chevron from '../../../../public/assets/rent/left_chevron.svg'
import gray_left_chevron from '../../../../public/assets/rent/gray_left_chevron.svg'
import right_chevron from '../../../../public/assets/rent/right_chevron.svg'

import { useState, useEffect } from 'react'

import { GETRequest } from '@/utils/requestHeader'
import calendar from '../../../../public/assets/calendar.json'
import { OpenDay } from '@/components/admin/openDay'

import rent_icon from '../../../../public/assets/dashboard/rent.svg'
import { NoIndexHead } from '@/utils/customHead'
import { Menu } from '@/components/menus/menu'
import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const location_days = [
    {"id":0, "day":"Lun"},
    {"id":1, "day":"Mar"},
    {"id":2, "day":"Mer"},
    {"id":3, "day":"Jeu"},
    {"id":4, "day":"Ven"},
    {"id":5, "day":"Sam Dim"},
]

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
    
    const person = await response.json()
    if(response.status !== 200 || !person.is_admin) {
      return { 
        redirect: {
          destination: '/admin',
          permanent: false,
        },
    }}
  

    const result = await fetch(`${API_URL}/room-rentals`, GETRequest).then(r => r.json())
    return {
        props: {
            available:result,
        }
    }
}

export default function Disponibilities({available}) {
    const { v4: uuidv4 } = require('uuid');
    const [numberOfDays, setNumberOfDays] = useState([])
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [lag, setLag] = useState()
    
    const [date, setDate] = useState(new Date())
    const [slot, setSlot] = useState(false)
    const [disponibilities, setDisponibilities] = useState(available)
    const [disponibility, setDisponibility] = useState()

    const [menu, setMenu] = useState(false)
    const [hamburger, setHamburger] = useState(false)

    //update lag when month change (starting day)
    useEffect(() => {
        if(new Date(currentYear, currentMonth, 1).getDay() === 0) {
            setLag([...Array(6).keys()])
            return
        }
        setLag([...Array(new Date(currentYear, currentMonth, 1).getDay()-1).keys()])
    },[currentMonth, currentYear])

    //update days number when month change
    useEffect(() => {
        setNumberOfDays([])
        let bissextile = 0
        if(currentYear%4 === 0) {bissextile=1}
        for(let i=0; i<calendar.months[currentMonth].days_number; i++){
            if(bissextile>0 && currentMonth === 1) {
                setNumberOfDays([...Array(29).keys()])
                return
            } 
            setNumberOfDays(previous => [...previous, i])
        }
    }, [currentMonth, currentYear])

    //restart month with arrow
    const changeMonth = (timeOrientation) => {
        if(currentMonth===11 && timeOrientation===1){
            setCurrentYear(currentYear+1)
            setCurrentMonth(0)
            return
        }
        if(currentMonth===0 && timeOrientation===-1){
            setCurrentYear(currentYear-1)
            setCurrentMonth(11)
            return
        }
        setCurrentMonth(currentMonth + (timeOrientation*1))
    }

    return(
    <>
    <NoIndexHead />
      <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='flex-col items-center gap-9 text-white flex w-full max-h-[100vh] mt-20 p-14 ml-[320px] lg:ml-0'>
            <DashboardTitle text='Location' image={rent_icon}/>
            <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
                <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
            </div>
            <OpenDay day={date} setSlot={setSlot} slot={slot} disponibility={disponibility} setDisponibilities={setDisponibilities} />
            <section className='grid grid-cols-2 gap-5 w-[600px] md:w-[95%]'>
                <>
                <div className='col-span-2 bg-white shadow-2xl text-secondary max-w-[600px] px-[30px] py-10 rounded-2xl shadow-dashboard sm:px-5 md:place-self-center sm:py-5 sm:min-w-[400px] 2sm:min-w-[95vw]'>
                    <div className='flex text-2xl font-bold mb-5 items-center justify-between sm:text-xl sm:mb-2'>
                        <p>{calendar.months[currentMonth].month} {currentYear}</p>
                        <div className='flex items-center gap-5'>
                            {currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth() 
                                ?<Image src={gray_left_chevron} alt="Arrow icon" className='w-8 cursor-pointer'/>
                                :<Image src={left_chevron} alt="Arrow icon" className='w-8 cursor-pointer' onClick={() => {changeMonth(-1)}}/>
                            }
                           <Image src={right_chevron} alt="Arrow icon" className='w-8 cursor-pointer' onClick={() => {changeMonth(1)}} />
                        </div>
                    </div>
                    <div className='grid grid-cols-7 place-items-center mx-0'>
                        {location_days.map(day => <h3 key={day.id} className='p-5 text-sm font-bold'><p className='w-6 h-6 flex items-center justify-center'>{day.day.toLowerCase()}</p></h3>)}
                    </div>
                    <div className='grid grid-cols-7 place-items-center gap-x-[9px] gap-y-5'>
                        {lag === 0 
                            ? ''
                            : lag?.map(n => <h3 key={n} className='p-5 text-sm font-bold md:p-0 md:min-w-[40px] md:min-h-[40px] md:w-full md:h-full'><p className='w-6 h-6 flex items-center justify-center'></p></h3>)
                        }
                        {numberOfDays.map(n => 
                            <div key={uuidv4()} 
                                 onClick={() => {
                                    setDate(new Date(currentYear, currentMonth, n+1)); 
                                    setDisponibility(disponibilities.filter(dispo => new Date(new Date(dispo.date).getFullYear(),new Date(dispo.date).getMonth(),new Date(dispo.date).getDate(),0,0,0,0).getTime() === new Date(currentYear,currentMonth,n+1,0,0,0,0).getTime())); 
                                    setSlot(true); 
                                    lock()}} 
                                 className='p-5 border rounded relative border-[#D5D4DF] text-sm flex items-center justify-center cursor-pointer hover:bg-primary/40 transition-all duration-300 md:p-0 md:min-w-[40px] md:min-h-[40px] md:w-full md:h-full 2sm:min-h-[35px] 2sm:min-w-[35px]' 
                                 style={(currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth() && n+1<new Date().getDate())
                                    || new Date(currentYear,currentMonth,n,0,0,0,0).getDay() === 6
                                  ? {backgroundColor:'rgb(243 244 246)', color:'rgb(156 163 175)', cursor:'default',  pointerEvents: "none"} 
                                  : {}}>
                                <p className='z-10 w-6 h-6 flex items-center justify-center'>{n+1}</p>
                                <div className='w-16 h-16 z-0 left-0 top-0 bg-primary/50 absolute md:p-0 md:min-w-[38px] md:min-h-[38px] md:w-full md:h-full 2sm:min-h-[32px] 2sm:min-w-[32px]' style={
                                   disponibilities?.map(d => d.date).findIndex(i => new Date(new Date(i).getFullYear(),new Date(i).getMonth(),new Date(i).getDate(),0,0,0,0).getTime() === new Date(currentYear,currentMonth,n+1,0,0,0,0).getTime()) === -1 || new Date().getTime() >= new Date(currentYear,currentMonth,n+2,0,0,0,0).getTime()
                                   ? {display:'none'} 
                                   : {display:'flex'}
                                }></div>
                            </div>)
                        }
                    </div>
                </div>          
            </>
            </section>
        </section>
  </main>
  </>
    )
}