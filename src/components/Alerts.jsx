import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

export default function TransitionAlerts({alertaObj, handleAlert}) {
   const [open, setOpen] = React.useState(true)

   return (
      <Box sx={{ width: '100%' }}>
         <Collapse in={open}>
            <Alert
               className='text-purple-200'
               severity={alertaObj.colorMui}
               variant={alertaObj.variante}
               action={
                  <IconButton
                     aria-label='close'
                     color='inherit'
                     size='small'
                     onClick={() => {
                        setOpen(false)
                        handleAlert(false)
                     }}
                  >
                     <CloseIcon fontSize='inherit' />
                  </IconButton>
               }
               sx={{ mb: 2 }}
            >
               {alertaObj.message}
            </Alert>
         </Collapse>
      </Box>
   )
}
