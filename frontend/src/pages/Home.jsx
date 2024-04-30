// Home.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import CertifHome from '../components/CertifHome';
import Carousel from '../components/Carousel';
import Cards from '../components/Cards';
import Footer from '../components/Footeer';

function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <CertifHome />
      <Carousel />
      <Cards />
      <Footer />
      {/* Rest of the Home component */}
    </div>
  );
}

export default Home;