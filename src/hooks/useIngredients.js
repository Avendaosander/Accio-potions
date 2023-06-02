import { useEffect, useState } from "react"
import obtenerIngredientes from "../services/getIngredients"

function useIngredients() {
   const [ingredientes, setIngredientes] = useState([])
   const [loadingIng, setLoadingIng] = useState(false)
   const [errorIng, setErrorIng] = useState(null)

   useEffect(() => {
      const getPotions = async() => {
         try {
            setLoadingIng(true)
            setErrorIng(null)
            const ingredients = await obtenerIngredientes()
            setIngredientes(ingredients === null ? [] : ingredients)
         } catch (error) {
            setErrorIng(error.message)
         } finally {
            setLoadingIng(false)
         }
      }
      getPotions()
   }, [])

   return ({ingredientes, setIngredientes, loadingIng, errorIng})
}

export default useIngredients