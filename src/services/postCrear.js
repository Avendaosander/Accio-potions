const crearPocion = async (potion) => {
   const create = await fetch('http://localhost:3000/create-potion',{
      method: 'POST',
      body: potion
   })
      .then(res => res.json())
      .then(res => res)

   return create
}

export default crearPocion