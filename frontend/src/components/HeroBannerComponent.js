"use client";

import Image from "next/image";
import BannerImg from "../../public/bg-landing-page.jpg";
import { useIsProducerContext } from "../context/IsProducerContext";

function HeroBannerComponent({ isProducer, onConsoAction }) {
  const { setIsProducer } = useIsProducerContext();

  const handleConsoAction = () => {
    console.log("Consumer action");
    if (onConsoAction) {
      onConsoAction();
    }
  };

  const handleFarmerAction = () => {
    setIsProducer(true);
    console.log("Farmer action");
  };

  const handleSignUp = () => {
    // Action for "S'inscrire maintenant"
    console.log("Sign Up action");
  };

  const handleLogin = () => {
    // Action for "Se connecter"
    console.log("Login action");
  };

  const buttonsContent = isProducer
    ? [
        { title: "S'inscrire maintenant", action: handleSignUp },
        { title: "Se connecter", action: handleLogin },
      ]
    : [
        { title: "Je cherche des produits", action: handleConsoAction },
        { title: "Je suis Producteur", action: handleFarmerAction },
      ];

  return (
    <section className="relative bg-slate-50 text-black flex flex-col justify-center items-start py-16 px-8 text-left h-[82vh] ">
      <Image
        src={BannerImg}
        alt="Hero banner image"
        className="absolute inset-0 h-full object-cover " // Places image behind other content
      />
      <div className="relative z-10">
        <h1 className="text-white text-5xl mb-4">
          EPIKURE: Votre épicerie locale,
          <br /> notre fierté agricole
        </h1>
        <div className="flex justify-start space-x-4 mt-4">
          {buttonsContent.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`p-4 font-semibold rounded ${
                index % 2 === 0
                  ? "bg-dark-secondary-500 text-white hover:bg-dark-secondary-300"
                  : "border border-dark-secondary-200 text-dark-secondary-200"
              }`}
            >
              {button.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroBannerComponent;
