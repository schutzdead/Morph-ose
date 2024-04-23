import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/utils/loader";
import {TextInput} from "@/components/forms/textInput";

import { useEffect, useMemo, useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object({
    country:string().required("Required.").uppercase().min(3, "Invalid country").max(30, "Invalid Country"),
    post_code:string().required("Required.").matches(/^[0-9]*/, 'Invalid ZIP code.'),
    city:string().required("Required.").min(3, "Invalid city").uppercase(),
    street:string().required("Required.").uppercase(),
    lastname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters").trim().uppercase(),
    firstname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters.").trim().uppercase(),
    phone:string().required("Required.").matches(/^[0-9]*$/, 'Invalid phone number.'),
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

    useEffect(() => {
        reset(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    async function onSubmit(data) {
      const { lastname, firstname, phone, country, post_code, city, street } = data
      setLoading(true)
      setError(false)
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
                    street: street,
                    post_code: post_code,
                    city: city,
                    country: country
                },
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
                    <button type='submit' className='col-span-2 place-self-center w-full mt-5 flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-2 lg:hidden'>
                        <p className='font-medium text-center'>Enregistrer</p>
                    </button>
                </ThemeProvider>
            </form>
        }
      </>
    )
}