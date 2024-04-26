import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/utils/loader";
import {TextInput} from "@/components/forms/textInput";

import { useEffect, useMemo, useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { AddPDF } from "../forms/addFiles";

const schema = object({
    country:string().uppercase().nullable(true),
    post_code:string().matches(/^[0-9]*/, 'Code postal invalide').nullable(true),
    city:string().nullable(true),
    street:string().uppercase().nullable(true),
    lastname:string().required("Requis.").min(3, "3 à 16 caractères").max(16, "3 à 16 caractères").trim().uppercase(),
    firstname:string().required("Requis.").min(3, "3 à 16 caractères").max(16, "3 à 16 caractères").trim().uppercase(),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Invalid phone number.'),
    company_name:string(),
    company_siret:string().matches(/^[0-9]*$/, 'Siret non valide.').max(14, 'Siret non valide.').min(14, 'Siret non valide.'),
    company_type:string(),
}).required();

export default function PersonalForm ({userData}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ 
      resolver: yupResolver(schema),
      defaultValues: useMemo(() => {
        return userData
      }, [userData])
    })

    const [docId, setDocId] = useState([])
    useEffect(() => {
        reset(userData)
        setDocId([])
        if(userData?.files[0]?.id) {
            setDocId([{id:userData?.files[0]?.id, url:userData?.files[0]?.download_url}])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])


    async function onSubmit(data) {
      const { lastname, firstname, phone, country, post_code, city, street, company_type, company_siret, company_name } = data
      setLoading(true)
      setError(false)
      let newObj = {}
      for(let file of docId) {
          newObj[file.id] = {title: 'RIB importé'}
      }
      try {
        const response = await fetch('/api/proxy/auth/users/current', {
            method: "POST",    
            mode: "cors",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstname:firstname,
                lastname:lastname,
                phone:phone,
                address:{
                    street: street || '',
                    post_code: post_code || '',
                    city: city || '',
                    country: country || ''
                },
                company_name:company_name,
                company_siret:company_siret,
                company_type:company_type,
                files:newObj,
            })
        })
        if(response.status !== 200){
            setError(true)
            setLoading(false)
        }
        const register = await response.json()
        const newUser = register.user
        for(const property in newUser) {
        if(data[property] === null) {
            data[property] = ''
            }
        }
        const normalizeUser = {...newUser.address, ...newUser}
        setLoading(false)
        reset(normalizeUser)
      } catch (err) {
        setError(true)
        setLoading(false)
        console.error('Request failed:' + err.message)
      }
  }
    return(
      <>
        {loading 
            ? <Loading />
            : 
            <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-5'>
                {error ? <div className='col-span-2 text-red-500 place-self-center'>{`Erreur, veuillez réessayer plus tard.`}</div>: ''}
                <ThemeProvider theme={colorTheme}>
                <h1 className="font-semibold text-lg sm:text-base text-secondary col-span-2">Informations de livraison</h1>
                    <Controller name="country" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='country' label="Pays" placeholder="Entrez votre pays" errors={errors?.country} /> 
                                )}
                    />
                    <Controller name="post_code" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='post_code' label="Code postal" placeholder="Entrez votre code postal" errors={errors?.post_code} /> 
                                )}
                    />
                    <Controller name="city" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='city' label="Ville" placeholder="Entrez votre ville" errors={errors?.city} /> 
                                )}
                    />
                    <Controller name="street" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='street' label="Adresse complète" placeholder="Entrez votre adresse complète" errors={errors?.street} style="col-span-2" /> 
                                )}
                    />
                    <h1 className="font-semibold text-lg sm:text-base text-secondary mt-10 col-span-2">Informations personnelles</h1>
                    <Controller name="firstname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='firstname' label="Prénom" placeholder="Entrez votre prénom" errors={errors?.firstname} />
                                )}
                    />
                    <Controller name="lastname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='lastname' label="Nom" placeholder="Entrez votre nom" errors={errors?.lastname} />
                                )}
                    />
                    <Controller name="phone" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='phone' label="Téléphone" placeholder="0123456789" errors={errors?.phone} style="col-span-2" /> 
                                )}
                    />    
                    <h1 className="font-semibold text-lg sm:text-base text-secondary mt-10 col-span-2">Informations professionnelles</h1>
                    <Controller name="company_name" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='company_name' label="Nom d'entreprise" placeholder="Entrez le nom de votre entreprise" errors={errors?.company_name} /> 
                                )}
                    />
                    <Controller name="company_siret" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='company_siret' label="SIRET" placeholder="Entrez votre numéro SIRET" errors={errors?.company_siret} /> 
                                )}
                    />
                    <Controller name="company_type" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='company_type' label="Type d'activité" placeholder="Entrez le type de votre activité" errors={errors?.company_type} /> 
                                )}
                    />        
                    <div className="col-span-2">
                        <AddPDF fileType='RIB' docId={docId} setDocId={setDocId} />  
                    </div>    
                    <button type='submit' className='col-span-2 place-self-center w-full mt-5 flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-2'>
                        <p className='font-medium text-center'>Enregistrer</p>
                    </button>
                </ThemeProvider>
            </form>
        }
      </>
    )
}