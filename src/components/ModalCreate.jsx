import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from 'react'
import imagenDefault from '../assets/Sueño.webp'
import { VscAdd } from 'react-icons/vsc'
import crearPocion from '../services/postCrear'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 9
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250
      }
   }
}

function getStyles(name, personName, theme) {
   return {
      fontWeight:
         personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium
   }
}

function ModalCreate({ handleAlert, handlePotions, handleModalCreate, ingredientes, setAlertaObj }) {
   const theme = useTheme()
   const [formulario, setFormulario] = useState({
      imagen: null,
      nombre: '',
      descripcion: '',
      precio: 1,
      cantidad: 1,
      categoria: '',
      ingredientes: []
   })
   const [preview, setPreview] = useState(imagenDefault)

   const handleDelete = (e, value) => {
      e.preventDefault()
      const ingreNew = formulario.ingredientes.filter(name => name !== value)
      setFormulario({
         ...formulario,
         ingredientes: ingreNew
      })
   }

   const handleFile = e => {
      let selectFile = e.target.files[0]
      if (!selectFile) return
      setFormulario({
         ...formulario,
         [e.target.name]: selectFile
      })
      setPreview(URL.createObjectURL(selectFile))
   }

   const handleChange = e => {
      setFormulario({
         ...formulario,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()

      // Realizar las validaciones de los campos
      if (formulario.imagen !== null) {
         const allowedFormats = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
         const fileExtension = formulario.imagen.name
            .substr(formulario.imagen.name.lastIndexOf('.'))
            .toLowerCase()

         if (!allowedFormats.includes(fileExtension)) {
            handleAlert(true) 
            setAlertaObj({
               message: 'El campo "imagen" debe tener uno de los formatos permitidos: ' + allowedFormats.join(', '),
               colorMui: 'warning',
               variante: 'filled'
            })
            return
         }
      } else {
         handleAlert(true) 
         setAlertaObj({
            message: 'Debe seleccionar una imagen.',
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }

      if (formulario.nombre.trim() === '') {
         handleAlert(true) 
         setAlertaObj({
            message: 'El campo "nombre" no puede estar vacío.',
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }

      if (formulario.descripcion.trim() === '') {
         handleAlert(true) 
         setAlertaObj({
            message: 'El campo "descripcion" no puede estar vacío.',
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }

      if (formulario.categoria.trim() === '') {
         handleAlert(true) 
         setAlertaObj({
            message: 'El campo "categoria" no puede estar vacío.',
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }

      if (formulario.ingredientes.length === 0) {
         handleAlert(true) 
         setAlertaObj({
            message: 'El campo "ingredientes" no puede estar vacío.',
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }

      let body = new FormData()
      formulario.imagen !== null && body.append('imagen', formulario.imagen)
      formulario.nombre !== '' && body.append('nombre', formulario.nombre)
      formulario.descripcion !== '' && body.append('descripcion', formulario.descripcion)
      formulario.precio !== 0 && body.append('precio', formulario.precio)
      formulario.cantidad !== 0 && body.append('cantidad', formulario.cantidad)
      formulario.categoria !== '' && body.append('categoria', formulario.categoria)
      formulario.ingredientes !== [] && body.append('ingredientes', formulario.ingredientes)

      const res = await crearPocion(body)
      if (res.messageError) {
         handleAlert(true) 
         setAlertaObj({
            message: res.messageError,
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }
      handleAlert(true) 
      setAlertaObj({
         message: 'La pocion ha sido creada',
         colorMui: 'success',
         variante: 'filled'
      })
      handleModalCreate()
      handlePotions(res, 'agregar')
   }

   const closeModal = e => {
      e.preventDefault()
      handleModalCreate()
   }

   return (
      <section className='fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
         <article className='bg-purple-400 rounded-2xl px-10 py-5 max-w-[65rem] mx-4'>
            <h3 className='font-bold text-2xl text-purple-900 my-5 text-center'>
               Prepara tu pocion
            </h3>
            <form
               onSubmit={handleSubmit}
               className='grid grid-cols-2 sm:grid-cols-12 grid-flow-row gap-y-5'
            >
               <div className='relative m-auto mt-2 col-span-2 sm:col-span-6 row-span-1 gap-5 items-center py-0'>
                  <label
                     htmlFor='imagen'
                     className='cursor-pointer flex justify-center items-center bg-fuchsia-900 rounded-full w-8 sm:w-10 h-8 sm:h-10 absolute -right-[1rem] top-10 sm:top-28 md:top-36'
                  >
                     <VscAdd className='text-purple-200 relative text-xl m-1' />
                  </label>
                  <input
                     type='file'
                     id='imagen'
                     name='imagen'
                     className='hidden'
                     accept='.png, .jpg, .jpeg, .webp, .svg'
                     onChange={handleFile}
                  />
                  <img
                     src={preview}
                     alt='Imagen de la Pocion'
                     className='w-[7rem] h-[7rem] sm:w-[15rem] sm:h-[15rem] md:w-[20rem] md:h-[20rem] object-cover ring-2 ring-purple-500/20 m-auto rounded-full'
                  />
               </div>
               <div className='col-span-6 row-span-11 grid grid-cols-6 grid-rows-11 items-center gap-5 text-purple-950'>
                  <label
                     htmlFor='nombre'
                     className='font-semibold sm:text-xl col-span-3 row-start-1'
                  >
                     Nombre
                  </label>
                  <input
                     className='col-span-3 row-span-1 rounded-xl px-5 py-1 sm:py-2 outline-none focus:ring focus:ring-purple-600'
                     type='text'
                     name='nombre'
                     id='nombre'
                     placeholder='Nombre'
                     value={formulario.nombre}
                     onChange={e => handleChange(e)}
                  />
                  <label
                     htmlFor='categoria'
                     className='font-semibold sm:text-xl col-span-3 row-start-1'
                  >
                     Categoria
                  </label>
                  <input
                     className='col-span-3 row-span-1 rounded-xl px-5 py-1 sm:py-2 outline-none focus:ring focus:ring-purple-600'
                     type='text'
                     name='categoria'
                     id='categoria'
                     placeholder='Categoria'
                     value={formulario.categoria}
                     onChange={e => handleChange(e)}
                  />
                  <label
                     htmlFor='precio'
                     className='font-semibold sm:text-xl col-span-3 row-start-3'
                  >
                     Precio
                  </label>
                  <input
                     className='col-span-3 row-span-1 rounded-xl px-5 py-1 sm:py-2 outline-none focus:ring focus:ring-purple-600'
                     type='number'
                     name='precio'
                     min={1}
                     id='precio'
                     placeholder='Precio'
                     value={formulario.precio}
                     onChange={e => handleChange(e)}
                  />
                  <label
                     htmlFor='cantidad'
                     className='font-semibold sm:text-xl col-span-3 row-start-3'
                  >
                     Cantidad
                  </label>
                  <input
                     className='col-span-3 row-span-1 rounded-xl px-5 py-1 sm:py-2 outline-none focus:ring focus:ring-purple-600'
                     type='number'
                     name='cantidad'
                     min={1}
                     id='cantidad'
                     placeholder='Cantidad'
                     value={formulario.cantidad}
                     onChange={e => handleChange(e)}
                  />
                  <label
                     htmlFor='descripcion'
                     className='font-semibold sm:text-xl col-span-6 row-start-5'
                  >
                     Descripcion
                  </label>
                  <textarea
                     name='descripcion'
                     id='descripcion'
                     placeholder='Descripcion de tu pocion'
                     className='col-span-6 row-span-2 w-full text-lg py-1 px-3 rounded-xl m-auto outline-none focus:ring focus:ring-purple-600'
                     value={formulario.descripcion}
                     onChange={e => handleChange(e)}
                  ></textarea>
               </div>
               <label
                  id='demo-multiple-chip-label'
                  className='font-semibold sm:text-xl col-span-6 row-span-1'
               >
                  Ingredientes
               </label>
               <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  name='ingredientes'
                  multiple
                  value={formulario.ingredientes}
                  onChange={handleChange}
                  className='col-span-full sm:row-span-2 rounded-xl px-2 py-1 sm:py-2 outline-none focus:ring focus:ring-purple-600 max-h-[4rem] sm:max-h-[7rem] overflow-visible'
                  input={
                     <OutlinedInput
                        id='select-multiple-chip'
                        color='secondary'
                        className='bg-purple-200'
                     />
                  }
                  renderValue={selected => (
                     <Box
                        sx={{
                           display: 'flex',
                           flexWrap: 'nowrap',
                           maxWidth: '300',
                           gap: 0.5
                        }}
                     >
                        {selected.map(value => (
                           <Chip
                              sx={{
                                 fontSize: {
                                    xs: 12,
                                    sm: 14
                                 }
                              }}
                              key={value}
                              label={value}
                              color='secondary'
                              variant='outlined'
                              onMouseDown={e => e.stopPropagation()}
                              deleteIcon={
                                 <CancelIcon
                                    onMouseDown={e => e.stopPropagation()}
                                 />
                              }
                              onDelete={e => handleDelete(e, value)}
                           />
                        ))}
                     </Box>
                  )}
                  MenuProps={MenuProps}
               >
                  {ingredientes.map(ingredient => (
                     <MenuItem
                        disabled={formulario.cantidad > ingredient.cantidad ? true : false}
                        key={ingredient._id}
                        value={ingredient.nombre}
                        style={getStyles(
                           ingredient.nombre,
                           formulario.ingredientes,
                           theme
                        )}
                     >
                        {ingredient.nombre}
                     </MenuItem>
                  ))}
               </Select>
               <button
                  type='submit'
                  className='col-start-1 sm:col-span-6 sm:row-span-1 text-purple-200 sm:text-lg font-semibold bg-fuchsia-900 py-1 px-4 rounded-lg w-auto m-auto'
               >
                  Crear
               </button>
               <button
                  onClick={closeModal}
                  className='col-start-2 sm:col-span-6 sm:row-span-1 text-purple-200 sm:text-lg font-semibold bg-fuchsia-900 py-1 px-4 rounded-lg w-auto m-auto'
               >
                  Cancelar
               </button>
            </form>
         </article>
      </section>
   )
}

export default ModalCreate