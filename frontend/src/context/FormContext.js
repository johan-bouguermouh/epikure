import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import FarmerService from "@/services/farmer.services";
import UploadPictureService from "@/services/upload-picture.service";
import UserService from "@/services/user.service";

const FormContext = createContext();

export function FormProvider({ children }) {
  const uploadService = new UploadPictureService();
  const farmerService = new FarmerService();
  const userService = new UserService();
  const [formData, setFormData] = useState({
    siretOrSiren: "",
    siretNumber: "",
    sireneNumber: "",
    socialReasonName: "",
    publicName: "",
    address: "",
    zipCode: "",
    city: "",
    gender: "",
    isBio: false,
    managerLastName: "",
    managerFirstName: "",
    email: "",
    password: "",
    shortDescription: "", // Nouveau champ pour la courte description
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);

  // useEffect(() => {
  //   console.log("Banner Image:", bannerImage);
  //   console.log("Avatar Image:", avatarImage);
  // }, [bannerImage, avatarImage]);

  const API_KEY = "57b85176-1ec1-309e-99ec-f3131f9c42b8";

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const getBodyToPostFarmer = () => {
    console.log("formData", formData);
    const {
      siretNumber,
      sireneNumber,
      socialReasonName,
      address,
      zipCode,
      city,
      isBio,
      managerLastName,
      managerFirstName,
      publicName,
      avatarUrl,
      bannerUrl,
      shortDescription,
      description,
      latitude,
      longitude,
    } = formData;

    return {
      siretNumber,
      sireneNumber,
      socialReasonName,
      address,
      zipCode,
      city,
      isBio,
      managerLastName,
      managerFirstName,
      publicName,
      avatarUrl,
      bannerUrl,
      shortDescription,
      description,
      latitude,
      longitude,
      userId: 0,
    };
  };

  const getBodyToInsertUser = () => {
    const { email, password } = formData;
    return { email, password, isFarmer: true };
  };

  const uploadAvatar = async (avatarFile) => {
    const response = await uploadService.upload(avatarFile);

    if (response) {
      updateFormData({ avatarUrl: response });
      return { avatarUrl: response };
    }
  };

  const uploadBanner = async (bannerFile) => {
    const response = await uploadService.upload(bannerFile);

    if (response) {
      updateFormData({ bannerUrl: response });
      return { bannerUrl: response };
    }
  };

  const genderIs = () => {
    const { gender } = formData;
    return gender;
  };

  const fetchCompanyDetails = async (body) => {
    setLoading(true);
    setError("");
    try {
      farmerService.getFarmerInfo(body).then((response) => {
        if (response === null) {
          setError("Aucune entreprise trouvée avec ce numéro SIRET/SIREN.");
          return;
        }
        updateFormData(response);
        nextStep();
      });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setError("Une erreur s'est produite lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  const insertFarmerInfos = async () => {
    setLoading(true);
    setError("");
    try {
      const userbody = getBodyToInsertUser();
      const { id: userId } = await userService.add(userbody);
      //si tout ce passe bien on upload les images
      const avatarFile = avatarImage;
      // Si l'avatar image est null alors on ne fait pas l'upload
      let avatarUrl = null;
      if (avatarFile) {
        const { avatarUrl: returnUrl } = await uploadAvatar(avatarFile);
        avatarUrl = returnUrl;
      }
      const bannerFile = bannerImage;
      let bannerUrl = null;
      if (bannerFile) {
        const { bannerUrl: returnUrl } = await uploadBanner(bannerFile);
        bannerUrl = returnUrl;
      }
      // On met à jour les données du formulaire avec les urls des images
      const farmerBody = getBodyToPostFarmer();
      // On ajoute l'id de l'utilisateur
      farmerBody.userId = userId;
      // On ajoute les urls des images
      farmerBody.avatarUrl = avatarUrl;
      farmerBody.bannerUrl = bannerUrl;

      // On insère les données de l'agriculteur
      const resultFarmer = await farmerService.add(farmerBody);
      console.log("resultFarmer", resultFarmer);
    } catch (error) {
      console.error("Erreur lors de l'insertion:", error);
      setError("Une erreur s'est produite lors de l'insertion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        step,
        nextStep,
        prevStep,
        fetchCompanyDetails,
        loading,
        error,
        bannerImage,
        setBannerImage,
        avatarImage,
        setAvatarImage,
        insertFarmerInfos,
        genderIs,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
