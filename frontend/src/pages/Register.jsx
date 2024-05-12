import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footeer';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="container mx-auto mt-10" style={{ flex: 1, overflow: 'auto' }}>
          <RegisterForm route="/account/register/" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Register;