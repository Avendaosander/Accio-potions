import { useEffect, useState } from "react"
import obtenerPociones from "../services/getPotions"

function usePotions() {
   const [pociones, setPociones] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   useEffect(() => {
      const getPotions = async() => {
         try {
            setLoading(true)
            setError(null)
            const potions = await obtenerPociones()
            setPociones(potions === null ? [] : potions)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
      getPotions()
   }, [])

   return ({pociones, setPociones, loading, error})
}

export default usePotions