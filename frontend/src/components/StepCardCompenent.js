"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Image01 from "../../public/step_img/image01.png";
import Image02 from "../../public/step_img/image02.png";
import Image03 from "../../public/step_img/image03.png";
import Image11 from "../../public/step_img/image11.png";
import Image12 from "../../public/step_img/image12.png";
import Image13 from "../../public/step_img/image13.png";
import Number_one from "../../public/numbers_img/number-one.svg";
import Number_two from "../../public/numbers_img/number-two.svg";
import Number_three from "../../public/numbers_img/number-three.svg";

function StepCardCompenent({ isProducer }) {
  const cardContent = isProducer
    ? [
        {
          text: "Inscription : Rejoignez notre plateforme en créant un profil de producteur, et mettez en avant vos produits et pratiques agricoles.",
          img: Image11,
        },
        {
          text: "Vente : Utilisez notre application pour informer les consommateurs des produits disponible et des points de collectes ou de ventes dans les commerces partenaires.",
          img: Image12,
        },
        {
          text: "Engagement : Renforcez les liens avec vos clients grâce à des échanges directes et transparent, tout en recevant des retours sur vos produits pour continuellement améliorer votre offre.  ",
          img: Image13,
        },
      ]
    : [
        {
          text: "Accessibilité : Trouvez facilement des produits locaux et de qualité près de chez vous grâce à notre application.",
          img: Image01,
        },
        {
          text: "Sélection : Découvrez une large gamme de produits locaux et de qualité, et trouvez ceux qui correspondent à vos besoins et vos envies.",
          img: Image02,
        },
        {
          text: "Engagement : Renforcez les liens avec les producteurs locaux en échangeant directement avec eux, et en leur donnant des retours sur leurs produits pour les aider à s'améliorer.",
          img: Image03,
        },
      ];

  return (
    <div className="flex flex-col bg-slate-50">
      <div className="flex flex-col self-center bg-slate-50 w-4/5 space-y-4">
        <h2 className="text-3xl text-center">
          {isProducer
            ? "Les avantages d'EPIKURE pour les producteurs"
            : "Les avantages d'EPIKURE pour les consomm'ateurs"}
        </h2>
        <p className="text-center">
          {isProducer
            ? "Découvrez comment notre application peut vous aider à faire connaître vos produits et à atteindre de nouveaux clients."
            : "Découvrez comment notre application peut vous aider à trouver des produits locaux et de qualité près de chez vous."}
        </p>
      </div>
      <div className="flex flex-col self-center bg-slate-50 w-4/5 space-y-4 p-16">
        <Card className="flex flex-row-reverse justify-start shadow-none border-none w-5/12 py-4">
          <CardHeader className="px-0 self-center">
            <Image src={Number_one} alt="Numéro 1" className="-ml-16 z-10" />
          </CardHeader>
          <CardContent className="flex flex-col -mx-6 w-3/4">
            <Image
              src={cardContent[0].img}
              alt="test img"
              className="w-4/5 self-end h-auto"
            />
            <p className="w-4/5 z-10">{cardContent[0].text}</p>
          </CardContent>
        </Card>

        <Card className="flex flex-row self-end shadow-none border-none w-5/12 py-4">
          <CardHeader className="px-0 self-center z-10">
            <Image src={Number_two} alt="Numéro 2" className="p-8" />
          </CardHeader>
          <CardContent className="flex flex-col -mx-6 w-3/4 -ml-28">
            <Image
              src={cardContent[1].img}
              alt="test img"
              className="w-4/5 h-auto"
            />
            <p className="w-4/5 z-10 self-end">{cardContent[1].text}</p>
          </CardContent>
        </Card>

        <Card className="flex flex-row-reverse justify-start shadow-none border-none w-5/12 py-4">
          <CardHeader className="px-0 self-center">
            <Image src={Number_three} alt="Numéro 3" className="-ml-16 z-10" />
          </CardHeader>
          <CardContent className="flex flex-col -mx-6 w-3/4">
            <Image
              src={cardContent[2].img}
              alt="test img"
              className="w-4/5 self-end h-auto"
            />
            <p className="w-4/5 z-10">{cardContent[2].text}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StepCardCompenent;
