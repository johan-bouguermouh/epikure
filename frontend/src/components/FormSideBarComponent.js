import { BadgeCheck, Info, Rocket, UserRoundPen } from "lucide-react";
import Image from "next/image";
import BgImg from "../../public/bg-sidebar.jpg";

const step = {
  label: [
    "Informations personnelles",
    "Vérification des informations",
    "Profil publique",
    "Commencer l'aventure",
  ],
  subLabel: [
    "Création du compte",
    "Remplissez/Vérifiez vos informations",
    "Compléter votre profil",
    "Bienvenue sur Epikure",
  ],
  icons: [
    <Info className="h-10 w-10 p-2 rounded-full text-white " />,
    <BadgeCheck className="h-10 w-10 p-2 rounded-full text-white " />,
    <UserRoundPen className="h-10 w-10 p-2 rounded-full text-white " />,
    <Rocket className="h-10 w-10 p-1 rounded-md text-white hover:bg-white/30 hover:backdrop-blur-md" />,
  ],
};

function FormSideBarComponent() {
  return (
    <div className="relative h-full">
      <Image
        src={BgImg}
        alt="BackgroundSidebar"
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute top-0 left-0 py-8 px-8 flex flex-col gap-6">
        <ProgressStep />
        <ProgressStep />
        <ProgressStep />
        <ProgressStep />
        <ProgressStep />
      </div>
    </div>
  );
}

export default FormSideBarComponent;

function ProgressStep() {
  return (
    <div className="flex gap-6 items-center">
      <div className="">
        <Rocket className="h-10 w-10 p-1 rounded-md text-white hover:bg-white/30 hover:backdrop-blur-md" />
      </div>
      <div>
        <p className="text-dark-secondary-50 font-rubik font-extrabold uppercase">
          Label
        </p>
        <p
          className="text-dark-secondary-50 font-rubik font-medium"
        >
          subLabel
        </p>
      </div>
    </div>
  );
}
