import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import LoginImg from "../assets/images/Login-img.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Grid
        container
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Grid
          item
          xs={12}
          md={6}>
          <Box
            component="img"
            src={LoginImg}
            alt="Shopping"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            bgcolor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 5,
          }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={4}
            textAlign="center">
            SIGN IN
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 5,
                bgcolor: "linear-gradient(90deg, #D32F2F, #B71C1C)",
                backgroundImage: "linear-gradient(to right, #D32F2F, #B71C1C)",
              }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
