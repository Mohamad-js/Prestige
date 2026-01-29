import Image from 'next/image';



function Navbar(){




	return(
		
		<div className='absolute w-full h-10 flex justify-end items-start p-3 z-1'>
         <div className="relative w-10 h-10">
			   <Image className='objext-cover' src="/Assets/logo.png" fill alt="Logo"/>
         </div>
		</div>
		
	)
}

export default Navbar;