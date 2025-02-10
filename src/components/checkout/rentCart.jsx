import { Loading } from "@/utils/loader";
import Link from "next/link";

export function RentServiceCart ({rent}) {
    return (
        <>
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Résumé de votre réservation</h1>
        {!rent
            ? <Loading />
            : 
            <div className="flex flex-col gap-3 w-[95vw] max-w-[350px]">
                <div className="flex flex-col text-lg font-bold sm:text-base w-full px-4 sm:px-3 bg-secondary/70 text-center py-5 rounded-xl items-center text-white mt-5 gap-1">
                    <h2>{rent?.room_rental?.title}</h2>
                    <h2>{new Date(rent?.room_rental?.date).toLocaleDateString('fr')}</h2>
                    <p>{rent?.room_rental?.price}€ TTC</p>
                </div>
                <div className="flex flex-col w-full px-6 sm:px-3 bg-secondary/70 py-5 rounded-xl font-medium text-white gap-1 text-base sm:text-sm">
                    <h2 className="text-lg font-bold sm:text-base place-self-center pb-4">Evènement lié à votre réservation</h2>
                    <h2 className="font-bold">{rent?.custom_title}</h2>
                    <p>Heure du lancement : {`${rent?.start_time?.slice(0,2)}h${rent?.start_time?.slice(3,5)}`}</p>
                    <p>Durée : {rent?.duration} min.</p>
                    <p>Prix par participant : {rent?.price_per_person}€ TTC</p>
                    <p>Nombre de participants : {rent?.number_of_person} </p>
                </div>
                <Link href="/rent" className="">
                    <button className='bg-secondary w-full items-center transition-all duration-500 rounded-xl justify-center text-base text-white py-2'>
                        <p className='font-medium text-center mb-[2px]'>Modifier</p>
                    </button>
                </Link>
            </div>
        }
        </>
    )
}