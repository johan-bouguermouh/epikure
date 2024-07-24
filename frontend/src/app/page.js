"use client";

//<<<<<<< 44-dashboard--init
import React, { useRef } from 'react';
import { useIsProducerContext } from '../context/IsProducerContext';
import HeroBannerComponent from '../components/HeroBannerComponent';
import ExplanationCardComponent from '../components/ExplanationCardComponent';
import CommentaryComponent from '../components/CommentaryComponent';
import NavComponent from '@/components/NavComponent';
import FooterComponent from '@/components/FooterComponent';
//=======
import { useRef } from "react";
import CommentaryComponent from "../components/CommentaryComponent";
import ExplanationCardComponent from "../components/ExplanationCardComponent";
import FooterComponent from "../components/FooterComponent";
import HeroBannerComponent from "../components/HeroBannerComponent";
import NavComponent from "../components/NavComponent";
import StepCardComponent from "../components/StepCardCompenent";
import { useIsProducerContext } from "../context/IsProducerContext";
//>>>>>>> web

export default function HomePage() {
  const { isProducer } = useIsProducerContext();
  const productSectionRef = useRef(null);

  const scrollToProductSection = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
//<<<<<<< 44-dashboard--init
<>
    <NavComponent />
    <main className="min-h-screen bg-slate-50">
      <HeroBannerComponent
        isProducer={isProducer}
        onConsoAction={scrollToProductSection}
      />
      <div ref={productSectionRef} className="bg-primary/500 text-white p-5 text-center">
        <h4>EPIKURE: Votre épicerie locale, notre fierté agricole</h4>
      </div>
      <ExplanationCardComponent
        isProducer={isProducer}
      />
      <CommentaryComponent
        isProducer={isProducer}
      />
    </main>
    <FooterComponent />
//=======
    <>
      <NavComponent />
      <main className="min-h-screen bg-slate-50">
        <HeroBannerComponent
          isProducer={isProducer}
          onConsoAction={scrollToProductSection}
        />
        <div
          ref={productSectionRef}
          className="bg-primary/500 text-white p-5 text-center"
        >
          <h4>EPIKURE: Votre épicerie locale, notre fierté agricole</h4>
        </div>
        <ExplanationCardComponent isProducer={isProducer} />
        <StepCardComponent isProducer={isProducer} />
        <CommentaryComponent isProducer={isProducer} />
      </main>
      <FooterComponent />
//>>>>>>> web
    </>
  );
}
