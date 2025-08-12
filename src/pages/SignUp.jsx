import React, { useState } from "react";
import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import Step1AccountSetup from "../components/onboarding/Step1AccountSetup";
import Step2BrandInfo from "../components/onboarding/Step2BrandInfo";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 6;
  const [stepValid, setStepValid] = useState(false);

  const [formData, setFormData] = useState({
    officialBrandName: "",
    businessEmail: "",
    username: "",
    businessId: "",
    address: "",
    country: "",
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

  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));
  const handleStepClick = (index) => setActiveStep(index);

  const handleSaveDraft = () => {
    localStorage.setItem("onboardingDraft", JSON.stringify(formData));
    alert("Draft saved locally");
  };

  const handleSubmitAll = () => {
    console.log("Final submit", formData);
  };

  const steps = [
    <Step1AccountSetup
      key={0}
      formData={formData}
      handleChange={handleChange}
      setStepValid={setStepValid}
    />,
    <Step2BrandInfo
      key={1}
      formData={formData}
      handleChange={handleChange}
      setStepValid={setStepValid}
    />,
    <div key={2}>Step 3 - Business Verification (todo)</div>,
    <div key={3}>Step 4 - Representative Identity (todo)</div>,
    <div key={4}>Step 5 - Portfolio (todo)</div>,
    <div key={5}>Step 6 - Terms & Review (todo)</div>,
  ];

  return (
    <OnboardingLayout
      activeStep={activeStep}
      totalSteps={totalSteps}
      stepValid={stepValid}
      onStepClick={handleStepClick}
      onPrev={handleBack}
      onNext={activeStep === totalSteps - 1 ? handleSubmitAll : handleNext}
      onSaveDraft={handleSaveDraft}>
      {steps[activeStep]}
    </OnboardingLayout>
  );
};

export default SignUp;
