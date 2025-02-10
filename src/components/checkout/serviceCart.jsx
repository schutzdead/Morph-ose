import { Loading } from "@/utils/loader";
import Link from "next/link";

export function ServiceCart ({workshop}) {
    return (
        <>
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Résumé de votre réservation</h1>
        {!workshop
            ? <Loading />
            : 
            <div className="flex flex-col gap-3 w-[95vw] max-w-[450px]">
                <div className="flex flex-col w-full bg-secondary/70 py-5 px-5 rounded-xl items-center font-medium text-white mt-5 gap-1 text-xl lg:text-base sm:text-sm">
                    <h2 className="lg:text-5xl md:text-4xl lg:font-Quesha font-bold lg:font-medium">{workshop?.title}</h2>
                    {workshop?.description 
                        ? <p className="py-5 font-normal text-base text-center">{workshop?.description}</p>
                        : ''
                    }
                    <p>{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                    <p>{new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                    {workshop?.speaker_name ? <p>Organisateur : {workshop?.speaker_name}</p> : ''}
                    <p>Durée : {workshop?.duration} minutes</p>
                    <p className="text-2xl lg:text-lg sm:text-base mt-4 font-semibold">{workshop?.price}€ TTC</p>
                </div>
                <Link href="/services" className="">
                    <button className='bg-secondary w-full items-center transition-all duration-500 rounded-xl justify-center text-base text-white py-2'>
                        <p className='font-medium text-center mb-[2px]'>Modifier</p>
                    </button>
                </Link>
            </div>
        }
        </>
    )
}