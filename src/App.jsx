import { useState } from 'react'
import Header from './components/Header'
import { Pociones } from './components/Pociones'
import { Ingredientes } from './components/Ingredientes'
import LoaderPotions from './components/LoaderPotion'
import LoaderIng from './components/LoaderIngredients'
import SearchBar from './components/SearchBar'
import ModalCreate from './components/ModalCreate'
import ModalEditar from './components/ModalEditar'
import usePotions from './hooks/usePotions'
import useIngredients from './hooks/useIngredients'
import { GiCauldron } from 'react-icons/gi'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

function App() {
   const { ingredientes, setIngredientes, loadingIng } = useIngredients()
   const { pociones, setPociones, loading, setSearch } = usePotions()
   const [modalCreate, setModalCreate] = useState(false)
   const [modalEdit, setModalEdit] = useState(false)
   const [pocionUpdate, setPocionUpdate] = useState(null)

   const handlePotions = (res, accion) => {
      const pocion = res.potion
      const newListOfIngredientes = res.ingredientes
      if(accion === 'agregar') {
         const newListOfPotions = [...pociones, pocion]
         setPociones(newListOfPotions)
      } else if (accion === 'editar') {
         const index = pociones.findIndex(potion => potion._id === pocion._id)
         let newListOfPotions = [...pociones]
         newListOfPotions[index] = pocion
         setPociones(newListOfPotions)
      } else if (accion === 'eliminar') {
         const newListOfPotions = pociones.filter(potion => potion._id !== pocion._id)
         setPociones(newListOfPotions)
      }
      setIngredientes(newListOfIngredientes)
   }

   const handleSearch = (find, filter) => {
      setSearch({ [filter]: find })
   }

   const handleModalCreate = () => {
      setModalCreate(!modalCreate)
   }

   const handleModalEdit = (pocion = null) => {
      setModalEdit(!modalEdit)
      if (pocion !== null) setPocionUpdate(pocion)
   }

   return (
      <>
         <Header />
         <main className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl text-purple-900 my-5'>
               Lista de Pociones
            </h2>
            <section className='mb-5'>
               <SearchBar handleSearch={handleSearch} />
            </section>
            <section className='flex justify-center w-full container mx-auto pb-20 gap-10'>
               <article>
                  {loadingIng ? (
                     <LoaderIng />
                  ) : (
                     <Ingredientes ingredientes={ingredientes} />
                  )}
               </article>
               <article>
                  {loading ? (
                     <LoaderPotions />
                  ) : (
                     <Pociones
                        handlePotions={handlePotions}
                        pociones={pociones}
                        handleModalEdit={handleModalEdit}
                     />
                  )}
               </article>
            </section>
            <Tooltip
               title='Crear Pocion'
               TransitionComponent={Zoom}
               placement='bottom'
            >
               <button
                  className='fixed right-4 bottom-4 bg-purple-900/90 p-3 rounded-full animate-bounce'
                  onClick={() => handleModalCreate()}
               >
                  <GiCauldron className='text-2xl text-fuchsia-200' />
               </button>
            </Tooltip>

            {modalCreate === true && (
               <ModalCreate
                  handlePotions={handlePotions}
                  handleModalCreate={handleModalCreate}
                  ingredientes={ingredientes}
               />
            )}
            {modalEdit === true && (
               <ModalEditar
                  handlePotions={handlePotions}
                  handleModalEdit={handleModalEdit}
                  ingredientes={ingredientes}
                  pocion={pocionUpdate}
               />
            )}

         </main>
      </>
   )
}

export default App
