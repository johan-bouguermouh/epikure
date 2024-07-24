// src/components/FormSideBarComponent.js
"use client";

import { BadgeCheck, Info, Mail, Rocket, UserRoundPen } from "lucide-react";
import Image from "next/image";
import BgImg from "../../public/bg-sidebar.jpg";
import { useFormContext } from "../context/FormContext";

const steps = [
  {
    id: 1,
    icon: <Info />,
    completedIcon: <BadgeCheck />,
    label: "Informations personnelles",
    subLabel: "Création du compte",
  },
  {
    id: 2,
    icon: <Mail />,
    completedIcon: <BadgeCheck />,
    label: "Vérification des informations",
    subLabel: "Remplissez/Vérifiez vos informations",
  },
  {
    id: 3,
    icon: <UserRoundPen />,
    completedIcon: <BadgeCheck />,
    label: "Profil publique",
    subLabel: "Compléter votre profil",
  },
  {
    id: 4,
    icon: <Rocket />,
    completedIcon: <BadgeCheck />,
    label: "Commencer l'aventure",
    subLabel: "Bienvenue sur Epikure",
  },
];

function FormSideBarComponent() {
  const { step } = useFormContext();

  return (
    <div className="relative h-full shadow-md">
      <Image
        src={BgImg}
        alt="BackgroundSidebar"
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute top-0 left-0 py-6 px-8 flex flex-col ">
        <div className="flex flex-col gap-4">
          {steps.map((stepInfo, index) => {
            const isCompleted = index < step - 1;
            const isCurrent = step === stepInfo.id;

            return (
              <div
                key={stepInfo.id}
                className={`flex gap-2 ${
                  isCurrent ? "text-white" : "text-gray-400"
                } ${index <= step - 1 ? "cursor-pointer" : ""}`}
                style={{ opacity: index <= step - 1 ? 1 : 0.6 }}
              >
                <div className="text-2xl">
                  {isCompleted ? stepInfo.completedIcon : stepInfo.icon}
                </div>
                <div className="flex flex-col">
                  <h5 className={`uppercase ${isCurrent ? "font-bold" : ""}`}>
                    {stepInfo.label}
                  </h5>
                  <p className="text-sm">{stepInfo.subLabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FormSideBarComponent;
