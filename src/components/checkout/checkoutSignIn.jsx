import { useState } from "react";
import { Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {  TextField, ThemeProvider} from "@mui/material";

import { colorTheme, nobgCompletion } from "../styles/mui";
import { Loading } from "@/utils/loader";
import { ForgotPassword } from "../forgotPassword";
import { lock } from "@/utils/lockScreen";

const schema = object({
    emailIn:string().required("Required.").email("Invalid email."),
    passwordIn:string().required("Required.").min(4,"Invalid password."),
}).required();

export function CheckoutSignIn ({setUserData}) {
    const [forgotCard, setForgotCard] = useState(false)

    const [loading, setLoading] = useState(false)
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})

    const [logErr, setlogErr] = useState(false)

    async function onSubmit(data) {
        setLoading(true)
        const { emailIn, passwordIn } = data
		try {
            const response = await fetch('/api/proxy/guest/authentication/', {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailIn, password:passwordIn })
            })
            const data = await response.json()
            setlogErr(!data.data)
            if(data.data) {
                for(const property in data.data) {
                    if(data.data[property] === null) {
                        data.data[property] = ''
                    }
                }
                setUserData({...data.data.address, ...data.data})
                setLoading(false)
                return
            }
            setLoading(false)
            reset({emailIn:emailIn, passwordIn:''})
		} catch (err) {
			console.error('Request failed:' + err)
		}
	}

    return (
        <>
            <ForgotPassword forgotCard={forgotCard} setForgotCard={setForgotCard} user_type="client" />
            {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5">Identifiant ou mot de passe incorrect.</div> : ''}
            {loading 
                ? <Loading />
                : 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative justify-center">
                    <ThemeProvider theme={colorTheme}>
                        <Controller name="emailIn" control={control} defaultValue=""
                                    render={
                                        ({field}) => (
                                            <TextField {...field}
                                                inputProps= {{ style: nobgCompletion }}
                                                id="emailIn" type="text"
                                                variant="standard"
                                                label='Email' placeholder="Entrez votre email"
                                                helperText= {errors?.emailIn ? errors?.emailIn?.message : ""}
                                                error={errors?.emailIn ? Boolean(true) : Boolean(false)}
                                            />
                                        )}
                        />
                        <Controller name="passwordIn" control={control} defaultValue=""
                                    render={
                                        ({field}) => (
                                            <TextField {...field}
                                                id="passwordIn" type="password"
                                                inputProps={{ style: nobgCompletion }}
                                                variant="standard"
                                                label="Mot de passe" placeholder="Entrez votre mot de passe"
                                                helperText= {errors?.passwordIn ? errors?.passwordIn?.message : ""}
                                                error={errors?.passwordIn ? Boolean(true) : Boolean(false)}
                                            />
                                        )}
                        />
                        <p className='font-normal text-sm text-[#C8B3C2] underline underline-offset-2 cursor-pointer self-end' 
                           onClick={() => {setForgotCard(true);window?.scrollTo({top: 0, left: 0}); lock()}}>Mot de passe oublié ?</p>
                        <button type='submit' className='px-[25px] col-span-2 flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 sm:px-0 sm:col-span-1'>
                            <p className='font-medium text-center'>Connexion</p>
                        </button>
                    </ThemeProvider>
                </form>
            }
        </>
    )

}

 