import Image from 'next/image'
import Close from "../../../public/assets/close.svg"
import { useState, useEffect } from 'react'
import calendar from '../../../public/assets/calendar.json'
import { CircularLoading } from '@/utils/loader'
import { GETRequest } from '@/utils/requestHeader'
import { unlock } from '@/utils/lockScreen'

import { ThemeProvider, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { colorTheme } from '@/components/styles/mui';
import { dateToHyphenDate } from '@/utils/timeToHours'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function OpenDay ({day, setSlot, slot, disponibility, setDisponibilities}) {
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])

    const { handleSubmit} = useForm()

    useEffect(() => {
        setServices(disponibility?.map(dispo => dispo.service))
    }, [day, disponibility])

    async function onSubmit() {
        setLoading(true)
        try {
            const newRent = await fetch(`/api/proxy/auth/admin/room-rentals `, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    date:dateToHyphenDate(day),
                    services:services
                })
            })
            if(newRent.status == 200) {
                const result = await fetch(`${API_URL}/room-rentals`, GETRequest).then(r => r.json())
                const rent = await newRent.json()
                setDisponibilities(result)
                setServices(rent?.map(dispo => dispo.service))
                setLoading(false)
            }
            setLoading(false)
        } catch (err) {
            console.error('Request failed:' + err)
            setLoading(false)
        }
    }
    return(
        <div className="w-[100vw] h-[100vh] bg-black/60 items-center justify-center overflow-hidden z-50 absolute top-0 left-0 md:items-start md:pt-3"
                style={slot ? {display:"flex"} : {display:"none"}}>
            <div className="flex flex-col bg-white text-black rounded-2xl pt-2 pb-10 px-14 relative lg:w-[95%] sm:px-4">
                <Image src={Close} alt="Close pictogram" 
                        onClick={() => {setSlot(false); unlock()}} 
                        className='self-end -mr-10 mt-2 h-7 w-auto cursor-pointer sm:mr-0' />
                <div className='flex flex-col items-center gap-10'>
                    <h2 className='text-2xl font-bold mt-2 lg:text-xl sm:text-lg sm:text-center'>{`Disponibilités - ${new Date(day).getDate()} ${calendar.months.filter(m => m.id === new Date(day).getMonth())[0].month}`}</h2>
                    {loading 
                        ? <div className='flex place-self-center'>
                            <CircularLoading />
                        </div>
                        : <div className='w-full max-h-[80vh] overflow-y-auto gap-10 flex flex-col md:max-h-[60vh]'>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 md:flex-col-reverse" >
                                <div className='flex gap-5 flex-wrap justify-center'>
                                    <ThemeProvider theme={colorTheme}>
                                        <CustomCheckBox text="Soirée" services={services} setServices={setServices} value={'evening'} />
                                        <CustomCheckBox text="Journée" services={services} setServices={setServices} value={'full_day'} />
                                        <CustomCheckBox text="1/2 journée (matin)" services={services} setServices={setServices} value={'half_day_morning'} />
                                        <CustomCheckBox text="1/2 journée (après-midi)" services={services} setServices={setServices} value={'half_day_afternoon'} />
                                        <div style={day.getDay() === 0 || day.getDay() === 6 ? {display:'block'} : {display:'none'}}>
                                            <CustomCheckBox text="Week-end" services={services} setServices={setServices} value={'full_week_end'} />
                                        </div>
                                    </ThemeProvider>
                                </div>
                                <button type='submit' className='flex w-fit  place-self-center items-center gap-3 text-white justify-center bg-secondary py-2 px-4 rounded-md sm:text-sm sm:font-medium cursor-pointer sm:w-fit sm:place-self-center'>Mettre à jour</button>
                            </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

function CustomCheckBox ({text, services, setServices, value}) {

    const [checked, setChecked] = useState(false);
    useEffect(() => {
        services?.indexOf(value) >= 0 ? setChecked(true) : setChecked(false)
    }, [services, value])

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if(event.target.checked) {
            setServices([...services, value]);
        } else {
            setServices(services?.filter(service => service !== value))
        }
    };

    return(
        <div className="flex flex-col items-center border-2 border-secondary rounded-xl py-2 px-4">
            <Checkbox size="small" checked={checked} onChange={handleChange} />
            <p className="font-medium text-center text-secondary">{text}</p>
        </div> 
    )
}