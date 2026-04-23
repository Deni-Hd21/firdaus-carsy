import Hero from "../components/Hero";
import Katalog from "../components/Katalog";
import TentangKami from "../components/TentangKami";
import Testimoni from "../components/Testimoni";
import Kontak from "../components/Kontak";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Katalog />
      <TentangKami />
      <Testimoni />
      <Kontak />
      <Footer />
    </main>
  );
}