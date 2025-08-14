import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

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

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("businessDoc", file);
      setDocPreview(URL.createObjectURL(file));
    }
  };

  const handleStoreUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("storeImage", file);
      setStorePreview(URL.createObjectURL(file));
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
    const valid = !!formData.businessDoc;
    setStepValid(valid);
  }, [formData.businessDoc, setStepValid]);

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
            <CloudUpload />
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
              handleChange("businessDoc", null);
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
            <CloudUpload />
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
              handleChange("storeImage", null);
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
              placeholder="@yourhandle"
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
