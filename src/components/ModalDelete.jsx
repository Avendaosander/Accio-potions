import Button from '@mui/material/Button';
import deletePotion from '../services/deletePotion';

function ModalDelete({ handleAlert, handlePotions, handleModalDelete, id, setAlertaObj }) {
   const confirmDelete = async () => {
      const res = await deletePotion(id)
      if (res.messageError) {
         handleAlert(true) 
         setAlertaObj({
            message: res.messageError,
            colorMui: 'error',
            variante: 'filled'
         })
         return
      }
      handleAlert(true) 
      setAlertaObj({
         message: 'La pocion ha sido eliminada',
         colorMui: 'success',
         variante: 'filled'
      })
      handleModalDelete() 
      handlePotions(res, 'eliminar')
   }
   return (
      <section className='fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10'>
         <article className='bg-purple-400 rounded-2xl px-10 py-5 max-w-[65rem] max-h-[45rem]'>
            <p className='text-purple-950 text-xl font-semibold'>Estas seguro de eliminar esta pocion?</p>
            <div className='flex justify-center gap-5 mt-5'>
               <Button variant="contained" color="info" onClick={confirmDelete}>
               Si, estoy seguro
               </Button>
               <Button variant="contained" color="error" onClick={handleModalDelete}>
               Cancelar
               </Button>
            </div>
         </article>
      </section>
   )
}

export default ModalDelete