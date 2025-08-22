export const getReviewSections = (formData) => [
  {
    title: "Account Setup",
    step: 0,
    fields: [
      { label: "Official Brand Name", value: formData.businessName },
      { label: "Business Email", value: formData.businessEmail },
      { label: "Username", value: formData.businessUsername },
      { label: "Business Address", value: formData.businessAddress },
      {
        label: "Country of Registration",
        value: formData.countryOfRegistration,
      },
    ],
  },
  {
    title: "Brand Information",
    step: 1,
    fields: [
      { label: "Brand Type(s)", value: formData.brandType?.join(", ") },
      { label: "Brand Description", value: formData.brandDescription },
      { label: "Tagline", value: formData.brandTagline },
      { label: "Brand Website", value: formData.brandWebsite },
      { label: "Brand Logo", file: formData.brandLogo },
    ],
  },
  {
    title: "Business Verification",
    step: 2,
    fields: [
      {
        label: "Business Registration Document (PDF/Image)",
        file: formData.businessRegDoc,
      },
      {
        label: "Business Physical Store Photo",
        file: formData.businessPhysicalPic,
      },
    ],
  },
  {
    title: "Identity Verification",
    step: 3,
    fields: [
      {
        label: "Business Registration Document",
        file: formData.businessRegDoc,
      },
      { label: "Government-issued ID", file: formData.govermentId },
      { label: "Selfie/Passport Photo", file: formData.passportPhoto },
    ],
  },
  {
    title: "Portfolio Submission",
    step: 4,
    fields: [
      { label: "Lookbook (PDF/Image)", file: formData.lookbook },
      { label: "Website / Storefront", value: formData.portfolioWebsite },
    ],
  },
  {
    title: "Social Media Handles",
    step: 5,
    fields: (formData.socialHandles || []).map((handle, idx) => ({
      label: `Social Link ${idx + 1}`,
      value: handle,
    })),
  },
];
