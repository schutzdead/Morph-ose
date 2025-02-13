import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/rent/bg.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import { Newletter, Title} from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";
import { useEffect, useState } from "react";
import { Checkbox, ThemeProvider } from "@mui/material";
import { colorTheme } from "@/components/styles/mui";
import { CircularLoading } from "@/utils/loader";
import { location_days } from "./admin/rent";

import computer from '../../public/assets/rent/computer.svg'
import shop from '../../public/assets/rent/shop.svg'
import coffee from '../../public/assets/rent/coffee.svg'
import chair from '../../public/assets/rent/chair.svg'
import eye from '../../public/assets/rent/eye.svg'

import left_chevron from '../../public/assets/rent/left_chevron.svg'
import gray_left_chevron from '../../public/assets/rent/gray_left_chevron.svg'
import right_chevron from '../../public/assets/rent/right_chevron.svg'
import left_arrow from '../../public/assets/dashboard/left_arrow.svg'
import calendar from '../../public/assets/calendar.json'
import { InterfaceTextArea, InterfaceTextInput } from "@/components/forms/interface_input";

import { object, number,string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import fr from 'date-fns/locale/fr';
import parseISO from "date-fns/parseISO";

const schema = object({
    persons:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Min. 1 personne.'),
    price:number().required("Requis.").typeError("Doit être un nombre").min(1, 'Min. 1 euro.'),
    comment:string().required("Requis.")
}).required();

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps() {
  const result = await fetch(`${API_URL}/workshops`, GETRequest).then(r => r.json())
  return {
      props: {
          workshops:result
      }
  }
}

export default function Rent() {

    const TEXTMODAL = [{id:1, title:"20 personnes assises - 15 personnes attablées - 7 personnes allongées", image:shop}, {id:2, title:"Projecteur et écran sur demande ", image:computer}, {id:3, title:"Equipements  à disposition : tables, chaise, tapis, coussins...", image:chair}, {id:4, title:"Pour vos moments de pause, la cafetière est à votre disposition", image:coffee}]

    const [step, setStep] = useState(1)
    const [option, setOption] = useState()
    const [dispo, setDispo] = useState()
    const [loading, setLoading] = useState(false)

    const [rentId, setRentId] = useState(null)
    return (
        <>
        <CustomHead pageName='Location professionnelle' metaResume="Louez notre location pendant une période déterminée."/>
            <Layout>
            <main className="pt-[1.5vh]">
                <section className="h-home w-[98vw] items-end ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5 hlg:h-auto hlg:py-10" style={{backgroundImage:`url(${Picture.src})`}}>
                <div className=" w-[500px] mr-20 md:mr-0 sm:max-w-[500px] sm:w-[90%]">
                    <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                        <div className="flex flex-col gap-7 px-7 w-full items-center md:gap-5">
                        <h1 className="text-white leading-[60px] font-Quesha text-7xl md:text-5xl md:leading-[35px]">Venez proposer vos services !</h1>
                            <div className="h-[2px] bg-white place-self-start w-full"></div>
                            <p className="font-medium text-lg md:text-base sm:text-sm">{`Vous êtes un professionnel du bien-être, de l'ésotérisme ou un créatif à la recherche de l'espace parfait pour organiser vos ateliers et événements ?`}</p>
                            <p className="font-bold text-lg md:text-base sm:text-sm">Découvrez notre espace modulable situé à Cournon d’Auvergne, spécialement aménagé pour répondre à vos besoins.</p>
                        </div>
                    </div>
                    <div className="flex gap-5 w-full mt-3">
                    <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 md:py-3 md:font-extrabold">
                        SERVICES
                    </Link>
                    <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:font-extrabold">
                        BOUTIQUE
                    </Link>
                    </div>
                </div>
                </section>
                <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                    <div className="flex flex-col gap-5 mt-5 text-secondary text-center text-lg font-medium sm:text-sm max-w-[1500px] sm:place-self-center sm:text-center">
                        <h3 className="text-primary mb-5 leading-[80px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px]">Notre cocon</h3>
                        <p>Chez Merveilles de {`Morph'ose, nous comprenons l'importance`} <span className="font-semibold">{`d'un environnement adapté et inspirant`}</span>{` pour le partage de connaissances et la réalisation d'activités créatives. Pour cela nous offrons à la location un espace accueillant, idéal pour une variété d'événements tels que des ateliers de méditation, séances de yoga, découverte du tarot, ateliers créatifs, et bien plus encore...`}</p>
                    </div>
                    <div className="flex flex-col gap-5 mt-5 text-secondary text-center text-lg font-medium sm:text-sm max-w-[1500px] sm:place-self-center sm:text-center">
                        <h3 className="text-primary mb-5 leading-[80px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px]">Des installations adaptées</h3>
                        <p className="font-semibold">Notre espace est équipé pour accueillir confortablement vos participants :</p>
                        <p>Vous pouvez <b>{`personnaliser l'agencement et l'ambiance de notre espace`}</b> selon le thème et le style de votre événement. Que vous souhaitiez créer une atmosphère relaxante pour des séances de bien-être ou un cadre dynamique pour des ateliers créatifs, nous vous proposons un espaces adaptable à vos spécificités.</p>
                    </div>
                    <div className="grid grid-cols-4 place-items-center max-w-[1200px] gap-5 place-self-center lg:grid-cols-2 sm:grid-cols-1">
                        {
                            TEXTMODAL.map((text) => 
                                <div key={text.id} className="p-5 text-center font-semibold bg-modalRent rounded-2xl flex flex-col items-center justify-center min-h-[160px] gap-3 max-w-[250px] sm:min-w-[93vw]">
                                    <Image src={text.image} alt='icons' className="w-8 h-auto" priority />
                                    <p className="gradient-text">{text.title}</p>
                                </div>
                            )
                        }
                        <div className="col-span-2 col-start-2 lg:col-start-1 w-full p-5 text-secondary text-center font-semibold bg-modalRent rounded-2xl flex items-center justify-center lg:min-h-0 sm:min-w-[93vw] sm:col-span-1 flex-col gap-3">
                            <Image src={eye} alt='icons' className="w-8 h-auto" priority />
                            <p className="gradient-text">Profitez de notre communication pour vous faire connaître</p>
                        </div>
                    </div>
                    <p className="font-bold text-2xl lg:text-xl sm:text-base pt-10 text-center sm:pt-5 text-secondary">Louez notre espace et donnez vie à vos ateliers et événements dans un lieu qui inspire et soutient le développement personnel et créatif.</p>
                    <div id="scroll_rent" className="scroll-m-24 flex flex-col items-center relative gap-10 w-full max-w-[1000px] bg-background p-10 rounded-2xl sm:p-0 sm:gap-5 sm:bg-transparent">
                        <button style={step === 1 ? {display:'none'} : {display:'flex'}} onClick={() => setStep(step === 1 ? step : step-1 )} className='pl-2 pr-4 bg-primary/80 hover:bg-primary absolute w-fit top-8 left-10 items-center transition-all duration-500 rounded-xl justify-center text-base text-white py-2 md:top-5 md:left-0 md:pl-0 md:pr-2 md:py-1 md:text-sm md:rounded-md md:bg-primary'>
                            <Image src={left_arrow} alt='left arrow icon' className="md:w-4 h-auto" priority />
                            <p className='font-medium text-center mb-[2px]'>Retour</p>
                        </button>
                        <h2 className="font-Quesha text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-primary md:pt-10">Etape {step}</h2>
                        {loading 
                            ? <CircularLoading />
                            : <>
                                <Step1 step={step} setStep={setStep} />
                                <Step2 step={step} setStep={setStep} option={option} setOption={setOption} setDispo={setDispo} setLoading={setLoading} />
                                <Step3 step={step} setStep={setStep} dispo={dispo} setRentId={setRentId} />
                                <Step4 step={step} setStep={setStep} rentId={rentId} setLoading={setLoading} />
                            </>
                        }
                    </div>
                </section>
                <Newletter />
            </main>
            </Layout>
        </>
    )
}


export function Step1 ({step, setStep}) {
    const router = useRouter()
    return(
        <div className="w-full flex flex-col gap-5" style={step === 1 ? {display:'flex'} : {display:'none'}}>
            <div className="font-semibold text-2xl bg-[#ECA68345] w-full flex items-center justify-center rounded-2xl py-5 sm:text-lg">
                <h2 className="gradient-text2 text-center px-5">QUE SOUHAITEZ VOUS PROPOSER ?</h2>
            </div>
            <div className="flex flex-col items-center rounded-2xl text-white bg-primary gap-5 p-5">
                <h2 className="font-Quesha text-7xl lg:text-6xl md:text-5xl text-center sm:text-4xl sm:leading-[30px]">Réserver l’espace pour mon évènement</h2>
                <p className="text-lg font-semibold sm:text-base text-center">Je souhaite organiser un atelier ou évènement dans votre local !*</p>
                <p className="sm:text-sm text-center">{`* Pour être à l'aise, merci de réserver l'espace au moins 1 mois avant votre évènement !`}</p>
                <button onClick={() => {setStep(2), router.push('#scroll_rent')}} className="w-fit px-5 py-2 bg-[#ECA683] mt-4 rounded-[50px] text-white font-bold text-base sm:text-sm">JE RESERVE L’ESPACE</button>
            </div>
        </div>
    )
  }

export function Step2 ({step, setStep, option, setOption, setDispo, setLoading}) {
    const router = useRouter()
    async function addDispo (day) {
        if(option === undefined) return
        setLoading(true)
        try {
            const result = await fetch(`${API_URL}/room-rentals/${day}`, GETRequest).then(r => r.json())
            setDispo(result)
            setStep(3)
            router.push('#scroll_rent')
            setLoading(false)
        } catch (err) {
            console.error('Request failed:' + err)
            setLoading(false)
        }
    }

    return(
        <div className="w-full flex-col gap-5" style={step === 2 ? {display:'flex'} : {display:'none'}}>
            <div className="font-semibold text-2xl bg-[#ECA683] w-full flex items-center justify-center lg:text-xl rounded-2xl py-5 sm:text-lg">
                <h2 className="gradient-text2 text-center px-3">SELECTIONNER LA DUREE DE VOTRE RESERVATION DU LOCAL</h2>
            </div>
            <div className="grid grid-cols-4 w-full justify-items-center text-white gap-5 py-5 lg:max-w-[700px] place-self-center lg:grid-cols-2 sm:grid-cols-1 sm:max-w-[350px]">
                <ModalStep2 title='Soirée' duration="19h-23h" price={55} setOption={setOption} option={option} value={'evening'} />
                <ModalStep2 title='1/2 journée' duration="9h-14h / 14h-19h" price="Semaine : 50" price2="Week-end : 60"  setOption={setOption} option={option} value={'half_day'} />
                <ModalStep2 title='Journée' duration="9h-19h" price="Semaine : 80" price2="Week-end : 100" setOption={setOption} option={option} value={'full_day'} />
                <ModalStep2 title='Week-end' duration="Samedi - Dimanche" price={180} setOption={setOption} option={option} value={'full_week_end'}/>
            </div>
            <button disabled={option === undefined} onClick={() => addDispo(option)} className="w-fit px-5 py-2 place-self-center transition-all duration-500   mt-4 rounded-[50px] text-white font-bold text-base" style={option !== undefined ? {backgroundColor:'rgba(222,91,48,0.8'} : {backgroundColor:'rgb(156,163,175)'}}>CONTINUER</button>
        </div>
    )
  }

export function ModalStep2 ({title, duration, price, price2, setOption, option, value}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        option?.indexOf(value) >= 0 ? setChecked(true) : setChecked(false)
    }, [option, value])

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if(event.target.checked) {
            setOption()
            setOption(value);
        } else {
            setOption()
        }
    };
    return(
        <div className="flex flex-col rounded-[18px] w-full shadow-xl bg-background">
            <div className="w-full items-center text-center flex justify-center bg-primary rounded-t-2xl py-3 px-5 text-white font-semibold text-xl lg:text-lg sm:text-base">
                <p>{title}</p>
            </div>
            <div className="flex flex-col items-center w-full h-full py-3 text-lg px-2 text-center">
                <div className="flex gap-1 flex-col">
                    <ThemeProvider theme={colorTheme}>
                        <Checkbox size="small" checked={checked} onChange={handleChange} />
                    </ThemeProvider>
                    <div className="w-full font-medium flex flex-col justify-center h-full items-center text-secondary">
                        <p className="font-semibold">{duration}</p>
                        <p className="text-base">{price}€ TTC</p>
                        <p className="text-base">{price2 ? `${price2}€ TTC` : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Step3 ({step, setStep, dispo, setRentId}) {
    const router = useRouter()
    const { v4: uuidv4 } = require('uuid');
    const [numberOfDays, setNumberOfDays] = useState([])
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [lag, setLag] = useState()
    
    const [date, setDate] = useState(new Date())
    const [disponibilities, setDisponibilities] = useState(dispo)
    const [disponibility, setDisponibility] = useState()

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
        <div className="w-full flex flex-col gap-5" style={step === 3 ? {display:'flex'} : {display:'none'}}>
            {dispo?.length === 0 || !dispo
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucune disponibilité pour cette période, revenez plus tard ou changer de période.</p>
                : <>
                    <div className="font-semibold text-2xl bg-[#ECA683] w-full flex items-center justify-center rounded-2xl py-5 sm:text-sm">
                        <h2 className="gradient-text2">SELECTIONNER UNE DATE</h2>
                    </div>
                    <div className='place-self-center mt-5 bg-white shadow-2xl text-secondary max-w-[600px] px-[30px] py-10 rounded-2xl shadow-dashboard sm:p-2 md:place-self-center sm:w-full sm:shadow-none'>
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
                        <div className='grid grid-cols-7 place-items-center'>
                            {location_days.map((day, index) => <h3 key={index} className='p-5 text-sm font-bold'><p className='w-6 h-6 flex items-center justify-center'>{day.day.toLowerCase()}</p></h3>)}
                        </div>
                        <div className='grid grid-cols-7 place-items-center gap-x-[9px] gap-y-5'>
                            {lag === 0 
                                ? ''
                                : lag?.map((n, index) => <h3 key={index} className='p-5 text-sm font-bold md:p-0 md:min-w-[40px] md:min-h-[40px] md:w-full md:h-full'><p className='w-6 h-6 flex items-center justify-center'></p></h3>)
                            }
                            {numberOfDays.map(n => 
                                <div key={uuidv4()} 
                                        onClick={() => {
                                            setDate(new Date(currentYear, currentMonth, n+1)); 
                                            setDisponibility(disponibilities.filter(dispo => new Date(new Date(dispo.date).getFullYear(),new Date(dispo.date).getMonth(),new Date(dispo.date).getDate(),0,0,0,0).getTime() === new Date(currentYear,currentMonth,n+1,0,0,0,0).getTime()))}
                                        } 
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
                        {date && disponibility?.length > 0 && disponibility ? 
                            <div className="flex flex-col items-center mt-10 sm:mt-5">
                                <h1 className='text-2xl font-semibold sm:text-center md:text-xl sm:text-lg mb-5'>{`Créneaux disponible du ${date.getDate()} ${calendar.months[date.getMonth()].month.toLowerCase()}`}</h1>
                                <div className="flex flex-col gap-4 w-full">
                                    {disponibility?.map((dispo, index) =>
                                        <div key={index} onClick={() => {setRentId(dispo.id);setStep(4);router.push('#scroll_rent')}} className="flex flex-col w-full font-semibold text-white bg-primary/60 px-4 py-2 rounded-xl text-center items-center hover:bg-primary cursor-pointer duration-500 transition-all">
                                            <h3 className="text-lg sm:text-sm">{dispo.title}</h3>
                                            <p className="text-xl font-bold lg:text-lg sm:text-base">{dispo.price}€ TTC</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            :""
                        }
                    </div>   
                </>
            }    
        </div>
    )
  }


  export function Step4 ({step, setStep, rentId, setLoading}) {

    const  {reset, handleSubmit, register, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const router = useRouter()
    const [begin, setBegin] = useState(parseISO("0"));
    const [error, setError] = useState(false)

    async function onSubmit(data) {
        setError(false)
        setLoading(true)
        const { price, persons, comment, title, duration } = data
		try {
            const response = await fetch(`${API_URL}/room-rentals/reservations`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    room_rental_id:rentId, 
                    number_of_person:persons, 
                    price_per_person:price, 
                    description:comment,
                    custom_title:title,
                    duration:duration,
                    start_time:new Date(begin).toLocaleTimeString('fr')
                 })
            })
            const newRent = await response.json()
            if(response.status === 200 || response.status === 201 || newRent){
                router.push({
                    pathname: '/rentCheckout',
                    query: { id: newRent.id },
                })
                setLoading(false)
                setStep(1)
                return
            }
            setLoading(false)
            setError(true)
            reset()
		} catch (err) {
			console.error('Request failed:' + err)
            setLoading(false)
            setError(true)
		}
	}


    return(
        <div className="w-full flex flex-col gap-5" style={step === 4 ? {display:'flex'} : {display:'none'}}>
            <div className="font-semibold text-2xl bg-[#ECA683] w-full flex items-center justify-center rounded-2xl py-5 sm:text-sm">
                <h2 className="gradient-text2">INFORMATIONS COMPLEMENTAIRES</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-5 text-white gap-5 max-w-[500px] place-self-center w-[90%] relative justify-center">
                <InterfaceTextInput label='Titre de votre évènement *' placeholder='Atelier création' name="title" options={{...register("title")}} commonError={errors.title} commonErrorMessage={errors.title?.message} labelStyle="text-secondary"/>
                <InterfaceTextInput label='Nombre de personne *' placeholder='Nombre maximum de participants' name="persons" options={{...register("persons")}} commonError={errors.persons} commonErrorMessage={errors.persons?.message} labelStyle="text-secondary"/>
                <InterfaceTextInput label='Prix par personne (euros) *' placeholder='Coût individuel par participant' name="price" options={{...register("price")}} commonError={errors.price} commonErrorMessage={errors.price?.message} labelStyle="text-secondary"/>
                <InterfaceTextInput label='Durée (en minutes) *' placeholder={`Durée de l'évènement en minutes`} name="duration" options={{...register("duration")}} commonError={errors.duration} commonErrorMessage={errors.duration?.message} labelStyle="text-secondary"/>
                <div className="pt-5 pb-3">
                    <ThemeProvider theme={colorTheme}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                            <TimePicker label="Heure de début de séance" value={begin} onChange={(newValue) => setBegin(newValue)} slotProps={{ textField: { required: true } }} minutesStep={15} />
                        </LocalizationProvider>
                    </ThemeProvider> 
                </div>
                <InterfaceTextArea label='Description de l’évènement *' placeholder="Renseignez-nous quelles activités vous souhaiteriez proposer : ateliers, conférences, séances..., tout en expliquant le déroulé !" name="comment" height={3}  options={{...register("comment")}} commonError={errors.comment} commonErrorMessage={errors.comment?.message} labelStyle="text-secondary"/>
                <p className="text-secondary text-justify font-semibold mt-5">Les participants effectuent leurs réservations et paiement en ligne ; ensuite, nous transférons les fonds sur votre compte, déduction faite des frais liés aux transactions en ligne (voir les conditions dans nos CGV).</p>
                {error ? <div className="text-sm text-[#d32f2f] font-medium text-center place-self-center -mb-3">Une erreur est survenue, réessayez plus tard.</div> : ''}
                <button type='submit' className='px-[45px] my-4 flex gap-3 rounded-xl py-3 bg-secondary/80 hover:bg-secondary transition-all duration-500 place-self-center'>
                    <p className='font-bold'>Valider</p>
                </button>
            </form>
        </div>
    )
  }