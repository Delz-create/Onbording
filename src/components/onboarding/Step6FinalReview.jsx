import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";

const Step6FinalReview = ({
  formData,
  // setStep,
  //   setStepValid,
  onSubmitFinal,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [
    // pendingStep,
    setPendingStep,
  ] = useState(null);

  const handleSubmit = () => {
    const payload = new FormData();

    for (const key in formData) {
      if (formData[key] && !(formData[key] instanceof File)) {
        payload.append(key, formData[key]);
      }
    }

    for (const key in formData) {
      if (formData[key] instanceof File) {
        payload.append(key, formData[key]);
      }
    }

    onSubmitFinal(payload);
  };

  const renderFile = (file) => {
    if (!file) return "—";

    if (typeof file === "string") {
      if (file.toLowerCase().endsWith(".pdf")) {
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <PictureAsPdf color="error" />
            <Typography variant="body2">{file.split("/").pop()}</Typography>
          </Box>
        );
      }
      return (
        <img
          src={file}
          alt="Preview"
          style={{
            maxWidth: "120px",
            maxHeight: "120px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      );
    }

    const type = file.type?.toLowerCase() || "";
    if (type.includes("pdf")) {
      return (
        <Box
          display="flex"
          alignItems="center"
          gap={1}>
          <PictureAsPdf color="error" />
          <Typography variant="body2">{file.name}</Typography>
        </Box>
      );
    }
    if (type.includes("image")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          style={{
            maxWidth: "120px",
            maxHeight: "120px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      );
    }
    return <Typography variant="body2">{file.name}</Typography>;
  };

  const sections = [
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
        { label: "Brand Logo", file: formData.brandLogo }, 
      ],
    },
    {
      title: "Business Verification",
      step: 2,
      fields: [
        {
          label: "Business Registration Document",
          file: formData.businessDoc,
        }, 
        { label: "Physical Store Photo", file: formData.storeImage }, 
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

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Final Review & Submit
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            sx={{
              color: "red",
              "&.Mui-checked": { color: "red" },
            }}
          />
        }
        label="I agree to the Terms & Conditions"
      />

      <Button
        variant="outlined"
        onClick={() => setOpenDialog(true)}>
        Preview & Submit
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth>
        <DialogTitle>Review Your Information</DialogTitle>
        <DialogContent dividers>
          {sections.map((section, idx) => (
            <Box
              key={idx}
              mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                  variant="subtitle1"
                  fontWeight="bold">
                  {section.title}
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    setPendingStep(section.step);
                    setOpenDialog(false);
                  }}>
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              {section.fields.map((field, fIdx) => (
                <Box
                  key={fIdx}
                  mb={1}>
                  <Typography
                    variant="body2"
                    fontWeight="bold">
                    {field.label}:
                  </Typography>
                  {field.file ? (
                    renderFile(field.file)
                  ) : (
                    <Typography variant="body2">
                      {field.value || "—"}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!agreed}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step6FinalReview;
