import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { FiUpload } from "react-icons/fi";

const Step3BusinessVerification = ({
  formData,
  handleChange,
  setStepValid,
}) => {
  const [businessDocPreview, setBusinessDocPreview] = useState(null);
  const [physicalStorePreview, setPhysicalStorePreview] = useState(null);
  const [socialHandles, setSocialHandles] = useState(
    formData.socialMediaHandles || [""]
  );

  // Restore previews from localStorage on mount
  useEffect(() => {
    const storedDocPreview = localStorage.getItem("businessDocPreview");
    if (storedDocPreview) setBusinessDocPreview(storedDocPreview);

    const storedStorePreview = localStorage.getItem("physicalStorePreview");
    if (storedStorePreview) setPhysicalStorePreview(storedStorePreview);
  }, []);

  // Handle Business Registration Document upload
  const handleBusinessDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("businessRegistrationDocument", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        localStorage.setItem("businessDocPreview", base64);
        setBusinessDocPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Physical Store Image upload
  const handlePhysicalStoreUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("physicalStoreImage", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        localStorage.setItem("physicalStorePreview", base64);
        setPhysicalStorePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Social Media Handles input
  const handleSocialChange = (index, value) => {
    const updatedHandles = [...socialHandles];
    updatedHandles[index] = value;
    setSocialHandles(updatedHandles);
    handleChange("socialMediaHandles", updatedHandles);
  };

  const addSocialHandle = () => {
    setSocialHandles([...socialHandles, ""]);
  };

  const removeSocialHandle = (index) => {
    const updatedHandles = socialHandles.filter((_, i) => i !== index);
    setSocialHandles(updatedHandles);
    handleChange("socialMediaHandles", updatedHandles);
  };

  // Validate step (Business Registration Document is required)
  useEffect(() => {
    const valid = !!formData.businessRegistrationDocument;
    setStepValid(valid);
  }, [formData.businessRegistrationDocument, setStepValid]);

  // Helper to detect if PDF
  const isPDF = (base64String) => {
    return base64String?.startsWith("data:application/pdf");
  };

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Business Verification
      </Typography>

      {/* Business Registration Document */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          mt: 3,
          textAlign: "center",
          position: "relative",
        }}>
        <input
          accept="image/*,application/pdf"
          type="file"
          id="business-doc-upload"
          style={{ display: "none" }}
          onChange={handleBusinessDocUpload}
        />
        <label htmlFor="business-doc-upload">
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
          Upload Business Registration Document (required)
        </Typography>
      </Box>

      {businessDocPreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          {isPDF(businessDocPreview) ? (
            <a
              href={businessDocPreview}
              target="_blank"
              rel="noopener noreferrer">
              View PDF
            </a>
          ) : (
            <img
              src={businessDocPreview}
              alt="Business Document Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          )}
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
              handleChange("businessRegistrationDocument", null);
              setBusinessDocPreview(null);
              localStorage.removeItem("businessDocPreview");
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      {/* Physical Store Upload */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          mt: 3,
          textAlign: "center",
          position: "relative",
        }}>
        <input
          accept="image/*"
          type="file"
          id="physical-store-upload"
          style={{ display: "none" }}
          onChange={handlePhysicalStoreUpload}
        />
        <label htmlFor="physical-store-upload">
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
          Upload Physical Store Image (optional)
        </Typography>
      </Box>

      {physicalStorePreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={physicalStorePreview}
            alt="Physical Store Preview"
            style={{ maxWidth: "200px", borderRadius: "8px" }}
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
              handleChange("physicalStoreImage", null);
              setPhysicalStorePreview(null);
              localStorage.removeItem("physicalStorePreview");
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      {/* Social Media Handles */}
      <Typography
        variant="body2"
        fontWeight="bold"
        mt={4}>
        Social Media Handles (optional)
      </Typography>
      {socialHandles.map((handle, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter social media handle/link"
            value={handle}
            onChange={(e) => handleSocialChange(index, e.target.value)}
          />
          {index > 0 && (
            <IconButton onClick={() => removeSocialHandle(index)}>✕</IconButton>
          )}
        </Box>
      ))}
      <Button
        variant="text"
        onClick={addSocialHandle}
        sx={{ mt: 1, color: "red" }}>
        + Add Another
      </Button>
    </Box>
  );
};

export default Step3BusinessVerification;
