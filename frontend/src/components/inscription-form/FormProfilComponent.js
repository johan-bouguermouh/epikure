"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import BannerImg from "../../../public/bannerProfil.jpg";
// import ProfilImg from "../../public/profil.jpg";
import profilImgM from "../../../public/default_profil_M.png";
import profilImgF from "../../../public/default_profil_F.png";
import { useFormContext } from "../../context/FormContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

function FormProfilComponent() {
  const {
    formData,
    updateFormData,
    prevStep,
    nextStep,
    setBannerImage,
    setAvatarImage,
    insertFarmerInfos,
    genderIs,
  } = useFormContext(); // Accéder aux données du formulaire depuis le contexte
  const [bannerImg, setBannerImg] = useState(BannerImg);
  const [profileImg, setProfileImg] = useState(
    genderIs() === "M." ? profilImgM : profilImgF
  ); // État local pour l'image de profil
  const [username, setUsername] = useState(formData.username || ""); // État local pour le nom d'utilisateur
  const [shortDescription, setShortDescription] = useState(
    formData.shortDescription || ""
  ); // État local pour la courte description
  const [description, setDescription] = useState(formData.description || ""); // État local pour la longue description
  const textareaDescriptionRef = useRef(null);
  const textareaShortDescriptionRef = useRef(null); // Référence pour le champ de texte de la courte description
  const bannerFileInputRef = useRef(null);
  const profileFileInputRef = useRef(null); // Référence pour l'input de type file pour l'image de profil

  useEffect(() => {
    if (textareaDescriptionRef.current) {
      textareaDescriptionRef.current.style.height = "auto";
      textareaDescriptionRef.current.style.height = `${textareaDescriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  useEffect(() => {
    if (textareaShortDescriptionRef.current) {
      textareaShortDescriptionRef.current.style.height = "auto";
      textareaShortDescriptionRef.current.style.height = `${textareaShortDescriptionRef.current.scrollHeight}px`;
    }
  }, [shortDescription]);

  const handleBannerImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImg(reader.result);
      setBannerImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImg = (e) => {
    // Fonction pour gérer le changement de l'image de profil
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      setAvatarImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleFinalizeClick = () => {
    //nextStep();
    // Mettre à jour les données du formulaire globales
    updateFormData({ username, shortDescription, description });
    // Afficher les données du formulaire dans la console
    try {
      insertFarmerInfos()
        .then((res) => {
          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Banner Image */}
      <div className="h-64 rounded-b-md relative">
        <Image
          src={bannerImg}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:cursor-pointer flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white"
            onClick={() => bannerFileInputRef.current.click()}
          >
            <Pencil className="w-5 h-5" />
          </Button>
          <input
            type="file"
            ref={bannerFileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleBannerImg}
          />
        </div>
        {/* Profile Image */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Image
            src={profileImg}
            alt="Profile"
            width={120} // 36 * 4
            height={120} // 36 * 4
            className="object-cover border-4 border-white rounded-full shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:cursor-pointer flex items-center justify-center rounded-full">
            <Button
              type="button"
              variant="ghost"
              className="text-white hover:bg-transparent hover:text-white"
              onClick={() => profileFileInputRef.current.click()}
            >
              <Pencil className="w-5 h-5" />
            </Button>
            <input
              type="file"
              ref={profileFileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileImg}
            />
          </div>
        </div>
      </div>
      {/* Username Input */}
      <div className="mt-16">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* Short Description Textarea */}
      <div className="mt-4">
        <textarea
          ref={textareaShortDescriptionRef}
          placeholder="Présentez-vous en quelques mots (255 caractères max)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md overflow-hidden resize-none"
          rows="2"
          maxLength="255"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>
      {/* Long Description Textarea */}
      <div className="mt-4">
        <textarea
          ref={textareaDescriptionRef}
          placeholder="Décrivez votre métier et votre rapport à la terre (720 caractères max)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md overflow-hidden resize-none h-auto"
          maxLength="720"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Submit Button */}
      {/* <div className="mt-6 flex justify-center">
        <Button type="submit" className="bg-primary-500 text-white hover:bg-dark-primary-500" onClick={handleFinalizeClick}>
          Finaliser le profil
        </Button>
      </div> */}
      <div className=" mt-5 flex justify-between">
        <Button type="button" onClick={prevStep}>
          <ArrowLeft />
        </Button>
        <Button
          type="submit"
          className="bg-primary-500 text-white hover:bg-dark-primary-500"
          onClick={handleFinalizeClick}
        >
          Finaliser le profil
        </Button>
      </div>
    </div>
  );
}

export default FormProfilComponent;
