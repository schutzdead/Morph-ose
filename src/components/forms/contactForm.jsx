import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";

import { CircularLoading } from "@/utils/loader";

import Image from "next/image";
import Close from '../../../public/assets/close.svg'
import Check from '../../../public/assets/check.svg'
import { lock, unlock } from "@/utils/lockScreen";
import { InterfaceTextArea, InterfaceTextInput } from "./interface_input";

const schema = object({
    lastname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
    thematic:string().required("Requis."),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Téléphone invalide.'),
    comment:string().required("Requis.").min(10, "Message trop court"),
}).required();

export function ContactForm () {
    const  {reset, register, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)
    const [mailSend, setMailSend] = useState(false)

    async function onSubmit(data) {
        const { name, email, message } = data
        setLoading(true)
        try {
            const response = await fetch('/api/proxy/contact', {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name:name, 
                    email:email, 
                    message:message, 
                })
            })
            if(response.status === 200) {
                reset()
                setLoading(false)
                setMailSend(true)
                window?.scrollTo({top: 0, left: 0});
                lock()
            } else {
                setLoading(false)
                setlogErr(true)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
        <>
        {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5 scroll-mt-28" id="errorContact">Une erreur est survenue, réessayez plus tard.</div> : ''}
        {loading 
            ? <div className="flex justify-center py-20 w-full">
                <CircularLoading />
            </div>
            : mailSend  
                ? <div className="flex flex-col w-[400px] bg-background text-secondary p-6 rounded-xl relative sm:w-[90%]">
                    <>
                        <div className="mt-3 mb-7 h-9 w-9 self-center flex items-center justify-center border-2 border-primary-color animate-[2s_forwards_rotation]">
                            <Image src={Check} alt="Validate pictogram" />
                        </div>
                        <div className="text-center flex flex-col font-medium mb-5 items-center gap-1">
                            <p>Votre demande a bien été envoyée.</p>
                            <p>Nous vous répondrons dès que possible.</p>
                        </div>
                    </>
                </div> 
                : <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-5 relative place-self-center' id="contact">
                        <InterfaceTextInput label='Nom *' placeholder='Dupont' name="lastname" options={{...register("lastname")}} commonError={errors.lastname} commonErrorMessage={errors.lastname?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Thématique *' placeholder="Erreur sur ma commande" name="thematic" options={{...register("thematic")}} commonError={errors.thematic} commonErrorMessage={errors.thematic?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="email" options={{...register("email")}} commonError={errors.email} commonErrorMessage={errors.email?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Téléphone *' placeholder='0606060606' name="phone" options={{...register("phone")}} commonError={errors.phone} commonErrorMessage={errors.phone?.message} labelStyle="text-secondary"/>
                        <InterfaceTextArea label='Commentaire *' placeholder="Détaillez nous votre problème" name="comment" height={3}  options={{...register("comment")}} commonError={errors.comment} commonErrorMessage={errors.comment?.message} labelStyle="text-secondary"/>
                        <p className='text-xs font-light col-span-2'>En envoyant ce mail, vous agréez à la <span className='font-bold'>politiques de la protection des données*</span>.</p>
                        <button type='submit'  className='w-fit px-10 col-span-2 place-self-center gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 mt-10'>
                                <p className='font-medium text-center'>Envoyer</p>
                        </button>
                </form>
            }
        </>
    )
}
