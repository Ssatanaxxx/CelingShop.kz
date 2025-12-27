import React from 'react';
import Hero from '../components/Sections/Hero/Hero';
import About from '../components/Sections/About/About';
import Services from '../components/Sections/Services/Services';
import Gallery from '../components/Sections/Gallery/Gallery';
import Calculator from '../components/Sections/Calculator/Calculator';
import Guarantees from '../components/Sections/Guarantees/Guarantees';
import Contacts from '../components/Sections/Contacts/Contacts';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero id="hero" />
      <About id="about" />
      <Services id="services" />
      <Gallery id="gallery" />
      <Calculator id="calculator" />
      <Guarantees id="guarantees" />
      <Contacts id="contacts" />
    </div>
  );
};

export default Home;