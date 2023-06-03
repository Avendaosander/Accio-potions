import { useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { BsFillTrashFill } from 'react-icons/bs'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import ModalDelete from './ModalDelete'

export default function Listofpotions({ pociones, handleModalEdit }) {
   const [potionID, setPotionID] = useState(false)
   const [modalDelete, setModalDelete] = useState(false)
   const handleModalDelete = (id = null) => {
      setModalDelete(!modalDelete)
      if (id !== null) setPotionID(id)
   }

   return (
      <List className='w-full flex flex-col gap-5 py-0'>
         {pociones.map(pocion => (
            <ListItem
               key={pocion._id}
               className='grid grid-cols-12 gap-2 text-purple-950 bg-purple-900/50 py-5 px-5 rounded-xl shadow-purple-800/50 shadow-lg items-center text-center'
            >
               <ListItemAvatar className='col-span-1'>
                  <Avatar className='w-16 h-16'>
                     <img
                        src={pocion.imagen.secure_url}
                        alt={pocion.nombre}
                        className='object-cover w-16 h-16 rounded-full'
                     />
                  </Avatar>
               </ListItemAvatar>
               <ListItemText
                  className='col-span-2'
                  primaryTypographyProps={{ fontSize: 20, fontWeight: '700' }}
                  primary={pocion.nombre}
               />
               <ListItemText
                  className='col-span-5'
                  primaryTypographyProps={{ fontSize: 15, fontWeight: '600' }}
                  primary={pocion.descripcion}
               />
               <ListItemText
                  className='col-span-1'
                  primaryTypographyProps={{ fontWeight: '600' }}
                  primary={`${pocion.precio}$`}
               />
               <ListItemText
                  className='font-medium col-col-end-11'
                  primaryTypographyProps={{ fontWeight: '600' }}
                  primary={pocion.cantidad}
               />

               <Tooltip
                  title='Editar Pocion'
                  TransitionComponent={Zoom}
                  placement='bottom'
               >
                  <IconButton
                     color='inherit'
                     aria-label='add an alarm'
                     className='font-medium col-end-12 flex justify-center'
                     onClick={() => handleModalEdit(pocion)}
                  >
                     <FiEdit3 className='text-3xl' />
                  </IconButton>
               </Tooltip>
               <Tooltip
                  title='Editar Pocion'
                  TransitionComponent={Zoom}
                  placement='bottom'
               >
                  <IconButton
                     color='inherit'
                     aria-label='add an alarm'
                     className='font-medium col-end-13 flex justify-center'
                     onClick={() => handleModalDelete(pocion._id)}
                  >
                     <BsFillTrashFill className='text-3xl' />
                  </IconButton>
               </Tooltip>
            </ListItem>
         ))}

         {modalDelete === true && (
            <ModalDelete
               handleModalDelete={handleModalDelete}
               id={potionID}
            />
         )}
      </List>
   )
}

export function NoPotions() {
   return <div>No hay pociones en el inventario</div>
}

export function Pociones({ pociones, handleModalEdit }) {
   const hasPotions = pociones.length > 0
   return hasPotions ? (
      <Listofpotions pociones={pociones} handleModalEdit={handleModalEdit}/>
   ) : (
      <NoPotions pociones={pociones} />
   )
}
