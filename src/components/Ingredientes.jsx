import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip';

export default function Listofingredients({ ingredientes }) {
   return (
      <div className="bg-fuchsia-950/90 text-center rounded-xl mx-auto text-purple-200 w-5/6 sm:w-44 lg:w-56 xl:w-72">
         <h3 className="font-bold text-2xl py-5">Ingredientes</h3>
         <List className='w-full flex flex-col gap-5 py-0'>
            {ingredientes.map(ingre => (
               <Tooltip key={ingre._id} title={ingre.descripcion} placement="bottom">
                  <ListItem
                     className='grid grid-cols-4 gap-2 py-3 px-5 items-center text-center'
                  >
                     <ListItemText
                        className='col-span-3 text-start'
                        primaryTypographyProps={{ fontWeight: '600' }}
                        primary={ingre.nombre}
                     />
                     <ListItemText
                        className='col-span-1 text-purple-300 text-end'
                        primaryTypographyProps={{ fontWeight: '500' }}
                        primary={ingre.cantidad}
                     />
                  </ListItem>
               </Tooltip>
            ))}
         </List>
      </div>
   )
}

export function NoIngredients() {
   return <div>Ha ocurrido un Error</div>
}

export function Ingredientes({ ingredientes }) {
   const hasIngredients = ingredientes.length > 0
   return hasIngredients ? (
      <Listofingredients ingredientes={ingredientes} />
   ) : (
      <NoIngredients ingredientes={ingredientes} />
   )
}
