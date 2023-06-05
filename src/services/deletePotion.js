const deletePotion = async (id) => {
   const borrar = await fetch(`http://localhost:3000/delete-potion/${id}`,{
      method: 'DELETE'
   })
      .then(res => res.json())
      .then(res => res)

   return borrar
}

export default deletePotion