import { unlock } from "@/utils/lockScreen";
import { useRouter } from "next/router";

export function DeleteCard ({deleteCard, setDeleteCard, api, id, backLink, setLoading}) {
    const router = useRouter()
    
    async function deleteProfil (api_f, id_f) {
        setLoading(true)
        try {
            const response = await fetch(`/api/proxy/${api_f}/${id_f}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
            })
            if(response.status === 200) {
              router.push(`${backLink}`)
              setLoading(false)
              return
          }
          setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err)
        }
      } 
 
    return(
        <div className="w-[100vw] h-[100vh] bg-black/80 items-center justify-center overflow-hidden z-50 absolute top-0 left-0"
             style={deleteCard ? {display:"flex"} : {display:"none"}}>
            <div className="flex flex-col rounded-lg bg-white pt-2 pb-5 px-7 relative sm:w-[90%]">
                <div className="flex gap-10 mt-5">
                    <button className='w-[130px] rounded text-center z-10 text-white py-3 text-lg bg-secondary/70 hover:bg-secondary transition-all duration-300' onClick={() => {deleteProfil(api, id)}}>Confirmer</button>
                    <button className='w-[130px] rounded text-center z-10 text-white py-3 text-lg bg-red-500 hover:bg-red-700 transition-all duration-300' onClick={() => {setDeleteCard(false); unlock()}}>Annuler</button>
                </div>
            </div>
        </div>
    )
}