import { useState } from "react";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Image from "next/image";
import { InterfaceTextInput } from "@/components/forms/interface_input";

import Close from "../../public/assets/header/close.svg"
import Check from "../../public/assets/check.svg"
import { Loading } from "@/utils/loader";

import { unlock } from "@/utils/lockScreen";

const schema = object({
    forgotEmail:string().required("Requis.").email("Email non valide."),
}).required();

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function ForgotPassword ({forgotCard, setForgotCard, user_type}) {
    const  {reset, handleSubmit, register, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [logErr, setlogErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mailSend, setMailSend] = useState(false)

    async function onSubmit(data) {
        setLoading(true)
        setMailSend(false)
        setlogErr(false)
        const { forgotEmail } = data
		try {
            const response = await fetch(`${API_URL}/guest/forgot-password`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type:user_type, email: forgotEmail })
            })
            if(response.status === 200){
                setLoading(false)
                setMailSend(true)
                return
            }
            setLoading(false)
            setlogErr(true)
            reset()
		} catch (err) {
			console.error('Request failed:' + err)
            setLoading(false)
            setlogErr(true)
		}
	}

 
    return(
        <div className="w-[100vw] h-[100vh] bg-black/90 items-center justify-center overflow-hidden z-50 absolute top-0 left-0"
             style={forgotCard ? {display:"flex"} : {display:"none"}}>
            <div className="flex flex-col w-[450px] rounded-lg bg-pictoGradient py-5 px-10 relative sm:w-[90%]">
                <Image src={Close} alt="Close pictogram" 
                       onClick={() => {setMailSend(false); setlogErr(false); setForgotCard(false); unlock()}} 
                       className='self-end -mr-5 h-7 w-auto cursor-pointer' />
                {mailSend
                ? 
                <>
                    <div className="mt-3 mb-7 h-9 w-9 self-center flex items-center justify-center border-2 border-white animate-[2s_forwards_rotation]">
                        <Image src={Check} alt="Validate pictogram" />
                    </div>
                    <div className="text-center flex flex-col mb-5 items-center gap-1 text-white font-medium text-lg">
                        <p>Email envoyé.</p>
                        <p>Nous venons de vous envoyer un mail pour réinitialiser votre mot de passe.</p>
                    </div>
                </>
                :
                <>
                    <h1 className="text-lg text-center pb-5 text-white font-bold">Mot de passe oublié</h1>
                    {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5">Aucun compte relié à cet email.</div> : ''}
                    {loading
                    ? <div className="py-20">
                        <Loading />
                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-white gap-5 relative justify-center">
                            <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="forgotEmail" options={{...register("forgotEmail")}} commonError={errors.forgotEmail} commonErrorMessage={errors.forgotEmail?.message}/>
                            <button type='submit' className='px-[45px] my-4 flex gap-3 rounded-xl py-3 bg-secondary place-self-center'>
                                <p className='font-bold'>Continuer</p>
                            </button>
                    </form>
                }
                </>
                }
            </div>
        </div>
    )
}