import category_icon from '../../../../public/assets/dashboard/categories.svg'
import { Menu } from '@/components/menus/menu'
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useState } from 'react'
import { CircularLoading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'
import { DeleteButton } from '@/components/littleComponents'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { useForm } from "react-hook-form";

import { CenterModal2 } from '@/components/modal'
import { POSTRequest } from '@/utils/requestHeader'
import { InterfaceTextInput } from '@/components/forms/interface_input'

import close from "../../../../public/assets/essentials-icons/close.svg"
import edit from "../../../../public/assets/essentials-icons/edit.svg"

import { number, object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({req, res}) {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)
  const authToken = cookies.get('auth-token') || ''

  const response = await fetch(`${API_URL}/auth/users/current`, {
    method:'GET',
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
  })
  
  const person = await response.json()
  if(response.status !== 200 || !person.is_admin) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())

  return {
      props: {
          all_cat:result,
      }
  }
}

export default function Categories({all_cat}) {
  const [loading, setLoading] = useState(false)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const [allCategories, setAllCategories] = useState()

  useEffect(() => {
    setAllCategories(all_cat)
  }, [all_cat])

  const [openCategory, setOpenCategory] = useState(false)
  const [currentCategoryID, setCurrentCategoryID] = useState(null)
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState(null)
  const [currentCategoryPos, setCurrentCategoryPos] = useState(null)

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <CategoryCard open={openCategory} setOpen={setOpenCategory} id={currentCategoryID} currentCategoryTitle={currentCategoryTitle} currentCategoryPos={currentCategoryPos} setAllCategories={setAllCategories} />
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Catégories' image={category_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col gap-5'>
            <CatInput setLoading={setLoading} setAllCategories={setAllCategories} />
            <h2 className="text-secondary text-3xl font-bold lg:text-2xl sm:text-xl mb-5 md:mb-0">Liste des catégories</h2>
            {allCategories?.map(cat =>
            <div key={cat.id} className='bg-secondary/30 shadow-lg text-white rounded-xl px-5 py-3 flex flex-col'>
              <div className='flex justify-between w-full items-center'>
                <p className='text-xl font-bold lg:text-lg sm:text-base'>{cat.title}</p>
                <div className='flex gap-2'>
                  <button type='button' onClick={() => {setCurrentCategoryID(cat.id);setCurrentCategoryTitle(cat.title);setCurrentCategoryPos(cat.position);setOpenCategory(true)}} className='rounded-lg flex items-center justify-center text-white cursor-pointer bg-secondary/80 hover:bg-tertiary h-full px-2.5 w-full py-2.5 text-sm gap-3 place-self-end'>
                      <Image src={edit} className='w-4 h-auto mb-[2px] sm:w-3.5' alt='Editer un produit' />
                  </button>
                  <DeleteButton api='auth/admin/categories' id={cat?.id} setLoading={setLoading} backLink={'/admin/categories'} />
                </div>
              </div>
              <div className='ml-3 flex flex-col sm:ml-2'>
                {loading ? <CircularLoading />
                :
                <>
                  {cat?.childs?.map(sub_cat =>
                    <div key={sub_cat.id} className='flex mt-2 gap-10 bg-secondary/50 w-fit items-center py-1 pr-1 pl-3 rounded-lg'>
                      <p className='font-medium flex items-center h-10 sm:h-8'>{sub_cat.title}</p>
                      <div className='flex gap-2'>
                        <button type='button' onClick={() => {setCurrentCategoryID(sub_cat.id);setCurrentCategoryTitle(sub_cat.title);setCurrentCategoryPos(sub_cat.position);setOpenCategory(true)}} className='rounded-lg flex items-center justify-center text-white cursor-pointer bg-secondary/80 hover:bg-tertiary h-full px-2.5 w-full py-2.5 text-sm gap-3 place-self-end'>
                            <Image src={edit} className='w-4 h-auto mb-[2px] sm:w-3.5' alt='Editer un produit' />
                        </button>
                        <DeleteButton api='auth/admin/categories' id={sub_cat?.id} setLoading={setLoading} backLink={'/admin/categories'} />
                      </div>
                    </div>
                  )}
                  <SubcatInput categoryId={cat.id} setLoading={setLoading} setAllCategories={setAllCategories} />
                </>
                }
              </div>
            </div>
            )}
          </div>
        </section>
    </main>
    </>
  )
}


function SubcatInput ({categoryId, setLoading, setAllCategories}) {
  const [logErr, setlogErr] = useState(false)
  const [subCatTitle, setSubCatTitle] = useState('')

  const onChange = (e) => {
    setSubCatTitle(e.target.value)
  }

  const onClickReset = () => {
    setSubCatTitle('')
  }

  async function onSubmit() {
    setLoading(true)
    setlogErr(false)
    if(categoryId === null || subCatTitle === '' || !subCatTitle) {
      setLoading(false)
      setlogErr(true)
      return
    }

    try {
      const response = await fetch(`/api/proxy/auth/admin/categories`, {
          method: "POST",    
          mode: "cors",
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title:subCatTitle })
      })
      const category_created = await response.json()
      const getChilds =  await fetch(`${API_URL}/categories/${categoryId}`, GETRequest).then(r => r.json())
      const addToAnother = await fetch(`/api/proxy/auth/admin/categories/${categoryId}`, {
        method: "POST",    
        mode: "cors",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ childs:[...getChilds.childs.map(c => c.id), category_created.id] })
      })
      
      if(addToAnother.status === 200){
          const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
          setAllCategories(result)
          onClickReset()
          setLoading(false)
          return
      }
      setLoading(false)
      setlogErr(true)
    } catch (err) {
      console.error('Request failed:' + err)
      setLoading(false)
      setlogErr(true)
    }
  }

  const  {handleSubmit} = useForm ()

  return(
    <>
      {logErr ? <div className="text-base sm:text-sm font-medium -mb-3 place-self-start text-red-700 text-center">Une erreur est survenue.</div> : ''}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 w-full relative justify-center mt-5">
        <div className="flex flex-col tracking-[0.2px] gap-2 w-full">
          <input type='text' spellCheck='false' autoComplete='off' placeholder="Ajouter une sous-catégorie" className="text-black bg-white rounded-lg h-10 px-4 focus-visible:outline-none md:p-2 md:text-sm" value={subCatTitle} onChange={onChange} />
        </div>
        <button type='submit' className='px-4 h-10 mb-4 flex gap-3 items-center justify-center rounded-xl md:p-2 bg-secondary place-self-end'>
            <p className='font-bold text-white'>Ajouter</p>
        </button>
      </form>
    </>
  )
}

function CatInput ({setLoading, setAllCategories}) {
  const [logErr, setlogErr] = useState(false)
  const [catTitle, setCatTitle] = useState('')

  const onChange = (e) => {
    setCatTitle(e.target.value)
  }

  const onClickReset = () => {
    setCatTitle('')
  }

  async function onSubmit() {
    setLoading(true)
    setlogErr(false)
    if(catTitle === '' || !catTitle) {
      setLoading(false)
      setlogErr(true)
      return
    }
    try {
      const response = await fetch(`/api/proxy/auth/admin/categories`, {
          method: "POST",    
          mode: "cors",
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title:catTitle })
      })
      if(response.status === 200){
          const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
          setAllCategories(result)
          onClickReset()
          setLoading(false)
          return
      }
      setLoading(false)
      setlogErr(true)
    } catch (err) {
      console.error('Request failed:' + err)
      setLoading(false)
      setlogErr(true)
    }
  }
  const  {handleSubmit} = useForm ()

  return(
    <div className='flex flex-col gap-3 mt-5'>
      <h2 className='text-xl font-bold text-secondary'>Ajouter une catégorie</h2>
      {logErr ? <div className="text-base sm:text-sm font-medium -mb-3 place-self-start text-red-700 text-center">Une erreur est survenue.</div> : ''}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 w-full relative justify-center">
        <div className="flex flex-col tracking-[0.2px] gap-2 w-full">
          <input type='text' spellCheck='false' autoComplete='off' placeholder="Ajouter une catégorie" className="text-white bg-secondary/50 rounded-lg h-10 px-4 focus-visible:outline-none placeholder:text-white md:p-2 md:text-sm" value={catTitle} onChange={onChange} />
        </div>
        <button type='submit' className='px-4 h-10 mb-4 flex gap-3 items-center justify-center rounded-xl md:p-2 bg-secondary place-self-end'>
            <p className='font-bold text-white'>Ajouter</p>
        </button>
      </form>
    </div>
  )
}

const schema = object({
    category:string().required("Requis."),
    position:number().typeError("Doit être un nombre").nullable()
})

export function CategoryCard ({open, setOpen, currentCategoryTitle, currentCategoryPos, id, setAllCategories}) {

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          category: currentCategoryTitle || "",
          position: currentCategoryPos || 0,
        },
      });

    const { reset, register, handleSubmit, setValue, formState: { errors } } = methods

    useEffect(() => {
        if (currentCategoryTitle !== null) {
          setValue('category', currentCategoryTitle);
          setValue('position', currentCategoryPos);
        } else {
            reset()
        }
    }, [currentCategoryPos, currentCategoryTitle, reset, setValue]);

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)

    async function onSubmit(data) {
        setLoading(true)
        try {
            const response = await fetch(`/api/proxy/auth/admin/categories${id ? `/${id}` : ""}`, POSTRequest({
                title:data.category,
                position:data.position,
            }))
            
            if(response.status === 200) {
                const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
                setAllCategories(result)
                setLoading(false)
                setOpen(false)
                return
            }
            setErr(true)
            setLoading(false)
        } catch (err) {
            setErr(true)
            setLoading(false)
            console.error('Request failed:' + err)
        }
    }
 
    return(
        <CenterModal2 open={open} setOpen={setOpen}>
            {loading 
                ? <div className="py-6 px-8">
                    <CircularLoading size={80} />
                </div>
                : <div className="flex flex-col p-5 w-fit place-self-center items-center justify-center gap-3 text-center relative sm:py-4 sm:px-0">
                    <Image src={close} onClick={() => setOpen(false)} className="w-5 h-auto cursor-pointer absolute right-3 top-3"  alt="Close modal" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-[300px] px-6 pt-4 gap-5">
                        {err ? <div className="text-sm text-[#d32f2f] text-center">Une erreur est survenue. Réessayez plus tard ou contacter un développeur.</div> : ''}
                        <InterfaceTextInput label="Titre de la catégorie" name="category" options={{...register("category")}} commonError={errors.category} commonErrorMessage={errors.category?.message} />
                        <InterfaceTextInput label="Position de la catégorie" name="position" options={{...register("position")}} commonError={errors.position} commonErrorMessage={errors.position?.message} />
                        <button type='submit' className='px-4 h-10 mb-4 flex gap-3 items-center justify-center rounded-xl md:p-2 font-bold text-white bg-secondary'>Modifier</button>
                    </form>
                </div>
            }

        </CenterModal2>
    )
}