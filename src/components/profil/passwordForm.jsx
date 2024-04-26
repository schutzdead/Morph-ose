import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/utils/loader";
import { PasswordInput } from "../forms/textInput";
import { useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema = object({
  current_password:string().required("Required.").min(8, "min. 8 characters").trim(),
  new_password:string().required("Required.").min(8, "min. 8 characters").trim(),
  confirmPassword:string().required("Required.").oneOf([ref("new_password"), null], "Not identical.").trim()
}).required();

export default function PasswordForm () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
      const { current_password, new_password } = data
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
                current_password:current_password,
                password:new_password,
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
                    <h1 className="font-semibold text-lg sm:text-base text-secondary col-span-2">Changez votre mot de passe</h1>
                    <Controller name="current_password" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='current_password' label="Mot de passe actuel" placeholder="Entrez votre mot de passe actuel" errors={errors?.current_password} /> 
                                )}
                    />
                    <Controller name="new_password" control={control} defaultValue=""
                                render={({field}) => (
                                  <PasswordInput field={field} name='new_password' label="Nouveau mot de passe" placeholder="Entrez votre nouveau mot de passe" errors={errors?.new_password} /> 
                                  )}
                    />
                    <Controller name="confirmPassword" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='confirmPassword' label="Confirmation" placeholder="Confirmez votre mot de passe" errors={errors?.confirmPassword} /> 
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