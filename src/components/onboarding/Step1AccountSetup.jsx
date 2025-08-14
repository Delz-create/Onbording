import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

const Step1AccountSetup = ({ formData, handleChange, setStepValid }) => {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const checkUsername = async (username) => {
    if (!username) return;
    setCheckingUsername(true);
    try {
      const res = await fetch(
        `https://api.pozse.com/api/v1/business/check-username/${encodeURIComponent(
          username
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
    if (formData.username && formData.officialBrandName) {
      const generatedID =
        `${formData.username}${formData.officialBrandName}`.replace(/\s+/g, "");
      handleChange("businessID", generatedID);
    }
  }, [formData.username, formData.officialBrandName]);

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
      formData.username &&
      usernameStatus === "available" &&
      formData.businessId &&
      formData.address &&
      formData.country;

    setStepValid(valid);
  }, [
    formData.officialBrandName,
    formData.businessEmail,
    formData.username,
    usernameStatus,
    formData.businessId,
    formData.address,
    formData.country,
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
          value={formData.username || ""}
          onChange={(e) => handleChange("username", e.target.value)}
          onBlur={() => checkUsername(formData.username)}
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
          value={formData.businessId || ""}
          InputProps={{ readOnly: true }}
        />
      </Box>

      <TextField
        label="Address"
        fullWidth
        margin="normal"
        value={formData.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
      />

      <TextField
        label="Country of Registration"
        fullWidth
        margin="normal"
        value={formData.country || ""}
        onChange={(e) => handleChange("country", e.target.value)}
      />

      {!(
        formData.officialBrandName &&
        formData.businessEmail &&
        formData.username &&
        usernameStatus === "available" &&
        formData.businessId &&
        formData.address &&
        formData.country
      ) && (
        <Alert sx={{ mt: 2, backgroundColor: "#f67676", color: "#B71C1C" }}>
          Please complete all fields and choose an available username to
          continue.
        </Alert>
      )}
    </Box>
  );
};

export default Step1AccountSetup;
