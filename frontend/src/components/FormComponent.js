"use client";

import { useFormContext } from "../context/FormContext";
import FormCompanyInfoComponent from "./FormCompanyInfoComponent";
import FormOtherComponent from "./FormOtherComponent";
import FormProfilComponent from "./FormProfilComponent";
import FormWelcomeToEpikure from "./FormWelcomeToEpikure";

function FormComponent() {
  const { step } = useFormContext();

  switch (step) {
    case 1:
      return (
        <div className="w-full rounded-lg shadow-md p-4">
          <FormCompanyInfoComponent />
        </div>
      );
    case 2:
      return (
        <div className="w-full rounded-lg shadow-md p-4">
          <FormOtherComponent />
        </div>
      );
    case 3:
      return (
        <div className="w-full rounded-lg shadow-md p-4">
          <FormProfilComponent />
        </div>
      );
    case 4:
      return (
        <div className="w-full rounded-lg shadow-md p-4">
          <FormWelcomeToEpikure />
        </div>
      );
    default:
      return (
        <div className="w-full rounded-lg shadow-md p-4">
          <FormCompanyInfoComponent />
        </div>
      );
  }
}

export default FormComponent;
