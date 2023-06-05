const editarPocion = async (potion, id) => {
   const update = await fetch(`http://localhost:3000/update-potion/${id}`,{
      method: 'PUT',
      body: potion
   })
      .then(res => res.json())
      .then(res => res)

   return update
}

export default editarPocion