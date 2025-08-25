import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { FiUpload } from "react-icons/fi";

const Step4IdentityVerification = ({
  formData,
  handleChange,
  setStepValid,
}) => {
  const [businessDocName, setBusinessDocName] = useState(null);
  const [govIDName, setGovIDName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (formData.identityBusinessDoc?.file) {
      setBusinessDocName(formData.identityBusinessDoc.file.name);
    }
    if (formData.govermentId?.file) {
      setGovIDName(formData.govermentId.file.name);
    }
    if (formData.passportPhoto?.preview) {
      setPhotoPreview(formData.passportPhoto.preview);
    }
  }, [
    formData.identityBusinessDoc,
    formData.govermentId,
    formData.passportPhoto,
  ]);

  const handleBusinessDocUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("identityBusinessDoc", { file, preview: reader.result });
        setBusinessDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGovIDUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("govermentId", { file, preview: reader.result });
        setGovIDName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("passportPhoto", { file, preview: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const valid = !!formData.govermentId && !!formData.passportPhoto;
    setStepValid(valid);
  }, [formData.govermentId, formData.passportPhoto, setStepValid]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Identity Verification
      </Typography>

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
            <FiUpload />
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
            <FiUpload />
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
              handleChange("govermentId", null);
              setGovIDName(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}

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
            <FiUpload />
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
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -15,
              right: -10,
            }}
            onClick={() => {
              handleChange("passportPhoto", null);
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
