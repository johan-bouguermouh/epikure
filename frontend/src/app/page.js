"use client";

import React from 'react';
import { useIsProducerContext } from '../context/IsProducerContext';
import HeroBannerComponent from '../components/HeroBannerComponent';
import ExplanationCardComponent from '../components/ExplanationCardComponent';
import CommentaryComponent from '../components/CommentaryComponent';

export default function HomePage() {
  const { isProducer } = useIsProducerContext();

  return (
    <main className="min-h-screen bg-slate-50">
      <HeroBannerComponent
        isProducer={isProducer}
      />
      <ExplanationCardComponent
        isProducer={isProducer}
      />
      <CommentaryComponent
        isProducer={isProducer}
      />
    </main>
  );
}
