"use client";

import React from 'react';
import { useFormContext } from '../context/FormContext';
import FormCompanyInfoComponent from './FormCompanyInfoComponent';
import FormOtherComponent from './FormOtherCompenent';

function FormComponent() {
    const { step } = useFormContext();

    switch (step) {
        case 1:
            return <FormCompanyInfoComponent />;
        case 2:
            return <FormOtherComponent />;
        default:
            return <FormCompanyInfoComponent />;
    }
}

export default FormComponent;
