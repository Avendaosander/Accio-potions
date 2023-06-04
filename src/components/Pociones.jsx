import { useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { BsFillTrashFill } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import ModalDelete from './ModalDelete'

export default function Listofpotions({ handlePotions, pociones, handleModalEdit }) {
   const [potionID, setPotionID] = useState(false)
   const [modalDelete, setModalDelete] = useState(false)
   const handleModalDelete = (id = null) => {
      setModalDelete(!modalDelete)
      if (id !== null) setPotionID(id)
   }

   return (
      <ul className='lg:flex lg:flex-col gap-5 py-0 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] justify-center'>
         {pociones.map(pocion => (
            <li
               key={pocion._id}
               className='grid grid-cols-2 max-lg:grid-flow-row max-lg:auto-rows-auto lg:grid-cols-12 gap-3 text-purple-950 bg-purple-900/50 py-5 px-5 rounded-xl shadow-purple-800/50 shadow-lg items-center text-center w-11/12 sm:w-auto mx-auto sm:mx-0'
            >
               <div className='col-span-2 max-lg:row-start-1 lg:col-span-1 w-28 lg:w-16 h-28 lg:h-16 m-auto'>
                  <img
                     src={pocion.imagen.secure_url}
                     alt={pocion.nombre}
                     className='object-cover w-28 lg:w-16 h-28 lg:h-16 rounded-full'
                  />
               </div>
               <p className='col-span-2 max-lg:row-start-2 lg:col-span-2 font-bold text-2xl lg:text-xl'>
                  {pocion.nombre}
               </p>
               <p className='col-span-2 max-lg:row-span-2 lg:col-span-5 font-semibold md:text-xl lg:text-lg'>{pocion.descripcion}</p>
               <p className='col-span-1 max-lg:row-start-5 lg:col-span-1 font-semibold md:text-xl lg:text-lg'>{`${pocion.precio}$`}</p>
               <p className='col-span-1 max-lg:row-start-5 lg:col-end-11 font-semibold md:text-xl lg:text-lg'>{pocion.cantidad}</p>

               <Tooltip
                  title='Editar Pocion'
                  TransitionComponent={Zoom}
                  placement='bottom'
               >
                  <p
                     color='inherit'
                     aria-label='add an alarm'
                     className='font-medium col-span-1 max-lg:row-start-6 lg:col-end-12 flex justify-center'
                     onClick={() => handleModalEdit(pocion)}
                  >
                     <FiEdit3 className='text-3xl' />
                  </p>
               </Tooltip>
               <Tooltip
                  title='Editar Pocion'
                  TransitionComponent={Zoom}
                  placement='bottom'
               >
                  <p
                     color='inherit'
                     aria-label='add an alarm'
                     className='font-medium col-span-1 max-lg:row-start-6 lg:col-end-13 flex justify-center'
                     onClick={() => handleModalDelete(pocion._id)}
                  >
                     <BsFillTrashFill className='text-3xl' />
                  </p>
               </Tooltip>
            </li>
         ))}

         {modalDelete === true && (
            <ModalDelete
               handlePotions={handlePotions}
               handleModalDelete={handleModalDelete}
               id={potionID}
            />
         )}
      </ul>
   )
}

export function NoPotions() {
   return <div>No hay pociones en el inventario</div>
}

export function Pociones({ handlePotions, pociones, handleModalEdit }) {
   const hasPotions = pociones.length > 0
   return hasPotions ? (
      <Listofpotions
         handlePotions={handlePotions}
         pociones={pociones}
         handleModalEdit={handleModalEdit}
      />
   ) : (
      <NoPotions pociones={pociones} />
   )
}
