import Navbar from "./components/navabar";
import Hero from "./components/hero";
import Mine from "./components/home";
import Featured from "./components/featured";
import Sticky from "./components/sticky";
import Mobile from "./components/mobile";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mine />
      <Featured />
      <Mobile />
      <Footer />
      <Sticky />
    </>
  );
}
