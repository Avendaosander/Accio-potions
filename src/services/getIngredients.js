const obtenerIngredientes = async () => {
   const ingredientes = await fetch('http://localhost:3000/ingredientes')
      .then(response => response.json())
      .then(res => {
         if (res.messageError) {
            return console.error(res.messageError);
         } else {
            return res.ingredientes
         }
      })

   return ingredientes
}

export default obtenerIngredientes