import React, { useState } from "react";
import { useEffect } from "react";
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

  const handleSubmitAll = () => {
    console.log("Final submit", formData);
    localStorage.removeItem("onboardingData");
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
      setStepValid={setStepValid}
      onSubmitFinal={(payload) => {
        fetch("https://api.pozse.com/api/v1/onboarding", {
          method: "POST",
          body: payload,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Submission result:", data);
          })
          .catch((err) => {
            console.error("Submission error:", err);
          });
      }}
    />,
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
