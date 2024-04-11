import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next'

import { Loading } from "../../utils/loader";
import { colorTheme, nobgCompletion } from "../styles/mui";

const schema = object({
    lastname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters").trim().uppercase(),
    firstname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters.").trim().uppercase(),
    emailUp:string().required("Required.").email("Invalid email.").trim().lowercase(),
    phone:string().required("Required.").matches(/^[0-9]*$/, 'Invalid phone number.'),
    country:string().required("Required.").uppercase().min(3, "Invalid country").max(30, "Invalid Country"),
    ZIPCode:string().required("Required.").matches(/^[0-9]*/, 'Invalid ZIP code.'),
    city:string().required("Required.").min(3, "Invalid city").uppercase(),
    address:string().required("Required.").uppercase(),
    passwordUp:string().required("Required.").min(8, "min. 8 characters").trim(),
    confirmPassword:string().required("Required.").oneOf([ref("passwordUp"), null], "Not identical.").trim()
}).required();

export function SignUpForm () {
    const { t } = useTranslation()
    const router = useRouter()
    const  {control, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)

    async function onSubmit(data) {
        const { firstname, lastname, phone, country, ZIPCode, city, address, emailUp, passwordUp } = data
        setLoading(true)
        try {
            const response = await fetch('/api/proxy/guest/register/', {
                method: "POST",    
                credentials: 'include', 
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
            setlogErr(!register.loggedIn)
            if(register.data) {
                router.push('/')
                setLoading(false)
                return
            }
            if(!register.loggedIn){
                router.push('#errorSignUp')
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
        <>
        {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5 scroll-mt-28" id="errorSignUp">{t('signup-connect.error')}</div> : ''}
        {loading 
            ? <Loading />
            : <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-10 relative place-self-center' id="signUp">
                <ThemeProvider theme={colorTheme}>
                <h1 className="col-span-2 font-bold -mb-5 mt-5">{t('signup-connect.shipping')}</h1>
                    <Controller name="country" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="country" type="text" 
                                            variant="standard" 
                                            label={t('signup-connect.country')} placeholder={t('signup-connect.plCountry')}
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
                                            label={t('signup-connect.ZIP')} placeholder={t('signup-connect.plZIP')}
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
                                            label={t('signup-connect.city')} placeholder={t('signup-connect.plCity')}
                                            helperText= {errors?.city ? errors?.city?.message : ""}
                                            error={errors?.city ? Boolean(true) : Boolean(false)}
                                            className="col-span-2"
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
                                            label={t('signup-connect.address')} placeholder={t('signup-connect.plAddress')}
                                            helperText= {errors?.address ? errors?.address?.message : ""}
                                            error={errors?.address ? Boolean(true) : Boolean(false)}
                                            className="col-span-2"
                                        />
                                    )}
                    />
                    <h1 className="col-span-2 font-bold -mb-5 mt-10">{t('signup-connect.personnal')}</h1>
                    <Controller name="firstname" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }}
                                            autoComplete="off"   
                                            id="firstname" type="text" 
                                            variant="standard" 
                                            label={t('signup-connect.firstname')} placeholder={t('signup-connect.plFirstname')}
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
                                        label={t('signup-connect.lastname')} placeholder={t('signup-connect.plLastname')}
                                        helperText= {errors?.lastname ? errors?.lastname?.message : ""}
                                        //if zod error change border > red
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
                                            label="Email" placeholder={t('signup-connect.plEmail')}
                                            helperText= {errors?.emailUp ? errors?.emailUp?.message : ""}
                                            error={errors?.emailUp ? Boolean(true) : Boolean(false)}
                                            className="col-span-2"
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
                                            label={t('signup-connect.phone')} placeholder={t('signup-connect.plPhone')}
                                            helperText= {errors?.phone ? errors?.phone?.message : ""}
                                            error={errors?.phone ? Boolean(true) : Boolean(false)}
                                            className="col-span-2"
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
                                            label={t('signup-connect.password')} placeholder={t('signup-connect.plPassword')}
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
                                            label={t('signup-connect.check')} placeholder={t('signup-connect.plCheck')}
                                            helperText= {errors?.confirmPassword ? errors?.confirmPassword?.message : ""}
                                            error={errors?.confirmPassword ? Boolean(true) : Boolean(false)} 
                                        />
                                    )}
                    />
                    
                    <p className='text-xs font-light col-span-2'>{t('signup-connect.terms-firstpart')} <span className='font-bold'>{t('signup-connect.terms-secondpart')}*</span>.</p>
                    <Button type="submit" variant="contained" sx={{borderRadius:0}} className="bg-black col-span-2">{t('signup-connect.button')}</Button>
                </ThemeProvider>
            </form>
        }
        </>
    )

}