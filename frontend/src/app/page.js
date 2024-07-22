"use client";

import React, { useRef } from 'react';
import { useIsProducerContext } from '../context/IsProducerContext';
import HeroBannerComponent from '../components/HeroBannerComponent';
import ExplanationCardComponent from '../components/ExplanationCardComponent';
import CommentaryComponent from '../components/CommentaryComponent';
import StepCardComponent from '@/components/StepCardCompenent';

export default function HomePage() {
  const { isProducer } = useIsProducerContext();
  const productSectionRef = useRef(null);

  const scrollToProductSection = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
      <StepCardComponent
      isProducer={isProducer} 
      />
      <CommentaryComponent
        isProducer={isProducer}
      />
    </main>
  );
}
