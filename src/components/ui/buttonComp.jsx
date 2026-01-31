



function Button({onClick}){




   return(
      <button
         onClick={onClick}
         className="group/button cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white/50 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 active:bg-pink-500"
      >
         <span className="text-xs text-pink-500">Log in</span>
         <div
            className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:transform-[skew(-13deg)_translateX(100%)]"
         >
            <div className="relative h-full w-10 bg-black/10"></div>
         </div>
      </button>
   )
}

export default Button;