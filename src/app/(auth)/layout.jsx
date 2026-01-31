import "./../globals.css";




export default function AuthLayout({ children }) {
  return (
      <div
        className={`antialiased`}
      >

         {children}
      </div>
  );
}
