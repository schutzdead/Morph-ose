import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {  ThemeProvider, Checkbox, InputLabel, Select, FormControl, MenuItem  } from "@mui/material";
import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext } from "@/utils/cartProvider";
import { PasswordInput, TextInput } from "../forms/textInput";

import { Loading } from "@/utils/loader";
import { colorTheme } from "../styles/mui";
import { useRouter } from "next/router";
import LogoutButton from "../logoutButton";

const schema = object({
    email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
    post_code:string().required("Requis.").matches(/^[0-9]*/, 'Code postal invalide.'),
    city:string().required("Requis.").min(3, "Ville invalide.").uppercase(),
    street:string().required("Requis.").uppercase(),
    lastname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    firstname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Téléphone invalide.'),
    bill_name:string().trim().uppercase(),
    bill_country:string().uppercase(),
    bill_post_code:string().matches(/^[0-9]*/, 'Code postal invalide.'),
    bill_city:string().uppercase(),
    bill_street:string().uppercase(),
}).required();

const schemaConnected = object({
    password:string().required("Requis.").min(8, "min. 8 caractères").trim(),
    confirmPassword:string().required("Requis.").oneOf([ref("password"), null], "Non identique.").trim(),
})

const countries = [{title:"FRANCE", id:1}, {title:"AUTRE PAYS", id:2}]

export function GuestForm ({userData, shipping_zone}) {

    const [newSchema, setNewSchema] = useState(userData ? schema : schema.concat(schemaConnected))
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ 
        resolver:  yupResolver(newSchema),
        defaultValues: useMemo(() => {
            return userData
          }, [userData])
    })
    
    const [dataCountry, setDataCountry] = useState("")
    const router = useRouter()

    useEffect(() => {
        shipping_zone(dataCountry)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCountry])

    useEffect(() => {
        userData ? setNewSchema(schema) : setNewSchema(schema.concat(schemaConnected))
        reset(userData)
        if(userData?.address?.country) setDataCountry(userData.country) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState(null)

    const { cart } = useContext(CartContext)

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    async function onSubmit(data) {
        if(!dataCountry) return
        const { email, lastname, firstname, phone, password, post_code, city, street, bill_city, bill_country, bill_name, bill_post_code, bill_street } = data
        setLoading(true)
        setError(false)
        setEmailError(null)
        try {
            if(!userData || userData === undefined || userData === null) {
                const signUp = await fetch(`api/proxy/guest/register`, {
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
                        password:password,
                        address:{
                            street:street,
                            post_code:post_code,
                            city:city,
                            country:dataCountry
                        }
                    })
                })               
                if(signUp.status !== 200) {
                    const responseSignUp = await signUp.json()
                    if(responseSignUp?.message){
                        setEmailError(responseSignUp?.message)
                    }
                    setError(true)
                    setLoading(false)
                    return
                }
            }
            const response = await fetch('/api/proxy/orders', {
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
                    shipping_address:{
                        street: street,
                        post_code: post_code,
                        city: city,
                        country: dataCountry === 'FRANCE' ? 'FR' : 'FOREIGN'
                    },
                    billing_address:{
                        firstname: bill_name || lastname,
                        street: bill_street || street,
                        post_code: bill_post_code || post_code,
                        city: bill_city || city,
                        country: bill_country || dataCountry
                    },
                    products:
                        cart.map((product) => 
                            ({
                                id: product.id,
                                quantity: product.quantity,
                            })
                        ),
                    cancel_url:`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`,
                    success_url:`${process.env.NEXT_PUBLIC_SITE_URL}/thanks`
                })
            })
            
            const register = await response.json()
            
            if(response.status === 200)  { 
                const url = await register.stripe_session.url
                location.assign(url)
                setLoading(false)
                return
            }
            setLoading(false)
            setError(true)
        } catch (err) {
            setLoading(false)
            setError(true)
            console.error('Request failed:' + err.message)
        }
    }

    return(
        <>
        {loading 
            ? <Loading />
            : 
            <form onSubmit={handleSubmit(onSubmit)} id="guestForm" className='w-full grid grid-cols-2 gap-5 relative place-self-center'>
                {error ? <div className='col-span-2 text-red-500 place-self-center'>{emailError ? emailError : `Erreur, veuillez réessayer plus tard.`}</div>: ''}
             
                <ThemeProvider theme={colorTheme}>
                    <Controller name="email" control={control} defaultValue=''
                                render={({field}) => (
                                        <TextInput field={field} name='email' label='Email' placeholder="Entrez votre email" errors={errors?.email} style="col-span-2"/>
                                )}
                    />
                    <div style={!userData ? {display:'none'} : {display:'block'}}>
                        <LogoutButton />    
                    </div>
                    <div style={userData ? {display:'none'} : {display:'block'}}>
                        <Controller name="password" control={control} defaultValue=''
                                    render={({field}) => (
                                            <PasswordInput field={field} name='password' secureTextEntry={true} label='Mot de passe' placeholder="Entrez votre mot de passe" errors={errors?.password}/>
                                    )}
                        />
                        </div>
                        <div style={userData ? {display:'none'} : {display:'block'}}>
                            <Controller name="confirmPassword" control={control} defaultValue=''
                                        render={({field}) => (
                                                <PasswordInput field={field} name='confirmPassword' secureTextEntry={true} label='Confirmation' placeholder="Confirmez votre mot de passe" errors={errors?.confirmPassword}/>
                                        )}
                            />
                        </div>
                    <h1 className="col-span-2 -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">Informations de livraison</h1>
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
                    <ThemeProvider theme={colorTheme}>
                        <FormControl sx={{width:'100%', marginTop:'20px'}}>
                            <InputLabel>Pays</InputLabel>
                            <Select label="Pays" defaultValue="" required
                                    value={dataCountry} onChange={(event) => setDataCountry(event.target.value)}
                            >
                            {countries.map((name) => (<MenuItem key={name?.id} value={name?.title}>{name?.title}</MenuItem>))}
                            </Select>
                        </FormControl> 
                    </ThemeProvider>
                    <h1 className="col-span-2 -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">Informations personnelles</h1>
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
                    <div className="text-xs flex items-center col-span-2">
                        <Checkbox size="small" checked={checked} onChange={handleChange} />
                        <p>{`L'adresse de livraison est différente de celle pour la facturation.`}</p>
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
                    <button type='submit' className='px-[40px] col-span-2 w-fit mt-5 flex gap-3 place-self-center rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 lg:hidden'>
                        <p className='font-medium text-center'>Continuer</p>
                    </button>
                    <p className="text-xs col-span-2 place-self-center lg:hidden">* En continuant vous acceptez nos conditions générales de ventes</p>
                </ThemeProvider>
            </form>
        }
        </>
    )
}