import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";

const Step5PortfolioSubmission = ({ formData, handleChange, setStepValid }) => {
  const [lookbookName, setLookbookName] = useState(null);
  const [lookbookPreview, setLookbookPreview] = useState(null);

  const handleLookbookUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileObj = {
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      };
      handleChange("lookbook", fileObj);

      if (file.type === "application/pdf") {
        setLookbookName(file.name);
        setLookbookPreview(null);
      } else if (file.type.startsWith("image/")) {
        setLookbookPreview(fileObj.preview);
        setLookbookName(null);
      }
    }
  };

  useEffect(() => {
    if (formData.lookbook) {
      if (formData.lookbook.file?.type === "application/pdf") {
        setLookbookName(formData.lookbook.file.name);
      } else if (formData.lookbook.preview) {
        setLookbookPreview(formData.lookbook.preview);
      }
    }
  }, [formData.lookbook]);

  useEffect(() => {
    setStepValid(true);
  }, [setStepValid]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Portfolio / Live Store Submission
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
          accept="application/pdf,image/*"
          type="file"
          id="lookbook-upload"
          style={{ display: "none" }}
          onChange={handleLookbookUpload}
        />
        <label htmlFor="lookbook-upload">
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
          Upload Lookbook (PDF or Image, Optional)
        </Typography>
      </Box>

      {lookbookName && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="caption">{lookbookName}</Typography>
          <IconButton
            size="small"
            onClick={() => {
              handleChange("lookbook", null);
              setLookbookName(null);
            }}>
            ✕
          </IconButton>
        </Box>
      )}

      {lookbookPreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={lookbookPreview}
            alt="Lookbook Preview"
            style={{ maxWidth: "200px", borderRadius: "8px" }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -15,
              right: 10,
            }}
            onClick={() => {
              handleChange("lookbook", null);
              setLookbookPreview(null);
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
          Website (Optional)
        </Typography>
        <TextField
          fullWidth
          placeholder="https://yourstore.com"
          value={formData.portfolioWebsite || ""}
          onChange={(e) => handleChange("portfolioWebsite", e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default Step5PortfolioSubmission;
