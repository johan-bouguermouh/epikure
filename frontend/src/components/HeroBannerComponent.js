"use client";

import React from 'react';
import { useIsProducerContext } from '../context/IsProducerContext';


function HeroBannerComponent({ isProducer }) {
    const { setIsProducer } = useIsProducerContext();

    const handleConsoAction = () => {
        console.log("Consumer action");
    }

    const handleFarmerAction = () => {
        setIsProducer(true);
        console.log("Farmer action");
    }

    const handleSignUp = () => {
        // Action for "S'inscrire maintenant"
        console.log("Sign Up action");
    };

    const handleLogin = () => {
        // Action for "Se connecter"
        console.log("Login action");
    };

    const buttonsContent = isProducer ? [
        { title: 'S\'inscrire maintenant', action: handleSignUp },
        { title: 'Se connecter', action: handleLogin },
    ] : [
        { title: 'Je cherche des produits', action: handleConsoAction },
        { title: 'Je suis Producteur', action: handleFarmerAction },
    ];

    return (
        <section className="bg-slate-50 text-black py-16 px-8 text-left">
            <h1 className="text-5xl mb-4">EPIKURE: Votre épicerie locale,<br></br> notre fierté agricole</h1>
            <div className="flex justify-start space-x-4">
                {buttonsContent.map((button, index) => (
                    <button key={index} onClick={button.action} className="bg-blue-500 text-white py-2 px-4 rounded">
                        {button.title}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default HeroBannerComponent;
