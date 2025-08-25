import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { FiUpload } from "react-icons/fi";

const socialPlatforms = [
  "Instagram",
  "Facebook",
  "Twitter / X",
  "TikTok",
  "YouTube",
  "Pinterest",
  "LinkedIn",
];

const Step3BusinessVerification = ({
  formData,
  handleChange,
  setStepValid,
}) => {
  const [docPreview, setDocPreview] = useState(null);
  const [storePreview, setStorePreview] = useState(null);
  const [socialInputs, setSocialInputs] = useState(
    formData.socialHandles || [""]
  );

  useEffect(() => {
    if (formData.businessRegDoc?.preview) {
      setDocPreview(formData.businessRegDoc.preview);
    }
    if (formData.businessPhysicalPic?.preview) {
      setStorePreview(formData.businessPhysicalPic.preview);
    }
  }, [formData.businessRegDoc, formData.businessPhysicalPic]);

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("businessRegDoc", { file, preview: reader.result });
        setDocPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoreUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("businessPhysicalPic", { file, preview: reader.result });
        setStorePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (index, value) => {
    const updated = [...socialInputs];
    updated[index] = value;
    setSocialInputs(updated);
    handleChange(
      "socialHandles",
      updated.filter((v) => v.trim() !== "")
    );
  };

  const addSocialField = () => {
    setSocialInputs([...socialInputs, ""]);
  };

  const removeSocialField = (index) => {
    const updated = socialInputs.filter((_, i) => i !== index);
    setSocialInputs(updated);
    handleChange(
      "socialHandles",
      updated.filter((v) => v.trim() !== "")
    );
  };

  useEffect(() => {
    const valid = !!formData.businessRegDoc;
    setStepValid(valid);
  }, [formData.businessRegDoc, setStepValid]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Business Verification
      </Typography>

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
          accept="image/*,.pdf"
          type="file"
          id="doc-upload"
          style={{ display: "none" }}
          onChange={handleDocUpload}
        />
        <label htmlFor="doc-upload">
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
          Upload Business Registration Document (Required)
        </Typography>
      </Box>
      {docPreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={docPreview}
            alt="Business Document Preview"
            style={{ maxWidth: "30px", borderRadius: "8px" }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -15,
              right: -10,
            }}
            onClick={() => {
              handleChange("businessRegDoc", null);
              setDocPreview(null);
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
          id="store-upload"
          style={{ display: "none" }}
          onChange={handleStoreUpload}
        />
        <label htmlFor="store-upload">
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
          Upload Physical Store Image (Optional)
        </Typography>
      </Box>
      {storePreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={storePreview}
            alt="Store Preview"
            style={{ maxWidth: "30px", borderRadius: "8px" }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -15,
              right: -10,
            }}
            onClick={() => {
              handleChange("businessPhysicalPic", null);
              setStorePreview(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      <Box mt={4}>
        <Typography
          variant="body2"
          fontWeight="bold"
          mb={1}>
          Social Media Handles (Optional)
        </Typography>
        {socialInputs.map((handle, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            mb={1}>
            <TextField
              fullWidth
              value={handle}
              onChange={(e) => handleSocialChange(index, e.target.value)}
              placeholder={`${socialPlatforms[index] || "Other"} Handle`}
            />
            <IconButton
              onClick={() => removeSocialField(index)}
              sx={{ ml: 1 }}>
              ✕
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          size="small"
          onClick={addSocialField}
          sx={{ mt: 1 }}>
          + Add another
        </Button>
      </Box>
    </Box>
  );
};

export default Step3BusinessVerification;
