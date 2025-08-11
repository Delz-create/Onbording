import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

const Step1AccountSetup = ({ formData, handleChange, handleNext }) => {
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const businessEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    if (formData.username) {
      let baseId = formData.username;
      if (formData.officialBrandName) {
      baseId += `-${formData.officialBrandName}`;
      }
      const brandId = baseId.replace(/\s+/g, "-").toLowerCase();
      handleChange("businessId", brandId);
      }
  }, [formData.username, formData.officialBrandName]);

  useEffect(() => {
    if (!formData.username) {
      setUsernameStatus(null);
      return;
    }

    const delayDebounce = setTimeout(() => {
      checkUsername(formData.username);
    }, 5000);

    return () => clearTimeout(delayDebounce);
  }, [formData.username]);

  const checkUsername = async (username) => {
    setCheckingUsername(true);
    try {
      const res = await fetch(
        `https://api.pozse.com/api/v1/business/check-username/${encodeURIComponent(username)}`
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameStatus !== "available") return;
    handleNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, backgroundColor: "#fff" }}>
      <Typography variant="h5" mb={3} sx={{color: "#111", fontFamily: "Poppins"}}>
        Account Setup
      </Typography>

      <TextField
        label="Official Brand Name"
        fullWidth
        value={formData.officialBrandName}
        onChange={(e) => handleChange("officialBrandName", e.target.value)}
        margin="normal"
        required
      />

      <TextField
        label="Business Email"
        fullWidth
        value={businessEmail}
        onChange={() => {}}
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Username"
            fullWidth
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
            sx= {{
              color: "#fff"
            }}
            helperText={
              checkingUsername
                ? "Checking availability..."
                : usernameStatus === "available"
                ? "Available"
                : usernameStatus === "taken"
                ? "Taken"
                : ""
            }
            FormHelperTextProps={{
              sx: {
                fontFamily: "Poppins",
                color:
                  usernameStatus === "available"
                    ? "green"
                    : usernameStatus === "taken"
                    ? "red"
                    : "inherit",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Business ID"
            fullWidth
            value={formData.businessId || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
            sx={{
              fontFamily: "Poppins"
            }}
          />
        </Grid>
      </Grid>

      <TextField
        label="Address"
        fullWidth
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        margin="normal"
        required
        sx={{
          fontFamily: "Poppins"
        }}
      />

      <TextField
        label="Country of Registration"
        fullWidth
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
        margin="normal"
        required
        sx={{
          fontFamily: "Poppins"
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={usernameStatus !== "available"}
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 5,
          backgroundImage: "linear-gradient(to right, #D32F2F, #B71C1C)",
          fontFamily: "Poppins",
          TextTransform: "capitalize"
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default Step1AccountSetup;
