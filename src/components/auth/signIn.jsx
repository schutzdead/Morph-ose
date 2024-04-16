import { InterfaceTextInput } from "@/components/forms/interface_input";
import { POSTRequest } from "@/utils/requestHeader";
import { Loading } from "@/utils/loader";
import { ForgotPassword } from '../forgotPassword';
import { lock } from '@/utils/lockScreen';
import Link from 'next/link'
import { object, string } from "yup";
import { useState } from "react";
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

const schemaSignIn = object({
    emailIn:string().required("Requis.").email("Email invalide."),
    passwordIn:string().required("Requis.").min(4,"Mot de passe invalide."),
}).required();

export function SignInAuth ({pushPath, path, pass=true, user_type}) {
    const router = useRouter()
    const {reset, handleSubmit, register, formState: {errors}} = useForm ({ resolver:  yupResolver(schemaSignIn)})
    
    const [forgotCard, setForgotCard] = useState(false)
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)

    
    async function onSubmit(data) {
        setLoading(true)
        setlogErr(false)
        const { emailIn, passwordIn } = data
		try {
            const response = await fetch(`/api/proxy/${path}`, POSTRequest({ email: emailIn, password:passwordIn }))
            const auth = await response.json()
            if(response.status === 200) {
                router.push(`${pushPath}`)
                setLoading(false)
                return
            }
            setlogErr(true)
            setLoading(false)
            reset({emailIn:emailIn, passwordIn:''})
		} catch (err) {
			console.error('Request failed:' + err)
            setLoading(false)
		}
	}

    return (
        <>
            <ForgotPassword forgotCard={forgotCard} setForgotCard={setForgotCard} user_type={user_type} />
            {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5">Identifiant(s) incorrect(s)</div> : ''}
            {loading 
                ? <div className="h-[100px] w-full flex justify-center">
                    <div className="w-1/2 py-10">
                        <Loading />
                    </div>
                </div>
                : 
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-7 text-white 2sm:gap-x-3">
                    <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="emailIn" options={{...register("emailIn")}} commonError={errors.emailIn} commonErrorMessage={errors.emailIn?.message} style='col-span-2' labelStyle='text-secondary' />
                    <InterfaceTextInput type="password" label='Mot de passe *' placeholder='Entrez votre mot de passe' name="passwordIn" options={{...register("passwordIn")}} commonError={errors.passwordIn} commonErrorMessage={errors.passwordIn?.message} style='col-span-2'  labelStyle='text-secondary'/>
                    <p style={pass ? {display:'block'} : {display:'none'}} className='font-normal col-span-2 text-sm underline underline-offset-2 cursor-pointer -mt-3' onClick={() => {setForgotCard(true); window?.scrollTo({top:0}); lock()}}>Mot de passe oublié ?</p>
                    <Link href='/' className='px-[25px] rounded-xl text-base bg-secondary/80 hover:bg-secondary transition-all duration-300 text-white py-5 sm:px-0 sm:py-3'>
                        <p className='font-medium text-center'>Retour au site</p>
                    </Link>
                    <button type='submit' className='px-[25px] flex gap-3 rounded-xl justify-center text-base bg-secondary/80 hover:bg-secondary transition-all duration-300 text-white py-5 sm:px-0 sm:py-3'>
                        <p className='font-medium text-center'>Connexion</p>
                    </button>
                </form>
            }
        </>
    )

}

 