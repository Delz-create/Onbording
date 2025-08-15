export const getReviewSections = (formData) => [
  {
    title: "Account Setup",
    step: 0,
    fields: [
      { label: "Official Brand Name", value: formData.officialBrandName },
      { label: "Business Email", value: formData.businessEmail },
      { label: "Username", value: formData.username },
      { label: "Business ID", value: formData.businessID },
      { label: "Address", value: formData.address },
      { label: "Country of Registration", value: formData.country },
    ],
  },
  {
    title: "Brand Information",
    step: 1,
    fields: [
      { label: "Brand Type(s)", value: formData.brandTypes?.join(", ") },
      { label: "Brand Description", value: formData.brandDescription },
      { label: "Tagline", value: formData.tagline },
      { label: "Brand Website", value: formData.brandWebsite },
      { label: "Brand Logo", file: formData.brandLogo?.preview },
    ],
  },
  {
    title: "Business Verification",
    step: 2,
    fields: [
      {
        label: "Business Registration Document",
        file: formData.businessDoc?.preview,
      },
      { label: "Physical Store Photo", file: formData.storeImage?.preview },
      {
        label: "Social Media Handles",
        value: formData.socialHandles?.join(", "),
      },
    ],
  },
  {
    title: "Identity Verification",
    step: 3,
    fields: [
      {
        label: "Business Registration Document (PDF)",
        file: formData.identityBusinessDoc,
      },
      { label: "Government-issued ID (PDF)", file: formData.govID },
      { label: "Selfie/Passport Photo", file: formData.selfieOrPassport },
    ],
  },
  {
    title: "Portfolio Submission",
    step: 4,
    fields: [
      { label: "Lookbook", file: formData.lookbook },
      { label: "Portfolio Website", value: formData.portfolioWebsite },
    ],
  },
];
