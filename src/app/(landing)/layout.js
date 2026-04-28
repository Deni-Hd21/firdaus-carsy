import Navbar from "../components/Navbar";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <WhatsAppFloat />
    </>
  );
}
