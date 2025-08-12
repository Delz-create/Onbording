import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const brandOptions = [
  "Clothing (Men, Women, Unisex, Kids, Maternity, Plus-Size)",
  "Footwear (Men, Women, Kids, Sports, Formal, Casual)",
  "Accessories (Bags, Belts, Hats, Sunglasses, Jewelry, Watches)",
  "Beauty & Grooming (Makeup, Skincare, Hair, Fragrance)",
  "Luxury & Designer (Haute Couture, Limited Editions)",
  "Cultural & Traditional Wear",
  "Sustainable & Eco-Friendly Fashion",
  "Bridal & Occasion Wear",
  "Custom-Made & Tailoring",
  "Fashion Services (Styling, Rental, Alterations)",
];

const Step2BrandInfo = ({ formData, handleChange, setStepValid }) => {
  const [selectedTypes, setSelectedTypes] = useState(formData.brandType || []);

  const handleBrandTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes(typeof value === "string" ? value.split(",") : value);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("logo", file);
    }
  };

  useEffect(() => {
    handleChange("brandType", selectedTypes);
  }, [selectedTypes]);

  useEffect(() => {
    const valid =
      selectedTypes.length > 0 &&
      formData.description &&
      formData.tagline &&
      formData.description.trim().split(/\s+/).length <= 100 &&
      formData.tagline.trim().split(/\s+/).length <= 10;
    setStepValid(valid);
  }, [selectedTypes, formData.description, formData.tagline]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Brand Information
      </Typography>

      <FormControl
        fullWidth
        margin="normal">
        <InputLabel>Brand Type</InputLabel>
        <Select
          multiple
          value={selectedTypes}
          onChange={handleBrandTypeChange}
          input={<OutlinedInput label="Brand Type" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}>
          {brandOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Brand Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        helperText={`Max 100 words (${
          formData.description?.trim().split(/\s+/).length || 0
        }/100)`}
      />

      <TextField
        label="Tagline"
        fullWidth
        margin="normal"
        value={formData.tagline || ""}
        onChange={(e) => handleChange("tagline", e.target.value)}
        helperText={`Max 10 words (${
          formData.tagline?.trim().split(/\s+/).length || 0
        }/10)`}
      />

      <TextField
        label="Website (Optional)"
        fullWidth
        margin="normal"
        value={formData.website || ""}
        onChange={(e) => handleChange("website", e.target.value)}
      />

      <Box
        mt={3}
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 2,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="logo-upload"
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
            <CloudUploadIcon />
          </IconButton>
        </label>
        {formData.logo && (
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 8,
              textAlign: "center",
              width: "100%",
            }}>
            {formData.logo.name}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Step2BrandInfo;
