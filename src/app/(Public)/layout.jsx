import Navbar from "@/components/ui/navbar";
import Menu from "@/components/ui/menu";
import "./../../../src/app/globals.css";




export default function PublicLayout({ children }) {
  return (
      <div
        className={`antialiased`}
      >
         <Navbar />
         {children}
      </div>
  );
}
