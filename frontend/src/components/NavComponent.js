"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo/Epikure_dark.svg";
import { useFarmerContext } from "../context/IsProducerContext";
import FormLoginComponent from "./inscription-form/FormLoginComponent"; // Assurez-vous que le chemin est correct
import ModalComponent from "./ModalComponent"; // Assurez-vous que le chemin est correct

function NavComponent() {
  const { setIsProducer } = useFarmerContext();
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la modal

  const handleProducer = () => {
    setIsProducer(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header>
      <nav className="bg-slate-50 flex justify-between items-center px-10 py-4 w-full">
        <Image
          src={Logo}
          alt="Epikure Logo"
          className="cursor-pointer w-40 h-10"
          onClick={handleProducer}
        />
        <button
          onClick={openModal}
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          Espace Producteur(trice)
        </button>
      </nav>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <FormLoginComponent />
      </ModalComponent>
    </header>
  );
}

export default NavComponent;
