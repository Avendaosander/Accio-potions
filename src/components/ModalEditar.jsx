import FormEdit from "./FormEdit"

function ModalEditar({ handlePotions, handleModalEdit, ingredientes, pocion }) {
   return (
      <section className='fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
         <FormEdit handlePotions={handlePotions} handleModalEdit={handleModalEdit} ingredientes={ingredientes} pocion={pocion}/>
      </section>
   )
}

export default ModalEditar