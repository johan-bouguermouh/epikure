"use client";

import React from 'react';
import { Button } from "@/components/ui/button"; // Assurez-vous que ce chemin est correct
import { useRouter } from 'next/navigation';

function FormWelcomeToEpikure() {
    const router = useRouter();

    const handleGoToDashboard = () => {
        // Redirige l'utilisateur vers le tableau de bord
        // router.push('/dashboard'); // Assurez-vous que ce chemin correspond à celui de votre tableau de bord
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Commencer l'aventure</h1>
            <p className="text-lg mb-6">
                Bienvenue sur Épikure !
                <br /><br />
                Nous sommes ravis de vous accueillir sur Épikure, l'application qui révolutionne la façon dont les agriculteurs et les consommateurs se connectent.
                <br /><br />
                Chez Épikure, nous croyons fermement en la valeur des produits locaux et en l'importance de soutenir nos agriculteurs. C'est pourquoi nous avons créé une plateforme qui facilite les échanges directs et transparents entre ceux qui produisent et ceux qui consomment.
                <br /><br />
                Épikure est votre nouvel allié pour faire connaître vos produits et développer votre activité. Notre application vous offre une visibilité accrue et un accès direct à une communauté de consommateurs soucieux de la qualité et de l'origine de ce qu'ils consomment. Publiez vos produits, gérez vos commandes, et créez des relations durables avec vos clients.
            </p>
            <Button
                onClick={handleGoToDashboard}
                className="bg-primary-500 text-white hover:bg-primary-600"
            >
                Aller à mon tableau de bord
            </Button>
        </div>
    );
}

export default FormWelcomeToEpikure;
