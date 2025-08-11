import React, { useState } from "react";
import Step1AccountSetup from "../components/onboarding/Step1AccountSetup";
import Step2BrandInfo from "../components/onboarding/Step2BrandInfo";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    brandType: "",
    description: "",
    website: "",
    logo: null,
    registrationDoc: null,
    declarationForm: null,
    storePhoto: null,
    socialLinks: {},
    govID: null,
    selfie: null,
    repName: "",
    repPosition: "",
    lookbook: null,
    shopLink: "",
    products: [],
    termsAccepted: false,
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Submitting onboarding data", formData);
  };

  const steps = [
    <Step1AccountSetup formData={formData} handleChange={handleChange} handleNext={handleNext} />,
    <Step2BrandInfo formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
  ];

  return <>{steps[activeStep]}</>;
};

export default SignUp;
