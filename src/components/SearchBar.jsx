import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

function SearchBar({ handleSearch }) {
   const [inputSearch, setInputSearch] = useState('')
   const [filtro, setFiltro] = useState('nombre')

   const handleInput = e => {
      e.preventDefault()
      setInputSearch(e.target.value)
   }

   const handleFilter = e => {
      e.preventDefault()
      setFiltro(e.target.value)
   }

   return (
      <div className='flex'>
         <select
            name='nombre'
            id='nombre'
            value={filtro}
            onChange={handleFilter}
            className='px-3 py-1 bg-purple-900/50 rounded-l-xl border-r-2 border-purple-900'
         >
            <option value='nombre'>Nombre</option>
            <option value='categoria'>Categoria</option>
            <option value='descripcion'>Descripcion</option>
         </select>
         <input
            type='text'
            placeholder='Pocion de Fuerza'
            className='px-3 py-1 bg-purple-900/50 outline-none focus:bg-purple-900/70  w-80'
            value={inputSearch}
            onChange={handleInput}
         />
         <button
            className='px-3 py-0 bg-purple-900/50 rounded-r-xl border-l-2 border-purple-900'
            onClick={() => handleSearch(inputSearch, filtro)}
         >
            <SearchIcon className='mr-1'/>
            Accio
         </button>
      </div>
   )
}

export default SearchBar
