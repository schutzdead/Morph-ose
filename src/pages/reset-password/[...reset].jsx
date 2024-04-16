import { CustomHead } from "@/components/customHead"
import { Loading } from "@/utils/loader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { InterfaceTextInput } from "@/components/forms/interface_input";

const schema = object({
    email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
    new_password:string().required("Requis.").min(8, "min. 8 caractères").trim(),
    confirmPassword:string().required("Requis.").oneOf([ref("new_password"), null], "Non identique.").trim()
}).required();

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Reset() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)

    const {reset, register, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
        const { email, new_password } = data
        setLoading(true)
        setlogErr(false)
        try {
            const response = await fetch(`${API_URL}/guest/reset-password`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token:router.query.token, 
                    email:email,
                    password:new_password,
                })
            })
            if(response.status === 200) {
                router.push('/client')
                setLoading(false)
                return
            }
            setlogErr(true)
            setLoading(false)
            reset()
        } catch (err) {
            setLoading(false)
            setlogErr(true)
            console.error('Request failed:' + err.message)
        }
    }

    return (
      <main>
        <CustomHead pageName='Reset password' metaResume='Reset password'/>
        <div className="w-[100vw] h-[100vh] bg-black/90 items-center justify-center overflow-hidden z-50 absolute top-0 left-0 flex">
            <div className="flex flex-col rounded-lg bg-pictoGradient w-[400px] pt-2 pb-5 px-7 relative sm:w-[90%]">
            {logErr ? <div className="text-sm text-center text-[#d32f2f] mt-5">Une erreur est survenue.</div> : ''}
            {loading 
                ? <div className="py-20">
                    <Loading />
                </div>
                : 
            <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-1 text-white gap-5'>
                <h1 className="mt-5 font-bold text-white text-lg text-center md:mt-4">Réinitialisation de mot de passe</h1>
                <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="email" options={{...register("email")}} commonError={errors.email} commonErrorMessage={errors.email?.message}/>
                <InterfaceTextInput type="password" label='Nouveau mot de passe *' placeholder='Entrez votre nouveau mot de passe' name="new_password" options={{...register("new_password")}} commonError={errors.new_password} commonErrorMessage={errors.new_password?.message}/>
                <InterfaceTextInput type="password" label='Confirmation *' placeholder='Confirmez votre mot de passe' name="confirmPassword" options={{...register("confirmPassword")}} commonError={errors.confirmPassword} commonErrorMessage={errors.confirmPassword?.message}/>
                <button type='submit' className='px-[45px] my-4 flex gap-3 rounded-xl py-3 bg-secondary place-self-center'>
                    <p className='font-bold'>Valider</p>
                </button>
            </form>
            }
            </div>
        </div>
      </main>
    )
}