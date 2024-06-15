// Home.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import CertifHome from '../components/CertifHome';
import Carousel from '../components/Carousel';
import Cards from '../components/Cards';
import Footer from '../components/Footeer';
import CategoryGrid from '../components/CategoryGrid';
import TrustedPartners from '../components/TrustedPartners';

function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <CertifHome />
      <div className="bg-gray-100 py-8"> {/* Adjust padding here */}
        <CategoryGrid />
      </div>
      <TrustedPartners />
      <Cards />
      <Footer />
      {/* Rest of the Home component */}
    </div>
  );
}

export default Home;
