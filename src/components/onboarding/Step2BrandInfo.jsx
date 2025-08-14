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
      "brandTypes", // ✅ plural to match preview
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("brandLogo", file);

      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);

      // 🔹 Convert file to Base64 and store
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("brandLogoPreview", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const storedPreview = localStorage.getItem("brandLogoPreview");
    if (storedPreview) {
      setLogoPreview(storedPreview);
    }
  }, []);

  useEffect(() => {
    const descWordCount =
      formData.brandDescription?.trim().split(/\s+/).filter(Boolean).length ||
      0;
    const taglineWordCount =
      formData.tagline?.trim().split(/\s+/).filter(Boolean).length || 0;

    const valid =
      formData.brandTypes?.length > 0 &&
      formData.brandDescription &&
      descWordCount <= 100 &&
      formData.tagline &&
      taglineWordCount <= 10;

    setStepValid(valid);
  }, [
    formData.brandTypes,
    formData.brandDescription,
    formData.tagline,
    setStepValid,
  ]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
        sx={{ color: "#111" }}>
        Brand Information
      </Typography>

      {/* Brand Type */}
      <Typography
        variant="body2"
        fontWeight="bold"
        mt={2}>
        Brand Type
      </Typography>
      <Select
        multiple
        displayEmpty
        value={formData.brandTypes || []}
        onChange={handleBrandTypeChange}
        input={<OutlinedInput />}
        fullWidth
        renderValue={(selected) => {
          if (!selected.length)
            return (
              <Typography sx={{ color: "#888" }}>Select brand type</Typography>
            );
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  onDelete={() =>
                    handleChange(
                      "brandTypes",
                      formData.brandTypes.filter((item) => item !== value)
                    )
                  }
                />
              ))}
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 300 },
          },
        }}>
        {brandTypeOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select one or more brand types</FormHelperText>

      {/* Brand Description */}
      <Box position="relative">
        <TextField
          label="Brand Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formData.brandDescription || ""}
          onChange={(e) => handleChange("brandDescription", e.target.value)}
          helperText="Max 100 words"
        />
        <Typography
          variant="caption"
          sx={{ position: "absolute", bottom: 8, right: 12, color: "#888" }}>
          {formData.brandDescription?.trim().split(/\s+/).filter(Boolean)
            .length || 0}
          /100
        </Typography>
      </Box>

      {/* Tagline */}
      <Box position="relative">
        <TextField
          label="Tagline"
          fullWidth
          margin="normal"
          value={formData.tagline || ""}
          onChange={(e) => handleChange("tagline", e.target.value)}
          helperText="Max 10 words"
        />
        <Typography
          variant="caption"
          sx={{ position: "absolute", bottom: 8, right: 12, color: "#888" }}>
          {formData.tagline?.trim().split(/\s+/).filter(Boolean).length || 0}
          /10
        </Typography>
      </Box>

      {/* Website */}
      <TextField
        label="Brand Website (optional)"
        fullWidth
        margin="normal"
        value={formData.brandWebsite || ""}
        onChange={(e) => handleChange("brandWebsite", e.target.value)}
      />

      {/* Logo Upload */}
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
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}>
          <img
            src={logoPreview}
            alt="Brand Logo Preview"
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
              handleChange("brandLogo", null);
              setLogoPreview(null);
              localStorage.removeItem("brandLogoPreview"); // 🔹 remove stored preview
            }}>
            ✕
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Step2BrandInfo;
