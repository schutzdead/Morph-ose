import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "@/utils/loader";
import { colorTheme, nobgCompletion } from "../styles/mui";

export const schemaSignUp = object({
    lastname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères").trim().uppercase(),
    firstname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    emailUp:string().required("Requis.").email("Invalid email.").trim().lowercase(),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Téléphone invalide.'),
    country:string().required("Requis.").uppercase().min(3, "Pays invalide").max(30, "Pays invalide"),
    ZIPCode:string().required("Requis.").matches(/^[0-9]*/, 'Code postal invalide.'),
    city:string().required("Requis.").min(3, "Ville invalide").uppercase(),
    address:string().required("Requis.").uppercase(),
    passwordUp:string().required("Requis.").min(8, "min. 8 caractères").trim(),
    confirmPassword:string().required("Requis.").oneOf([ref("passwordUp"), null], "Non identique.").trim()
}).required();

export function SignUpForm () {
    const router = useRouter()
    const  {control, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schemaSignUp)})
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)

    async function onSubmit(data) {
        const { firstname, lastname, phone, country, ZIPCode, city, address, emailUp, passwordUp } = data
        setLoading(true)
        try {
            const response = await fetch(`api/proxy/guest/register`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    firstname:firstname, 
                    lastname:lastname, 
                    email:emailUp, 
                    phone:phone, 
                    password:passwordUp,
                    address:{
                        street:address,
                        post_code:ZIPCode,
                        city:city,
                        country:country
                    }
                })
            })
            const register = await response.json()
            if(response.status === 200) {
                router.push('/client')
                setLoading(false)
                return
            }
            setlogErr(!register.loggedIn)
            setLoading(false)
            router.push('#errorSignUp')
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
        <>
        {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5 scroll-mt-28" id="errorSignUp">Une erreur est survenue</div> : ''}
        {loading 
            ? <Loading />
            : <form onSubmit={handleSubmit(onSubmit)} className='w-full text-secondary grid grid-cols-2 gap-10 relative place-self-center sm:grid-cols-1' id="signUp">
                <ThemeProvider theme={colorTheme}>
                    <h1 className="col-span-2 sm:col-span-1 font-bold -mb-5 mt-5">Informations de livraison</h1>
                    <Controller name="country" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="country" type="text" 
                                            variant="standard" 
                                            label="Pays" placeholder="Entrez votre pays"
                                            helperText= {errors?.country ? errors?.country?.message : ""}
                                            error={errors?.country ? Boolean(true) : Boolean(false)}
                                        />
                                    )}
                    />
                    <Controller name="ZIPCode" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="ZIPCode" type="text" 
                                            variant="standard" 
                                            label="Code postal" placeholder="Entrez votre code postal"
                                            helperText= {errors?.ZIPCode ? errors?.ZIPCode?.message : ""}
                                            error={errors?.ZIPCode ? Boolean(true) : Boolean(false)}
                                        />
                                    )}
                                    />
                    <Controller name="city" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                        inputProps={{ style: nobgCompletion }} 
                                        autoComplete="off" 
                                            id="city" type="text" 
                                            variant="standard" 
                                            label="Ville" placeholder="Entrez le nom de votre ville"
                                            helperText= {errors?.city ? errors?.city?.message : ""}
                                            error={errors?.city ? Boolean(true) : Boolean(false)}
                                            className="col-span-2 sm:col-span-1"
                                        />
                                    )}
                    />
                    <Controller name="address" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            multiline
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="address" type="text" 
                                            variant="standard" 
                                            label="Adresse complète" placeholder="Entrez adresse complète"
                                            helperText= {errors?.address ? errors?.address?.message : ""}
                                            error={errors?.address ? Boolean(true) : Boolean(false)}
                                            className="col-span-2 sm:col-span-1"
                                        />
                                    )}
                    />
                    <h1 className="col-span-2 sm:col-span-1 font-bold -mb-5 mt-10">Information personnelles</h1>
                    <Controller name="firstname" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }}
                                            autoComplete="off"   
                                            id="firstname" type="text" 
                                            variant="standard" 
                                            label="Prénom" placeholder="Entrez votre prénom"
                                            helperText= {errors?.firstname ? errors?.firstname?.message : ""}
                                            error={errors?.firstname ? Boolean(true) : Boolean(false)} 
                                        />
                                    )}
                    />
                    <Controller name="lastname" control={control} defaultValue=""
                            render={
                                ({field}) => (
                                    <TextField {...field}
                                        inputProps={{ style: nobgCompletion }} 
                                        autoComplete="off" 
                                        id="lastname" type="text" 
                                        variant="standard" 
                                        label="Nom" placeholder="Entrez votre nom"
                                        helperText= {errors?.lastname ? errors?.lastname?.message : ""}
                                        error={errors?.lastname ? Boolean(true) : Boolean(false)} 
                                    />
                                )}
                    />
                    <Controller name="emailUp" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="emailUp" type="text" 
                                            variant="standard" 
                                            label="Email" placeholder="Entrez votre email"
                                            helperText= {errors?.emailUp ? errors?.emailUp?.message : ""}
                                            error={errors?.emailUp ? Boolean(true) : Boolean(false)}
                                            className="col-span-2 sm:col-span-1"
                                        />
                                    )}
                    />
                    <Controller name="phone" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="phone" type="text" 
                                            variant="standard" 
                                            label="Téléphone" placeholder="Entrez votre numéro de téléphone"
                                            helperText= {errors?.phone ? errors?.phone?.message : ""}
                                            error={errors?.phone ? Boolean(true) : Boolean(false)}
                                            className="col-span-2 sm:col-span-1"
                                        />
                                    )}
                    />
                    <Controller name="passwordUp" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }}  
                                            id="passwordUp" type="password" 
                                            variant="standard" 
                                            label="Mot de passe" placeholder="Entrez votre mot de passe"
                                            helperText= {errors?.passwordUp ? errors?.passwordUp?.message : ""}
                                            error={errors?.passwordUp ? Boolean(true) : Boolean(false)}
                                        />
                                    )}
                    />
                    <Controller name="confirmPassword" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }}  
                                            id="confirmPassword" type="password" 
                                            variant="standard" 
                                            label="Confirmation" placeholder="Confirmez votre mot de passe"
                                            helperText= {errors?.confirmPassword ? errors?.confirmPassword?.message : ""}
                                            error={errors?.confirmPassword ? Boolean(true) : Boolean(false)} 
                                        />
                                    )}
                    />
                    
                    <p className='text-xs font-light col-span-2 sm:col-span-1'>En vous enregistrant, vous agréez aux <span className='font-bold cursor-pointer'>politiques de confidentialité et des cookies*</span>.</p>
                    <button type='submit' className='px-[25px] col-span-2 flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 sm:px-0 sm:col-span-1'>
                            <p className='font-medium text-center'>Inscription</p>
                    </button>
                </ThemeProvider>
            </form>
        }
        </>
    )

}