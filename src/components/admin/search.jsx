import { useState } from "react"
import { POSTRequest } from "@/utils/requestHeader"
import Link from "next/link"
import { CircularLoading } from "@/utils/loader"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Search ({result, setResult, apiPath, linkTo1, linkTo2}) {
    const [search, setSearch] = useState('')
    const [load, setLoad] = useState(false)

    function handleChangeSearch (e) {
      setSearch(e.target.value);
      if(e.target.value === '') {setResult(null); setLoad(false); return}
      setLoad(true)
      {load ? ''
        : setTimeout(async function searchLoad () {
      try {
            const response = await fetch(`${API_URL}/search/${apiPath}`, POSTRequest({search:e.target.value}))
            const res = await response.json();
            setResult([])
            for(const props in res){
                setResult((previous => [...previous, {id:props, title:res[props]}]))
            }
            if(res.message) return setResult([])
            setLoad(false)
        } catch (err) {
            console.error('Request failed:' + err)
        }
      }, 500)}
    } 
    
    return(
        <div className='group relative flex flex-col w-full'>
                <input type='text' spellCheck='false' autoComplete='off' placeholder="Rechercher..." className="text-white w-full bg-secondary/70 rounded-[8px] h-10 sm:h-8 px-4 placeholder:text-white focus-visible:outline-none md:text-sm" value={search} onChange={handleChangeSearch}/>
                {load ?
                <div className='absolute w-[85%] h-3/5 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-end items-center'>
                    <CircularLoading />
                </div>
                : ''}
                {
                    result === null || result?.length === 0
                    ? ''
                    : <div className='flex flex-col min-w-[40%] absolute mt-[68px] bg-white border-2 rounded-[4px] z-20 border-tertiary max-h-[200px] overflow-y-auto'>
                        {result ?
                        result.map(s =>
                            <Link href={`/admin/products/${s?.title?.id}`} key={s?.title?.id ? s?.title?.id : s?.id} className='hover:bg-gray-200 bg-white cursor-pointer transition-all duration-500 p-3.5 border-b border-[#c4c4c4]'
                            style={result.length === s.id ? {border:'none'} : {}}
                            onClick={() => {setSearch(''); setResult('')}}>{s?.title?.title ? s?.title?.title : 'No name'}</Link>
                        )
                        : ''
                        }
                    </div>
                }
        </div>
    )
}