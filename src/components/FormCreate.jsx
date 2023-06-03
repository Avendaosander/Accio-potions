import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react'
import imagenDefault from '../assets/Sueño.webp'
import { VscAdd  } from 'react-icons/vsc'
import crearPocion from '../services/postCrear'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 9
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
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

function FormCreate({ handlePotions, handleModalCreate, ingredientes}) {
   const theme = useTheme()
   const [formulario, setFormulario] = useState({
      imagen: null,
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidad: 0,
      categoria: '',
      ingredientes: []
   })
   const [ingre, setIngre] = useState([])
   const [preview, setPreview] = useState(imagenDefault)

   const handleDelete = (e, value) => {
      e.preventDefault()
      setIngre(ingre.filter(name => name !== value))
   }

   const handleChangeIngre = e => {
      const ingredienteNuevo = e.target.value
      // console.log(ingredienteNuevo)
      setIngre(ingredienteNuevo)
      handleChange(e)
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

   // const classOption = `bg-[url(${imagenDefault1})]`

   const handleChange = e => {
      // console.log(e.target)
      setFormulario({
         ...formulario,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      // console.log(formulario)
      
      let body = new FormData()
      formulario.imagen !== null && (body.append('imagen', formulario.imagen))
      formulario.nombre !== '' && (body.append('nombre', formulario.nombre))
      formulario.descripcion !== '' && (body.append('descripcion', formulario.descripcion))
      formulario.precio !== '' && (body.append('precio', formulario.precio))
      formulario.cantidad !== '' && (body.append('cantidad', formulario.cantidad))
      formulario.categoria !== '' && (body.append('categoria', formulario.categoria))
      formulario.ingredientes !== '' && (body.append('ingredientes', formulario.ingredientes))

      const res = await crearPocion(body)
      if (res.messageError) return console.error(res.messageError)
      handleModalCreate() 
      handlePotions(res, 'agregar')
   }

   const closeModal = (e) => {
      e.preventDefault()
      handleModalCreate()
   }

   return (
      <article className='bg-purple-400 rounded-2xl px-10 py-5 max-w-[65rem] max-h-[45rem]'>
         <h3 className='font-bold text-2xl text-purple-900 my-5 text-center'>
            Prepara tu pocion
         </h3>
         <form
            onSubmit={handleSubmit}
            className='grid grid-cols-12 grid-flow-row gap-y-5'
         >
            <div className='relative m-auto mt-2 col-span-6 row-span-1 gap-5 items-center py-0'>
               <label
                  htmlFor='imagen'
                  className='cursor-pointer flex justify-center items-center bg-fuchsia-900 rounded-full w-10 h-10 absolute -right-[1rem] top-36'
               >
                  <VscAdd className='text-purple-200 relative text-xl m-1' />
               </label>
               <input
                  type='file'
                  id='imagen'
                  name='imagen'
                  className='hidden'
                  onChange={handleFile}
               />
               <img
                  src={preview}
                  alt='Imagen de la Pocion'
                  className='w-[20rem] h-[20rem] object-cover ring-2 ring-purple-500/20 m-auto rounded-full'
               />
            </div>
            <div className='col-span-6 row-span-11 grid grid-cols-6 grid-rows-11 items-center gap-5 text-purple-950'>
               <label
                  htmlFor='nombre'
                  className='font-semibold text-xl col-span-3 row-start-1'
               >
                  Nombre
               </label>
               <input
                  className='col-span-3 row-span-1 rounded-xl px-5 py-2 outline-none focus:ring focus:ring-purple-600'
                  type='text'
                  name='nombre'
                  id='nombre'
                  placeholder='Nombre'
                  value={formulario.nombre}
                  onChange={e => handleChange(e)}
               />
               <label
                  htmlFor='categoria'
                  className='font-semibold text-xl col-span-3 row-start-1'
               >
                  Categoria
               </label>
               <input
                  className='col-span-3 row-span-1 rounded-xl px-5 py-2 outline-none focus:ring focus:ring-purple-600'
                  type='text'
                  name='categoria'
                  id='categoria'
                  placeholder='Categoria'
                  value={formulario.categoria}
                  onChange={e => handleChange(e)}
               />
               <label
                  htmlFor='precio'
                  className='font-semibold text-xl col-span-3 row-start-3'
               >
                  Precio
               </label>
               <input
                  className='col-span-3 row-span-1 rounded-xl px-5 py-2 outline-none focus:ring focus:ring-purple-600'
                  type='number'
                  name='precio'
                  id='precio'
                  placeholder='Precio'
                  value={formulario.precio}
                  onChange={e => handleChange(e)}
               />
               <label
                  htmlFor='cantidad'
                  className='font-semibold text-xl col-span-3 row-start-3'
               >
                  Cantidad
               </label>
               <input
                  className='col-span-3 row-span-1 rounded-xl px-5 py-2 outline-none focus:ring focus:ring-purple-600'
                  type='number'
                  name='cantidad'
                  id='cantidad'
                  placeholder='Cantidad'
                  value={formulario.cantidad}
                  onChange={e => handleChange(e)}
               />
               <label
                  htmlFor='descripcion'
                  className='font-semibold text-xl col-span-6 row-start-5'
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
            <label id="demo-multiple-chip-label" className='font-semibold text-xl col-span-6 row-span-1'>Ingredientes</label>
            <Select
               labelId='demo-multiple-chip-label'
               id='demo-multiple-chip'
               name='ingredientes'
               multiple
               value={ingre}
               onChange={handleChangeIngre}
               className='col-span-full row-span-2 rounded-xl px-5 py-2 outline-none focus:ring focus:ring-purple-600 max-h-[10rem]'
               input={
                  <OutlinedInput
                     id='select-multiple-chip'
                     color='secondary'
                     className='bg-purple-200'
                  />
               }
               renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300', gap: 0.5 }}>
                     {selected.map(value => (
                        <Chip
                           key={value}
                           label={value}
                           color='secondary'
                           variant='outlined'
                           deleteIcon={
                              <CancelIcon onMouseDown={e => e.stopPropagation()}/>
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
                     key={ingredient._id}
                     value={ingredient.nombre}
                     style={getStyles(ingredient.nombre, ingre, theme)}
                  >
                     {ingredient.nombre}
                  </MenuItem>
               ))}
            </Select>
            <button
               type='submit'
               className='col-span-6 row-span-1 text-purple-200 text-lg font-semibold bg-fuchsia-900 py-1 px-4 rounded-lg w-6/12 m-auto'
            >
               Crear
            </button>
            <button
               onClick={closeModal}
               className='col-span-6 row-span-1 text-purple-200 text-lg font-semibold bg-fuchsia-900 py-1 px-4 rounded-lg w-6/12 m-auto'
            >
               Cancelar
            </button>
         </form>
      </article>
   )
}

export default FormCreate