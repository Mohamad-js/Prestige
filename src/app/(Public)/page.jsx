
import FloatingLines from "@/components/ui/floating-lines";



function Home(){




   return(
      <div className="w-full min-h-dvh bg-[#1e0036]">

         <div className="w-full h-full relative">
            <FloatingLines 
               enabledWaves={["top","middle","bottom"]}
               lineCount={5}
               lineDistance={5}
               bendRadius={5}
               bendStrength={-0.5}
               interactive={true}
               parallax={true}
            />
         </div>
         
      </div>
   )
}

export default Home;