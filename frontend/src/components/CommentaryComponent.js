import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

function CommentaryComponent({ isProducer }) {
    const comments = isProducer ? [
        {
            id: 1,
            text: "En tant que producteur, je suis ravi de rejoindre la plateforme EPIKURE. Cela m'a permis de toucher une clientèle plus large et de vendre mes produits plus facilement.",
            author: "Jean Martin",
        },
        {
            id: 2,
            text: "Grâce à EPIKURE, j'ai pu augmenter mes ventes et ma visibilité en ligne. Je recommande vivement cette plateforme à tous les producteurs locaux.",
            author: "Marie Dupont",
        },
        {
            id: 3,
            text: "EPIKURE m'a aidé à élargir mon réseau de clients et à vendre mes produits plus rapidement. Je suis très satisfait des services proposés.",
            author: "Paul Leblanc",
        },
    ] : [
        {
            id: 1,
            text: "Ce produit est fantastique! Je le recommande vivement à tout le monde.",
            author: "Jean Dupont",
        },
        {
            id: 2,
            text: "Une qualité exceptionnelle et un service rapide. Je suis très satisfait!",
            author: "Marie Curie",
        },
        {
            id: 3,
            text: "Une expérience incroyable! Les produits sont toujours frais et délicieux.",
            author: "Paul Martin",
        },
        {
            id: 4,
            text: "Le meilleur endroit pour acheter des produits locaux. Hautement recommandé.",
            author: "Lucie Leblanc",
        },
    ];

    return (
        <section className="relative bg-gray-50 py-16 px-8">
            <h2 className="text-4xl font-bold mb-4 text-center">{isProducer ? "Ce que disent nos partenaires" : "Ils parlent de nous"}</h2>
            <p className="text-lg mb-8 text-center">
                {isProducer ? "Découvrez les témoignages de nos producteurs partenaires." : "Découvrez les avis de nos clients."}
            </p>
            <div className="flex justify-center">
                <Carousel className="w-full">
                    <CarouselContent className="flex gap-8 w-full px-16">
                        {comments.map((comment) => (
                            <CarouselItem key={comment.id} className="flex-none w-full sm:w-1/2 p-4">
                                <div className="relative bg-white shadow-lg rounded-lg p-6 h-full flex flex-col justify-between">
                                    <p className="text-lg italic mb-4 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300">
                                        "{comment.text}"
                                    </p>
                                    <div className="flex items-center mt-4">
                                        <Avatar className="w-12 h-12 mr-4">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span className="font-bold">{comment.author}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-100 transition-opacity duration-150 p-6">
                                        <p className="text-lg italic mb-4">"{comment.text}"</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl">
                        &lt;
                    </CarouselPrevious>
                    <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl">
                        &gt;
                    </CarouselNext>
                </Carousel>
            </div>
        </section>
    );
}

export default CommentaryComponent;
