import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Subjects from '../components/Subjects';
import Gallery from '../components/Gallery';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Subjects />
      <Gallery />
      <ContactSection />
      <Footer />
    </>
  );
}
