import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ThemeProvider, Checkbox, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { TextInput, CustomTextArea } from '@/components/forms/textInput';
import { colorTheme } from '@/components/styles/mui';
import { useEffect, useMemo, useState } from 'react';
import { H2Title } from '../littleComponents';
import { AddFiles } from "./addFiles";

export default function NewProduct ({setLoading, formResolver, validationButton, api, searchTutorData,setSearchTutorData, all_categories}) {
    
    const [dataCategory, setDataCategory] = useState([])
    const handleChangeCat = (event) => {
        setDataCategory(event.target.value);
    };

    formResolver.defaultValues = useMemo(() => {
        return searchTutorData
    }, [searchTutorData])
    
    const {reset, control, handleSubmit, formState: {errors}} = useForm(formResolver)
    const [docId, setDocId] = useState([])
    const [error, setError] = useState(false)
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    useEffect(() => {
        if(searchTutorData) {
            reset(searchTutorData)
            // setDocId([])
            searchTutorData?.is_published ? setChecked(true) : setChecked(false)
            setDataCategory(searchTutorData?.categories.map(c => c.id))
            if(searchTutorData?.images?.length > 0) {
                setDocId(searchTutorData?.images)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTutorData])

    async function onSubmit(data) {
        const { title, price, description, reference, big_description, stock, vat_percent, promo_price } = data
        let newObj = {}
        let order_pos = 0
        for(let file of docId) {
            newObj[file.id] = {order:order_pos}
            order_pos += 1
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
                    stock:stock,
                    is_published:checked,
                    vat_percent:vat_percent,
                    promo_price:promo_price,
                    images:newObj,
                    description:description,
                    big_description:big_description,
                    categories:dataCategory
                })
            })
            const register = await response.json()
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
                <Controller name="title" disabled control={control} defaultValue=""
                    render={({field}) => (
                            <TextInput field={field} disabled label='Nom du produit'  placeholder='Collier en argent' errors={errors?.title} style="w-full xl:col-span-3 sm:col-span-2 2sm:col-span-1"/>
                )}/>    
                <Controller name="price" disabled control={control} defaultValue=""
                    render={({field}) => (
                            <TextInput field={field} disabled label='Prix' placeholder='10.99' errors={errors?.price} style="w-full"/>
                )}/>
                <Controller name="promo_price" disabled control={control} defaultValue=""
                    render={({field}) => (
                            <TextInput field={field} disabled label='Prix promotion' placeholder='5.99' errors={errors?.promo_price} style="w-full"/>
                )}/>    
                <Controller name="reference" disabled control={control} defaultValue=""
                    render={({field}) => (
                        <TextInput field={field} disabled label='Référence' placeholder='125286' errors={errors?.reference} style="w-full"/>
                    )}/>    
                <Controller name="stock" disabled control={control} defaultValue=""
                    render={({field}) => (
                        <TextInput field={field} disabled label='Stock' placeholder='20' errors={errors?.stock} style="w-full"/>
                    )}/>    
                <Controller name="vat_percent" disabled control={control} defaultValue=""
                    render={({field}) => (
                        <TextInput field={field} disabled label='TVA' placeholder='5.5' errors={errors?.vat_percent} style="w-full"/>
                    )}/>    
                <Controller name="description" disabled control={control} defaultValue="" render={({field}) => (
                    <CustomTextArea field={field} disabled label='Petite description' errors={errors?.description} style="w-full col-span-4 xl:col-span-3 sm:col-span-2 2sm:col-span-1" />
                )}/>   
                <Controller name="big_description" disabled control={control} defaultValue="" render={({field}) => (
                    <CustomTextArea field={field} disabled label='Grande description' errors={errors?.big_description} style="w-full col-span-4 xl:col-span-3 sm:col-span-2 2sm:col-span-1" />
                )}/>
                <FormControl sx={{width:'100%'}}>
                    <InputLabel>Sous-catégorie</InputLabel>
                    <Select label="Sous-catégorie" required multiple
                            value={dataCategory} onChange={handleChangeCat}
                    >
                    {all_categories?.map((name, index) => (<MenuItem key={index} value={name.id}>{name.title}</MenuItem>))}
                    </Select>
                </FormControl>    
                <div className="flex items-center place-self-start col-span-4 xl:col-span-3 sm:col-span-2 2sm:col-span-1">
                    <Checkbox size="small" checked={checked} onChange={handleChange} />
                    <p className="font-medium text-secondary">Publier en ligne directement</p>
                </div>  
            </section>

            <section className="w-full gap-5 bg-white py-5 px-5 flex flex-col rounded-xl shadow-xl">     
                <H2Title title="Photos du produit" />
                <AddFiles fileType='Photo' docId={docId} setDocId={setDocId} />
            </section>

            <section className="place-self-end">
                {error ? <div className='col-span-4 justify-self-end text-red-500 self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>{`Erreur (contactez un développeur)`}</div>: ''}
                <div className='flex gap-3 col-span-4 justify-self-end xl:col-span-3 sm:col-span-2 2sm:col-span-1'>
                    {/* <button onClick={() => {reset({title:'', price:'', promo_price:'', reference:'', stock:'', vat_percent:'', description:'', big_description:''});}} className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>Vider les champs</p>
                    </button> */}
                    <button type='submit' className='font-semibold rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white px-3 py-2 text-sm bg-secondary sm:text-xs sm:py-1.5 sm:gap-0 sm:px-2 sm:font-medium'>
                        <p>{validationButton}</p>
                    </button>
                </div>
            </section>
        </ThemeProvider>
    </form>
    )
}


