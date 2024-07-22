"use client";

import React from 'react';
import { useIsProducerContext } from '../context/IsProducerContext';


function HeroBannerComponent({ isProducer, onConsoAction }) {
    const { setIsProducer } = useIsProducerContext();

    const handleConsoAction = () => {
        console.log("Consumer action");
        if (onConsoAction) {
            onConsoAction();
        }
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
        <section className="bg-slate-50 text-black flex flex-col justify-center items-start py-16 px-8 text-left h-[85vh]">
            <h1 className="text-5xl mb-4">EPIKURE: Votre épicerie locale,<br></br> notre fierté agricole</h1>
            <div className="flex justify-start space-x-4">
                {buttonsContent.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.action}
                        className={`p-4 font-semibold rounded ${index % 2 === 0 ? 'bg-primary/500 text-white' : 'border border-primary-600 text-primary-600'}`}
                    >
                        {button.title}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default HeroBannerComponent;
