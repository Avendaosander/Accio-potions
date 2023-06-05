import { useEffect, useState } from "react"
import obtenerPociones from "../services/getPotions"
import searchPotions from "../services/getSearch"

function usePotions() {
   const [pociones, setPociones] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [search, setSearch] = useState('')

   useEffect(() => {
      const getPotions = async() => {
         try {
            setLoading(true)
            setError(null)
            const potions = search === '' ? await obtenerPociones() : await searchPotions(search)
            setPociones(potions === null ? [] : potions)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      getPotions()
   }, [search])

   return ({pociones, setPociones, loading, error, setSearch})
}

export default usePotions