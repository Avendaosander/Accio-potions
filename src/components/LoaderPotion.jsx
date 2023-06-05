import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function LoaderPotions() {
   return (
      <Stack className='w-[900px] flex flex-col gap-5'>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
         <Skeleton variant='rounded' height={100} animation='pulse'/>
      </Stack>
   );
}
