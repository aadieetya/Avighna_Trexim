import { Element } from "react-scroll";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Team from "./components/Team.jsx";
import Clients from "./components/Clients.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx"
import GlobalReachSection from "./components/Countries.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Navbar is fixed/sticky so it’s outside <main> */}
      <Navbar />

      {/* Main content */}
      <main>
        <Element name="home">
          <Hero />
        </Element>

        <Element name="services">
          <Services />
        </Element>

        {/* <Element name="freight">
          <FreightCalculator />
        </Element> */}

        <Element name="about">
          <About />
        </Element>

        <Element name="certifications">
          <Work />
        </Element>

        <Element name="team">
          <Team />
        </Element>

        <Element name="contact">
          <Contact />
        </Element>

        {/* <Element name="clients">
          <Clients />
        </Element> */}
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}
