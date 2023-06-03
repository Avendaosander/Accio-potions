import FormCreate from "./FormCreate"

function ModalCreate({ handlePotions, handleModalCreate, ingredientes }) {
   return (
      <section className='fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
         <FormCreate handlePotions={handlePotions} handleModalCreate={handleModalCreate} ingredientes={ingredientes}/>
      </section>
   )
}

export default ModalCreate