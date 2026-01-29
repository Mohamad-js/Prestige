import Menu from "@/components/ui/menu";
import { MeshGradientBg } from "@/components/ui/paper-mesh";



export default function Home() {
	return (
		<div className="absolute w-full flex flex-col gap-5 min-h-screen items-center justify-center">
			<div className="w-full h-full absolute">
            <MeshGradientBg />
         </div>

         <div className="p-5 pb-1 text-white text-7xl rounded-3xl bg-[#ffffff36] backdrop-blur-lg border border-gray-300 flex items-center justify-center">
            PMC
         </div>

         <p className="text-white text-xs tracking-widest">PRESTIGE MODELING COMPANY</p>

		</div>
	);
}
