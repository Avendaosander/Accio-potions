const searchPotions = async (filter) => {
   const pociones = await fetch('http://localhost:3000/search-potion',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter)
   })
   .then(response => response.json())
   .then(res => {
      if (res.messageError) return console.error(res.messageError);
      return res.pociones
   })

   return pociones
}

export default searchPotions