import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footeer';
import PayementSuccess from '../components/PaymentSuccess';

function Success() {
    return (
        <>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
            <div className="container mx-auto mt-10" style={{ flex: 1, overflow: 'auto' }}> {/* Adjust margin top according to your design */}
            <PayementSuccess />
            </div>
            <Footer />
        </div>
        </>
    );
    }
    export default Success;