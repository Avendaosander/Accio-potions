import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function LoaderIng() {
   return (
      <Stack className='w-[300px] flex flex-col gap-5'>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
         <Skeleton variant='rounded' height={80} animation='pulse'/>
      </Stack>
   );
}
