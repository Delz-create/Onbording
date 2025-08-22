import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaGooglePlay, FaApple } from "react-icons/fa";

import LoginImg from "../assets/images/Login-img.png";
import LoginBG from "../assets/images/LoginBG.png";

import Logo from "../assets/images/Logo.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [openPopup, setOpenPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const body = new URLSearchParams();
      body.append("email", formData.email);
      body.append("password", formData.password);

      const res = await fetch("https://api.pozse.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await res.json();

      if (data.success) {
        setAlert({ type: "success", message: data.message });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("email", data.user.email);

        const alreadyCompleted =
          localStorage.getItem("onboardingCompleted") === "true";

        setTimeout(() => {
          if (alreadyCompleted) {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/signup";
          }
        }, 1500);

        setTimeout(() => {
          window.location.href = "/signup";
        }, 1500);
      } else {
        const msg = data.message.toLowerCase();
        const notRegisteredKeywords = [
          "not registered",
          "no account",
          "does not exist",
        ];

        const isNotRegistered = notRegisteredKeywords.some((keyword) =>
          msg.includes(keyword)
        );

        if (isNotRegistered) {
          setOpenPopup(true);
        } else {
          setAlert({ type: "error", message: data.message });
        }
      }
    } catch {
      setAlert({ type: "error", message: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert({ type: "", message: "" }), 30000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Onboarding | Signin</title>
      </Helmet>

      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            minWidth: "100vw",
            height: "100vh",
            backgroundImage: `url(${LoginBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px)",
            transform: "scale(1.05)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, height: "100vh" }}>
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 30,
            }}>
            <img
              src={Logo}
              alt="Pozse Logo"
              height="40"
            />
          </Box>

          <Container
            maxWidth="lg"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Box
              container
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                height: 500,
                mt: 10,
              }}>
              <Box
                item
                xs={0}
                md={6}
                sx={{ display: { md: "block", xs: "none" } }}>
                <Box
                  component="img"
                  src={LoginImg}
                  alt="Shopping"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              <Box
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 5,
                  zIndex: 1,
                }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={4}
                  textAlign="center"
                  sx={{ fontFamily: "Poppins" }}>
                  SIGN IN
                </Typography>

                {alert.message && (
                  <Alert
                    severity={alert.type}
                    sx={{ mb: 2 }}>
                    {alert.message}
                  </Alert>
                )}

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
                          <MdOutlineEmail />
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
                            {showPassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <IoEyeOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      borderRadius: 2.5,
                      bgcolor: "linear-gradient(90deg, #D32F2F, #B71C1C)",
                      fontFamily: "Poppins",
                      backgroundImage:
                        "linear-gradient(to right, #D32F2F, #B71C1C)",
                    }}>
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Dialog
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          maxWidth="xs">
          <DialogContent
            sx={{
              textAlign: "center",
              py: 7,
              position: "relative",
            }}>
            <IconButton
              onClick={() => setOpenPopup(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}>
              <IoMdClose />
            </IconButton>

            <Box
              sx={{
                my: 2.5,
                mx: 4.5,
              }}>
              <Typography
                variant="h6"
                fontWeight="900"
                gutterBottom
                sx={{ fontFamily: "Poppins", fontSize: 15 }}>
                Sorry you are not registered on
                <span style={{ color: "red" }}> Pozse</span>
              </Typography>
              <Typography
                mb={3}
                sx={{ fontFamily: "Poppins", fontSize: 10 }}>
                Kindly download the app to start registration
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.pozse",
                      "_blank"
                    )
                  }
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    px: { xs: 1.5, sm: 2, md: 4 },
                    py: { xs: 0.5, sm: 1 },
                    mb: { xs: 1 },
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    textAlign: "left",
                    "&:hover": { backgroundColor: "#f1f1f1", color: "#000" },
                    borderRadius: 1.5,
                  }}>
                  <FaGooglePlay sx={{ fontSize: "20px" }} />
                  <Box>
                    <Typography
                      variant="body2"
                      textTransform="capitalize"
                      fontFamily="Poppins"
                      sx={{ fontSize: 5, lineHeight: 1 }}>
                      Download on
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      textTransform="capitalize"
                      fontFamily="Poppins"
                      sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: 8 }}>
                      Google Play
                    </Typography>
                  </Box>
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://www.apple.com/ng/app/pozse/id677818101",
                      "_blank"
                    )
                  }
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    px: { xs: 1.5, sm: 2, md: 4 },
                    py: { xs: 0.5, sm: 1 },
                    mb: { xs: 1 },
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    textAlign: "left",
                    "&:hover": { backgroundColor: "#f1f1f1", color: "#000" },
                    borderRadius: 1.5,
                  }}>
                  <FaApple sx={{ fontSize: "30px" }} />
                  <Box>
                    <Typography
                      variant="body2"
                      textTransform="capitalize"
                      fontFamily="Poppins"
                      sx={{ fontSize: 6, lineHeight: 1 }}>
                      Get it on
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      textTransform="capitalize"
                      fontFamily="Poppins"
                      sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: 8 }}>
                      App Store
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default SignIn;
