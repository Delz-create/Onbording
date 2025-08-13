import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Select,
  OutlinedInput,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { FiUpload } from "react-icons/fi";

const brandTypeOptions = [
  "Clothing",
  "Footwear",
  "Accessories",
  "Beauty & Grooming",
  "Luxury & Designer",
  "Cultural & Traditional Wear",
  "Sustainable & Eco-Friendly Fashion",
  "Bridal & Occasion Wear",
  "Custom-Made & Tailoring",
  "Fashion Services",
];

const Step2BrandInfo = ({ formData, handleChange, setStepValid }) => {
  const [logoPreview, setLogoPreview] = useState(null);

  const handleBrandTypeChange = (event) => {
    const value = event.target.value;
    handleChange(
      "brandType",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("logo", file);
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
    }
  };

  useEffect(() => {
    const descWordCount = formData.description?.trim().split(/\s+/).length || 0;
    const taglineWordCount = formData.tagline?.trim().split(/\s+/).length || 0;

    const valid =
      formData.brandType?.length > 0 &&
      formData.description &&
      descWordCount <= 100 &&
      formData.tagline &&
      taglineWordCount <= 10;

    setStepValid(valid);
  }, [formData.brandType, formData.description, formData.tagline]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Brand Information
      </Typography>

      <Typography
        variant="body2"
        fontWeight="bold"
        mt={2}>
        Brand Type
      </Typography>
      <Select
        multiple
        value={formData.brandType || []}
        onChange={handleBrandTypeChange}
        input={<OutlinedInput />}
        fullWidth
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                onDelete={() =>
                  handleChange(
                    "brandType",
                    formData.brandType.filter((item) => item !== value)
                  )
                }
              />
            ))}
          </Box>
        )}>
        {brandTypeOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select one or more brand types</FormHelperText>

      <TextField
        label="Brand Description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        helperText="Max 100 words"
      />

      <TextField
        label="Tagline"
        fullWidth
        margin="normal"
        value={formData.tagline || ""}
        onChange={(e) => handleChange("tagline", e.target.value)}
        helperText="Max 10 words"
      />

      <TextField
        label="Brand Website (optional)"
        fullWidth
        margin="normal"
        value={formData.website || ""}
        onChange={(e) => handleChange("website", e.target.value)}
      />

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
          id="logo-upload"
          style={{ display: "none" }}
          onChange={handleLogoUpload}
        />
        <label htmlFor="logo-upload">
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
          Upload Brand Logo (optional)
        </Typography>
      </Box>

      {logoPreview && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <img
            src={logoPreview}
            alt="Brand Logo Preview"
            style={{ maxWidth: "200px", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Step2BrandInfo;
