import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const Step4IdentityVerification = ({
  formData,
  handleChange,
  setStepValid,
}) => {
  const [businessDocName, setBusinessDocName] = useState(null);
  const [govIDName, setGovIDName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Business Registration Doc (Optional)
  const handleBusinessDocUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      handleChange("identityBusinessDoc", file);
      setBusinessDocName(file.name);
    }
  };

  // Government ID (Required)
  const handleGovIDUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      handleChange("govID", file);
      setGovIDName(file.name);
    }
  };

  // Selfie / Passport Photo (Required)
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleChange("selfieOrPassport", file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Validation
  useEffect(() => {
    const valid = !!formData.govID && !!formData.selfieOrPassport;
    setStepValid(valid);
  }, [formData.govID, formData.selfieOrPassport, setStepValid]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Identity Verification
      </Typography>

      {/* Business Registration Document - Optional */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          mt: 2,
          textAlign: "center",
          position: "relative",
        }}>
        <input
          accept="application/pdf"
          type="file"
          id="id-business-doc"
          style={{ display: "none" }}
          onChange={handleBusinessDocUpload}
        />
        <label htmlFor="id-business-doc">
          <IconButton
            component="span"
            sx={{
              backgroundColor: "red",
              color: "#fff",
              width: 50,
              height: 50,
              "&:hover": { backgroundColor: "#b71c1c" },
            }}>
            <CloudUpload />
          </IconButton>
        </label>
        <Typography
          variant="body2"
          mt={1}>
          Upload Business Registration Document (PDF, Optional)
        </Typography>
      </Box>
      {businessDocName && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="caption">{businessDocName}</Typography>
          <IconButton
            size="small"
            onClick={() => {
              handleChange("identityBusinessDoc", null);
              setBusinessDocName(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      {/* Government-issued ID - Required */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          mt: 4,
          textAlign: "center",
          position: "relative",
        }}>
        <input
          accept="application/pdf"
          type="file"
          id="gov-id-upload"
          style={{ display: "none" }}
          onChange={handleGovIDUpload}
        />
        <label htmlFor="gov-id-upload">
          <IconButton
            component="span"
            sx={{
              backgroundColor: "red",
              color: "#fff",
              width: 50,
              height: 50,
              "&:hover": { backgroundColor: "#b71c1c" },
            }}>
            <CloudUpload />
          </IconButton>
        </label>
        <Typography
          variant="body2"
          mt={1}>
          Upload Valid Government-issued ID (PDF, Required)
        </Typography>
      </Box>
      {govIDName && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="caption">{govIDName}</Typography>
          <IconButton
            size="small"
            onClick={() => {
              handleChange("govID", null);
              setGovIDName(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      {/* Live Selfie / Passport Photo - Required */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          mt: 4,
          textAlign: "center",
          position: "relative",
        }}>
        <input
          accept="image/*"
          type="file"
          id="selfie-upload"
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />
        <label htmlFor="selfie-upload">
          <IconButton
            component="span"
            sx={{
              backgroundColor: "red",
              color: "#fff",
              width: 50,
              height: 50,
              "&:hover": { backgroundColor: "#b71c1c" },
            }}>
            <CloudUpload />
          </IconButton>
        </label>
        <Typography
          variant="body2"
          mt={1}>
          Upload Live Selfie or Recent Passport Photo (Required)
        </Typography>
      </Box>
      {photoPreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={photoPreview}
            alt="Selfie Preview"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              backgroundColor: "#fff",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={() => {
              handleChange("selfieOrPassport", null);
              setPhotoPreview(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Step4IdentityVerification;
