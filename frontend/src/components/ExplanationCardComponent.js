"use client";

import React from 'react';
import Image from 'next/image';
import Image01 from '../../public/explanation_img/image01.png';
import Image02 from '../../public/explanation_img/image02.png';
import Image03 from '../../public/explanation_img/image03.png';
import Image04 from '../../public/explanation_img/image04.png';
import Image11 from '../../public/explanation_img/image11.png';
import Image12 from '../../public/explanation_img/image12.png';
import Image13 from '../../public/explanation_img/image13.png';
import Image14 from '../../public/explanation_img/image14.png';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const CardComponent = ({ isProducer }) => {
    const cardsContent = isProducer ? [
        {
            title: 'Promotions des points de ventes',
            description: 'Notre application met en avant les points de vente des producteurs locaux, facilitant ainsi la connexion entre les agriculteurs et les consommateurs et encourageant la consommation de produits locaux.',
            image: Image11
        },
        {
            title: 'Calendrier saisonnier des produits',
            description: 'Notre plateforme permet aux consommateurs de connaître les fruits et légumes disponibles à chaque saison, ce qui crée une demande ciblée pour les produits des agriculteurs et encourage la consommation de produits saisonniers.',
            image: Image12
        },
        {
            title: 'Inspiration culinaire et conseils',
            description: 'Notre application propose des recettes, idées et conseils pour les consomm\'acteurs, ce qui crée une demande accrue pour les produits des agriculteurs et encourage la créativité culinaire.',
            image: Image13
        },
        {
            title: 'Visibilité et présence en ligne accrue',
            description: ' Notre plateforme permet aux agriculteurs de gagner en visibilité en les aidant à se faire connaître auprès d\'une clientèle plus large et plus engagée, ce qui peut se traduire par une augmentation de leurs revenus et de leur notoriété.',
            image: Image14
        },
    ] : [
        {
            title: 'Proximité',
            description: 'Favoriser les circuit courts pour garantir la fraicheur des produits et soutenir l\'économie locale.',
            image: Image01
        },
        {
            title: 'Qualité',
            description: 'Sélectionner des produits de hautes qualités, issus de pratiques agricoles respectueuses de l\'environnement.',
            image: Image02
        },
        {
            title: 'Transparence',
            description: 'Assurer une traçabilité complète des produits pour une consommation éclairée.',
            image: Image03
        },
        {
            title: 'Communauté',
            description: 'Créer un lien fort entres Producteurs et Consom\'acteur, basée sur la confiance et l\'échange.',
            image: Image04
        },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-8 text-center">{isProducer ? 'Rejoignez-nous en tant que Producteur' : 'Chez EPIKURE, nous croyons en une alimentation saine, locale et durable.'}</h2>
                <p className="text-lg text-center mb-8">{isProducer ? 'Commencez à vendre vos produits aujourd\'hui même.' : 'Nos valeurs fondamentales sont:'}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12">
                    {cardsContent.map((card, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Image src={card.image} alt={`Image ${index + 1}`} className="mb-4" />
                            </CardHeader>
                            <CardContent className="flex-col justify-between items-center">
                                <CardTitle className="my-4">{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CardComponent;
