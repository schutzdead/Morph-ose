import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ThemeProvider, CircularProgress } from "@mui/material";
import { TextInput, CustomTextArea } from '@/components/forms/textInput';
import { colorTheme } from '@/components/styles/mui';
import { useEffect, useMemo, useState } from 'react';
import { H2Title } from '../littleComponents';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function NewProduct ({setSearchResult, searchResult, setLoading, formResolver, validationButton, api, searchTutorData,setSearchTutorData}) {
    formResolver.defaultValues = useMemo(() => {
        return searchTutorData
    }, [searchTutorData])
    const {reset, control, handleSubmit, formState: {errors}} = useForm(formResolver)

    const [dataDisciplines, setDataDisciplines] = useState([])
    const [birth, setBirth] = useState();
    const [formationsLink, setFormationsLink] = useState([])
    const [submitLoading, setSubmitLoading] = useState(false)
    const [docId, setDocId] = useState([])

    const [targetFile, setTargetFile] = useState()
    const [currentType, setCurrentType] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        uploadFile(targetFile, currentType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetFile, currentType])

    useEffect(() => {
        if(searchTutorData) {
            searchTutorData.street ? '' : searchTutorData.street = ''
            searchTutorData.city ? '' : searchTutorData.city = ''
            searchTutorData.post_code ? '' : searchTutorData.post_code = ''
            reset(searchTutorData)
            setDataDisciplines(searchTutorData?.disciplines)
            setBirth(parseISO(searchTutorData?.birth_date))
            setFormationsLink(searchTutorData?.formations?.map(e =>({id:e.id, title:e.title})))
            setDocId([])
            if(searchTutorData?.files?.length > 0) {
                for(let file of searchTutorData?.files){
                    setDocId((previous) => [...previous, {id:file.id, title:file?.pivot.title, download_url:file.download_url}])
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTutorData])

    async function uploadFile(e, fileT){
        const formData = new FormData();
        if(e?.target?.files?.length > 0) {
            formData.append("file[]", e?.target?.files[0]);
        } else {    
            return
        }
        setSubmitLoading(true)
        
        try {
            const form = await fetch(`${API_URL}/api/files/upload`, {method: "POST", mode: "cors", body: formData})
            const register = await form.json()
            setDocId([
                ...docId?.filter(file => file?.title !== fileT),
                {id:register[0].id, url:register[0].download_url, title:fileT}
            ])
            setSubmitLoading(false)
        } catch (err) {
            setSubmitLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    async function onSubmit(data) {

        const { title, price, description, reference } = data
        data.birth = new Date(birth);
        let newObj = {}
        for(let file of docId) {
            newObj[file.id] = {title: file.title}
        }
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
                    reference:reference,
                    image:newObj,
                    description:description,
                })
            })
            const register = await response.json()
            if(register.message || response.status !== 200){
                setLoading(false)
                setError(true)
                return
            }
            if(searchTutorData){
                for(const property in register) {
                if(register[property] === null) {
                        register[property] = ''
                    }
                }
                setSearchTutorData({...register.address, ...register})
                setDataDisciplines(searchTutorData?.disciplines)
                setFormationsLink(searchTutorData?.formations?.map(e =>({id:e.id, title:e.title})))
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(true)
            console.error('Request failed:' + err.message)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='w-full gap-5 bg-white py-5 px-5 grid grid-cols-4 justify-items-center rounded-xl shadow-xl xl:grid-cols-[1fr_1fr_1fr] sm:grid-cols-2 2sm:grid-cols-1'>
        <ThemeProvider theme={colorTheme}>
            <>     
            <H2Title title="Informations générales" />
            <Controller name="title" control={control} defaultValue=""
                render={({field}) => (
                        <TextInput field={field} label='Nom du produit' placeholder='Collier en argent' errors={errors?.title} style="w-full"/>
            )}/>    
            <Controller name="price" control={control} defaultValue=""
                render={({field}) => (
                        <TextInput field={field} label='Prix' placeholder='10.99' errors={errors?.price} style="w-full"/>
            )}/>    
            <Controller name="reference" control={control} defaultValue=""
                render={({field}) => (
                    <TextInput field={field} label='Référence' placeholder='125286' errors={errors?.reference} style="w-full"/>
                )}/>    
                <Controller name="description" control={control} defaultValue=""
                                render={({field}) => (
                                    <CustomTextArea field={field} label='Description' errors={errors?.description} style="w-full col-span-4" />
                    )}/>   
            </>
            {error ? <div className='col-span-4 justify-self-end text-red-500 self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>{`Erreur (contactez un développeur)`}</div>: ''}
            {submitLoading ? 
                <div className='flex items-center justify-start col-span-4 justify-self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>
                    <CircularProgress size="1.5rem"/>
                </div>
            :
                <div className='flex gap-3 col-span-4 justify-self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>
                    <button onClick={() => {setDataDisciplines([]); setBirth();setDocId([]); setFormationsLink([]); reset({firstname:'', lastname:'', email:'', phone:'', city:'', street:'', post_code:''});}} className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>Vider les champs</p>
                    </button>
                    <button type='submit' className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>{validationButton}</p>
                    </button>
                </div>
            }
        </ThemeProvider>
    </form>
    )
}


