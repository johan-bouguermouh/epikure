import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    siretOrSiren: '',
    legalStatus: '',
    businessName: '',
    postalCode: '',
    city: '',
    gender: '',
    isBio: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    shortDescription: '', // Nouveau champ pour la courte description
    longDescription: '',  // Nouveau champ pour la longue description
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '57b85176-1ec1-309e-99ec-f3131f9c42b8';

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const fetchCompanyDetails = async (siretOrSiren) => {
    setLoading(true);
    setError('');
    try {
      let response;
      const isSIREN = siretOrSiren.length === 9;
      const isSIRET = siretOrSiren.length === 14;

      if (isSIREN) {
        response = await axios.get(
          `https://api.insee.fr/entreprises/sirene/V3.11/siren/${siretOrSiren}`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Accept': 'application/json'
            }
          }
        );

        const { uniteLegale } = response.data;
        const { periodesUniteLegale } = uniteLegale;
        const latestPeriod = periodesUniteLegale.reduce((latest, current) =>
          new Date(current.dateDebut) > new Date(latest.dateDebut) ? current : latest
        );

        updateFormData({
          businessName: latestPeriod.denominationUniteLegale,
        });
      } else if (isSIRET) {
        response = await axios.get(
          `https://api.insee.fr/entreprises/sirene/V3.11/siret/${siretOrSiren}`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Accept': 'application/json'
            }
          }
        );

        const { etablissement } = response.data;

        const denominationUniteLegale = etablissement.uniteLegale.denominationUniteLegale;
        const codePostalEtablissement = etablissement.adresseEtablissement.codePostalEtablissement;
        const libelleCommuneEtablissement = etablissement.adresseEtablissement.libelleCommuneEtablissement;

        updateFormData({
          businessName: denominationUniteLegale,
          postalCode: codePostalEtablissement,
          city: libelleCommuneEtablissement,
        });
      } else {
        setError('Le numéro SIRET/SIREN est invalide.');
        return;
      }

      nextStep();
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setError('Une erreur s\'est produite lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, step, nextStep, prevStep, fetchCompanyDetails, loading, error }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);