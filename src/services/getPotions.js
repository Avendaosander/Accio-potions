const obtenerPociones = async () => {
   const pociones = await fetch('http://localhost:3000/home')
      .then(response => response.json())
      .then(res => {
         if (res.messageError) {
            return console.error(res.messageError);
         } else {
            return res.pociones
         }
      })

   return pociones
}

export default obtenerPociones