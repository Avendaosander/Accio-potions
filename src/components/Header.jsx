import { GiStandingPotion } from 'react-icons/gi'
import GitHubIcon from '@mui/icons-material/GitHub'

function Header() {
   return (
      <header className='flex justify-between items-center px-10 py-4 bg-fuchsia-900'>
         <h1 className='font-bold text-xl text-purple-200 flex justify-center items-center'>
            <GiStandingPotion className='text-2xl mr-2' />
            Accio Potions
         </h1>
         <section className='flex gap-2 sm:gap-5'>
            <p className='font-bold text-purple-200 hidden sm:block'>Desarrollador:</p>
            <p className='font-bold text-purple-200 text-sm sm:text-base'>Alexander Avendaño</p>
            <a
               href='https://github.com/Avendaosander/Accio-potions'
               target='_blank'
               className='flex items-center'
               rel='noreferrer'
            >
               <GitHubIcon className='text-white hover:scale-110 text-2xl' />
            </a>
         </section>
      </header>
   )
}

export default Header
