import { Pencil } from "lucide-react";
import Image from "next/image";
import BannerImg from "../../public/bannerProfil.jpg"
import ProfilImg from "../../public/profil.jpg"
import { Button } from "./ui/button";

function FormProfilComponent() {
  return (
    <div className="w-full mx-auto">
      {/* Banner Image */}
      <div className=" h-64 rounded-b-md relative">
        <Image
          src={BannerImg}
          alt="Banner"
          layout="fill" 
          objectFit="cover"
          className="absolute inset-0 rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100  hover:cursor-pointer flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white"
            //TODO: Add onClick event
          >
            <Pencil className="w-5 h-5 " />
          </Button>
        </div>
        {/* Profile Image */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 ">
          <Image
            src={ProfilImg}
            alt="Profile"
            width={120} // 36 * 4
            height={120} // 36 * 4
            className="object-cover border-4 border-white rounded-full shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100  hover:cursor-pointer flex items-center justify-center rounded-full">
          <Button
            type="button"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white"
            //TODO: Add onClick event
          >
            <Pencil className="w-5 h-5 " />
          </Button>
        </div>
        </div>
      </div>
      {/* Name Input */}
      <div className="mt-24">
        <input
          type="text"
          placeholder="Nom d'usage"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* Description Textarea */}
      <div className="mt-4">
        <textarea
          placeholder="Présentez-vous en quelques mots..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          rows="4"
        />
      </div>
      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <Button type="submit" className="bg-primary-500 text-white hover:bg-dark-primary-500">
          Finaliser le profil
        </Button>
      </div>
    </div>
  );
}

export default FormProfilComponent;
