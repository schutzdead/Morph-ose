import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@mui/material";
import { TextInput } from '@/components/forms/textInput';
import { colorTheme } from '@/components/styles/mui';
import { useEffect, useMemo, useState } from 'react';
import { H2Title } from '../littleComponents';
import { AddFile } from "./addFiles";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import fr from 'date-fns/locale/fr';
import parseISO from "date-fns/parseISO";

export default function NewWorkshop({setLoading, formResolver, validationButton, api, searchTutorData,setSearchTutorData}) {

    formResolver.defaultValues = useMemo(() => {
        return searchTutorData
    }, [searchTutorData])
    
    const {reset, control, handleSubmit, formState: {errors}} = useForm(formResolver)
    const [docId, setDocId] = useState([])
    const [error, setError] = useState(false)
    const [begin, setBegin] = useState(parseISO("0"));

    useEffect(() => {
        if(searchTutorData) {
            reset(searchTutorData)
            setDocId([])
            setBegin(new Date(searchTutorData?.date))
            if(searchTutorData?.image?.id) {
                setDocId([searchTutorData?.image])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTutorData])

    async function onSubmit(data) {
        const { title, price, duration, entries_available } = data
        setError(false)
        setLoading(true)
        try {
            const response = await fetch(`/api/proxy/${api}`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title:title,
                    price:price,
                    duration:duration,
                    entries_available:entries_available,
                    date:new Date(begin).toISOString(),
                    image_id:docId[0] ? docId[0].id : null,
                })
            })
            console.log(response);
            const register = await response.json()
            console.log(register);
            if(response.status === 200){
                setLoading(false)
                if(searchTutorData){
                    for(const property in register) {
                    if(register[property] === null) {
                            register[property] = ''
                        }
                    }
                    setSearchTutorData({...register})
                }
                return
            }
            setError(true)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(true)
            console.error('Request failed:' + err.message)
        }
    }

    return( 
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full" >
        <ThemeProvider theme={colorTheme}>
            <section className='w-full gap-5 bg-white py-5 px-5 grid grid-cols-4 justify-items-center rounded-xl shadow-xl xl:grid-cols-3 sm:grid-cols-2 2sm:grid-cols-1'>     
                <H2Title title="Informations générales" />
                <Controller name="title" control={control} defaultValue=""
                    render={({field}) => (
                            <TextInput field={field} label="Nom de l'évènement" placeholder='Atelier création' errors={errors?.title} style="w-full xl:col-span-3 sm:col-span-2 2sm:col-span-1"/>
                )}/>    
                <Controller name="price" control={control} defaultValue=""
                    render={({field}) => (
                            <TextInput field={field} label='Prix' placeholder='39.99' errors={errors?.price} style="w-full"/>
                )}/>  
                <ThemeProvider theme={colorTheme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                        <DateTimePicker disablePast label="Date de la séance" value={begin} onChange={(newValue) => setBegin(newValue)} slotProps={{ textField: { required: true } }} minutesStep={15} />
                    </LocalizationProvider>
                </ThemeProvider>   
                <Controller name="duration" control={control} defaultValue=""
                    render={({field}) => (
                        <TextInput field={field} label='Durée' placeholder='60' errors={errors?.duration} style="w-full"/>
                    )}/>    
                <Controller name="entries_available" control={control} defaultValue=""
                    render={({field}) => (
                        <TextInput field={field} label="Nombre d'entrée" placeholder='20' errors={errors?.entries_available} style="w-full"/>
                    )}/>    
            </section>

            <section className="w-full gap-5 bg-white py-5 px-5 flex flex-col rounded-xl shadow-xl">     
                <H2Title title="Photos du produit" />
                <AddFile fileType='Photo' docId={docId} setDocId={setDocId} />
            </section>

            <section className="place-self-end">
                {error ? <div className='col-span-4 justify-self-end text-red-500 self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>{`Erreur (contactez un développeur)`}</div>: ''}
                <div className='flex gap-3 col-span-4 justify-self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>
                    <button onClick={() => {setDocId([]); reset({title:'', price:'', promo_price:'', reference:'', stock:'', vat_percent:'', description:'', big_description:''});}} className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>Vider les champs</p>
                    </button>
                    <button type='submit' className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>{validationButton}</p>
                    </button>
                </div>
            </section>
        </ThemeProvider>
    </form>
    )
}


