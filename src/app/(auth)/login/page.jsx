'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MeshGradientBg } from "@/components/ui/paper-mesh";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "@/components/ui/buttonComp";


function Login(){
   const [userValue, setUserValue] = useState('')
   const [passValue, setPassValue] = useState('')

   const router = useRouter()

   const checkUser = () => {
      if(userValue === 'admin' && passValue === 'admin'){
         localStorage.setItem('State', true)
         router.push('/planner')
      } else {
         localStorage.setItem('State', false)
         alert('Invalid Credentials')
      }
   }

   const goBack = () => {
      router.back()
   }


   return(
      <div className="absolute w-full flex flex-col gap-5 min-h-screen items-center justify-center">
         <MeshGradientBg />

         <div className="w-fit h-fit absolute p-5 text-white left-0 top-0 flex justify-between items-center gap-5 border-b border-white/0 hover:border-white"
            onClick={goBack}
         >
            <IoArrowBackOutline />
            <div className="">Back</div>
         </div>

         <div className="w-70 h-100 bg-white/30 px-5 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col justify-evenly items-center">
            <div className="w-full flex flex-col items-center">
               <div className="relative w-1/2 h-11">
                  <Image className="w-full h-full object-contain" src="/Assets/Logo-W.png" fill size={50} alt="Logo" />
               </div>
               <div className="text-xs tracking-widest text-white/50">YOUR PERSONAL PLANNER</div>
            </div>

            <div className="text-lg font-semibold text-white">Welcome to Clocky!</div>

            <div className="w-full flex flex-col gap-5 justify-between text-white">
               <input className="bg-white/50 rounded-lg p-2 text-xs outline-none focus:bg-white border transition-all hover:border-white text-gray-500" 
                  type="text" 
                  placeholder="Username"
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
               />

               <input className="bg-white/50 rounded-lg p-2 text-xs outline-none focus:bg-white border transition-all hover:border-white text-gray-500"
                  type="password"
                  placeholder="Password"   
                  value={passValue}
                  onChange={(e) => setPassValue(e.target.value)}
               />
            </div>

            <div className="w-full flex gap-1 justify-end">
               <Button onClick={checkUser} />
            </div>

         </div>
      </div>
   )
}

export default Login;