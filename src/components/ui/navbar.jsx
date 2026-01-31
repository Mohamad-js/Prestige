'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { VscAccount } from "react-icons/vsc";



function Navbar(){
   const path = usePathname();



	return(
		
		<div className='fixed w-full h-15 flex justify-between items-center p-5 z-1'>
         <div className="relative w-20 h-10">
			   <Image className='object-contain' src="/Assets/Logo-W.png" size={100} fill alt="Logo"/>
         </div>

         <div className="w-full h-fit flex justify-center items-center gap-1">
            <Link href='/'>
               <div className={`text-white text-xs py-2 px-6 font-semibold rounded-2xl ${path === '/' ? 'border border-white' : 'cursor-pointer hover:bg-white/10'}`}>
                     Home
               </div>
            </Link>
            <Link href='/documentations'>
               <div className={`text-white text-xs py-2 px-6 font-semibold rounded-2xl ${path === '/documentations' ? 'border border-white' : 'cursor-pointer hover:bg-white/10'}`}>
                     Documentations
               </div>
            </Link>
            <Link href='/about'>
               <div className={`text-white text-xs py-2 px-6 font-semibold rounded-2xl ${path === '/about' ? 'border border-white' : 'cursor-pointer hover:bg-white/10'}`}>
                     About Us
               </div>
            </Link>
            <Link href='/contact'>
               <div className={`text-white text-xs py-2 px-6 font-semibold rounded-2xl ${path === '/contact' ? 'border border-white' : 'cursor-pointer hover:bg-white/10'}`}>
                     Contact Us
               </div>
            </Link>
         </div>

         <div className="w-fit h-fit flex justify-center items-center cursor-pointer">
            <Link href='/login'>
               <VscAccount size={25} className='text-white' />
            </Link>
         </div>
		</div>
		
	)
}

export default Navbar;