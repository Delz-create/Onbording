import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Select, MenuItem } from "@mui/material";

const Step1AccountSetup = ({ formData, handleChange, setStepValid }) => {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const checkUsername = async (buinessUsername) => {
    if (!buinessUsername) return;
    setCheckingUsername(true);
    try {
      const res = await fetch(
        `https://api.pozse.com/api/v1/business/check-username/${encodeURIComponent(
          buinessUsername
        )}`
      );
      const data = await res.json();
      console.log("Username check result:", data);

      if (data.success && data.status === true) {
        setUsernameStatus("available");
      } else {
        setUsernameStatus("taken");
      }
    } catch (error) {
      console.error("Username check failed", error);
      setUsernameStatus(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail && !formData.businessEmail) {
      handleChange("businessEmail", storedEmail);
    }
  }, []);

  useEffect(() => {
    const valid =
      formData.officialBrandName &&
      formData.businessEmail &&
      formData.businessUsername &&
      usernameStatus === "available" &&
      formData.businessAddress &&
      formData.countryOfRegistration;

    setStepValid(valid);
  }, [
    formData.officialBrandName,
    formData.businessEmail,
    formData.businessUsername,
    usernameStatus,
    formData.businessAddress,
    formData.countryOfRegistration,
  ]);

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
        sx={{
          color: "#111",
        }}>
        Account Setup
      </Typography>

      <TextField
        label="Official Brand Name"
        fullWidth
        margin="normal"
        value={formData.officialBrandName || ""}
        onChange={(e) => handleChange("officialBrandName", e.target.value)}
      />

      <TextField
        label="Business Email"
        fullWidth
        margin="normal"
        value={formData.businessEmail || ""}
        onChange={(e) => handleChange("businessEmail", e.target.value)}
      />

      <Box
        display="flex"
        gap={2}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={formData.businessUsername || ""}
          onChange={(e) => handleChange("businessUsername", e.target.value)}
          onBlur={() => checkUsername(formData.businessUsername)}
          helperText={
            checkingUsername
              ? "Checking availability..."
              : usernameStatus === "available"
              ? "Username available"
              : usernameStatus === "taken"
              ? "Username already taken"
              : ""
          }
        />

        <TextField
          label="Business ID"
          fullWidth
          margin="normal"
          value={formData.businessID || ""}
          InputProps={{ readOnly: true }}
        />
      </Box>

      <TextField
        label="Address"
        fullWidth
        margin="normal"
        value={formData.businessAddress || ""}
        onChange={(e) => handleChange("businessAddress", e.target.value)}
      />

      <Typography
        variant="body2"
        fontWeight="bold"
        mt={2}>
        Country of Registration
      </Typography>
      <Select
        fullWidth
        value={formData.countryOfRegistration || ""}
        onChange={(e) => handleChange("countryOfRegistration", e.target.value)}
        displayEmpty>
        <MenuItem value="">
          <em>Select Country</em>
        </MenuItem>
        <MenuItem value="United States">United States</MenuItem>
        <MenuItem value="Nigeria">Nigeria</MenuItem>
      </Select>
    </Box>
  );
};

export default Step1AccountSetup;
