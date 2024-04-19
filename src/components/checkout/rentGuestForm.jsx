import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {  ThemeProvider, Checkbox } from "@mui/material";
import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext } from "@/utils/cartProvider";
import { TextInput } from "../forms/textInput";

import { Loading } from "@/utils/loader";
import { colorTheme } from "../styles/mui";

const schema = object({
    email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
    lastname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    firstname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Téléphone invalide.'),

    company:string().required("Requis."),
    siret:string().matches(/^[0-9]*$/, 'Siren non valide.').max(14, 'Siren non valide.').min(14, 'Siren non valide.'),
    activity:string().required("Requis."),

    bill_name:string().trim().uppercase(),
    bill_country:string().uppercase(),
    bill_post_code:string().matches(/^[0-9]*/, 'Code postal invalide.'),
    bill_city:string().uppercase(),
    bill_street:string().uppercase(),
}).required();

export function RentGuestForm ({userData, rent}) { 
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ 
        resolver:  yupResolver(schema),
        defaultValues: useMemo(() => {
            return userData
          }, [userData])
    })

    useEffect(() => {
        reset(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false);
    const { cart } = useContext(CartContext)

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    async function onSubmit(data) {
        const { email, lastname, firstname, phone, company, siret, activity, bill_city, bill_country, bill_name, bill_post_code, bill_street } = data
        setLoading(true)
        try {
            const response = await fetch(`/api/proxy/auth/room-rentals/reservations/${rent.id}/order`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    phone:phone,
                    company_name:company,
                    company_siret:siret,
                    company_type:activity,
                    billing_address:{
                        firstname: bill_name || '',
                        street: bill_street || '',
                        post_code: bill_post_code || '',
                        city: bill_city || '',
                        country: bill_country || ''
                    }
                })
            })
            console.log(response);
            const register = await response.json()
            console.log(register);
            const url = await register.stripe_session.url
            if(response.status === 200)  { 
                location.assign(url)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }
    
    return(
        <>
        {loading 
            ? <Loading />
            : 
            <form onSubmit={handleSubmit(onSubmit)} id="guestForm" className='w-full grid grid-cols-2 gap-5 relative place-self-center'>
                <ThemeProvider theme={colorTheme}>
                    <Controller name="email" control={control} defaultValue=''
                                render={({field}) => (
                                        <TextInput field={field} name='email' label='Email' placeholder="Entrez votre email" errors={errors?.email} style="col-span-2"/>
                                )}
                    />
                    <h1 className="col-span-2 -mb-2 mt-10 font-bold text-[13px] text-gray-600 md:mt-4">Informations professionnelle</h1>
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
                                    <TextInput field={field} name='phone' label="Téléphone" placeholder="Entrez votre téléphone" errors={errors?.phone} style="col-span-2" /> 
                                )}
                    />                 
                    <h1 className="col-span-2 -mb-2 mt-10 font-bold text-[13px] text-gray-600 md:mt-4">Informations professionnelle</h1>
                    <Controller name="company" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='company' label="Nom de la société" placeholder="Entrez le nom de votre société" errors={errors?.company} />
                                )}
                    />
                    <Controller name="siret" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='siret' label="N° SIRET" placeholder="Exemple : 12345678900000" errors={errors?.siret} />
                                )}
                    />
                    <Controller name="activity" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='activity' label="Type d'activité" placeholder="Entrez le type d'activité de votre société" errors={errors?.activity} style="col-span-2" /> 
                                )}
                    />                    
                    <div className="text-xs flex items-center col-span-2">
                        <Checkbox size="small" checked={checked} onChange={handleChange} />
                        <p>{`Adresse de pour la facturation.`}</p>
                    </div>
                    {checked ?
                    <> 
                        <h1 className="col-span-2 -mb-2 mt-5 font-bold text-[13px] text-gray-600 md:mt-4">Adresse de facturation</h1>
                        <Controller name="bill_name" control={control} defaultValue=""
                                    render={({field}) => (
                                            <TextInput field={field} name='bill_name' label="Entreprise / Nom" placeholder="Entrer votre nom ou celui de votre entreprise" errors={errors?.bill_name} style="col-span-2" />
                                    )}
                        />
                        <Controller name="bill_country" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_country' label="Pays" placeholder="Entrez votre pays" errors={errors?.bill_country} /> 
                                    )}
                        />
                        <Controller name="bill_post_code" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_post_code' label="Code postal" placeholder="Entrez votre code postal" errors={errors?.bill_post_code} /> 
                                    )}
                        />
                        <Controller name="bill_city" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_city' label="Ville" placeholder="Entrez votre ville" errors={errors?.bill_city} /> 
                                    )}
                        />
                        <Controller name="bill_street" control={control} defaultValue=""
                                    render={({field}) => (
                                            <TextInput field={field} name='bill_street' label="Adresse" placeholder="Entrez votre adresse" errors={errors?.bill_street} style="col-span-2" /> 
                                    )}
                        />
                    </>
                    : ''}
                    <button type='submit' className='px-[25px] col-span-1 col-start-2 w-full mt-5 flex gap-3 place-self-end rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 lg:hidden'>
                        <p className='font-medium text-center'>Continuer</p>
                    </button>
                </ThemeProvider>
            </form>
        }
        </>
    )
}