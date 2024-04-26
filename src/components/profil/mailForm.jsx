import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/utils/loader";
import { PasswordInput, TextInput } from "../forms/textInput";
import { useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object({
  email:string().required("Required.").email("Invalid email.").trim().lowercase(),
  password:string().required("Required.").min(8, "min. 8 characters").trim(),
}).required();

export default function MailForm () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
      const { email, password } = data
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
                email:email,
                current_password:password
            })
        })
        if(response.status !== 200){
            setError(true)
            setLoading(false)
        }
        setLoading(false)
        reset()
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
                    <h1 className="font-semibold text-lg sm:text-base text-secondary col-span-2">Changez votre email</h1>
                    <Controller name="email" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='email' label="Nouvel email" placeholder="Entrez votre nouvel email" errors={errors?.email} /> 
                                )}
                    />
                    <Controller name="password" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='password' label="Mot de passe" placeholder="Entrez votre mot de passe" errors={errors?.password} /> 
                                )}
                    />
                    <button type='submit' className='col-span-2 place-self-center w-full mt-5 flex gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-2'>
                        <p className='font-medium text-center'>Enregistrer</p>
                    </button>
                </ThemeProvider>
            </form>
        }
      </>
    )
}