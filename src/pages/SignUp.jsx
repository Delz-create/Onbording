import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import OnboardingLayout from "../layouts/OnboardingLayout";
import Step1AccountSetup from "../components/onboarding/Step1AccountSetup";
import Step2BrandInfo from "../components/onboarding/Step2BrandInfo";
import Step3BusinessVerification from "../components/onboarding/Step3BusinessVerification";
import Step4IdentityVerification from "../components/onboarding/Step4IdentityVerification";
import Step5PortfolioSubmission from "../components/onboarding/Step5PortfolioSubmission";
import Step6FinalReview from "../components/onboarding/Step6FinalReview";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 6;
  const [stepValid, setStepValid] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("onboardingData");
    return saved
      ? JSON.parse(saved)
      : {
          businessName: "",
          businessEmail: "",
          businessUsername: "",
          businessAddress: "",
          countryOfRegistration: "",

          brandType: [],
          brandDescription: "",
          brandTagline: "",
          brandWebsite: "",

          brandLogo: null,
          businessDoc: null,
          storeImage: null,
          govID: null,
          selfieOrPassport: null,
          lookbook: null,

          facebook: "",
          tiktok: "",
          instagram: "",

          termsAccepted: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("onboardingData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem("onboardingData", JSON.stringify(updated));
      return updated;
    });
  };

  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));
  const handleStepClick = (index) => setActiveStep(index);

  const handleSaveDraft = () => {
    localStorage.setItem("onboardingDraft", JSON.stringify(formData));
    alert("Draft saved locally");
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
    <Step3BusinessVerification
      key={2}
      formData={formData}
      handleChange={handleChange}
      setStepValid={setStepValid}
    />,
    <Step4IdentityVerification
      key={3}
      formData={formData}
      handleChange={handleChange}
      setStepValid={setStepValid}
    />,
    <Step5PortfolioSubmission
      key={4}
      formData={formData}
      handleChange={handleChange}
      setStepValid={setStepValid}
    />,
    <Step6FinalReview
      key={5}
      formData={formData}
      setStep={setActiveStep}
    />,
  ];

  return (
    <>
      <Helmet>
        <title>Onboarding | Business registration</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Helmet>
      <OnboardingLayout
        activeStep={activeStep}
        totalSteps={totalSteps}
        stepValid={stepValid}
        onStepClick={handleStepClick}
        onPrev={handleBack}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}>
        {steps[activeStep]}
      </OnboardingLayout>
    </>
  );
};

export default SignUp;
