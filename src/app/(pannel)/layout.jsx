import "./../../../src/app/globals.css";




export default function PannelLayout({ children }) {
  return (
      <div
        className={`antialiased`}
      >
         {children}
      </div>
  );
}
