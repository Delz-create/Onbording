import React from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import OnboardingBG from "../assets/images/OnboardingBG.png";
import Logo from "../assets/images/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <LanguageIcon />,
      text: "Reach Millions of fashion creators & customers",
    },
    {
      icon: <ShoppingBagIcon />,
      text: "Unlock Live Shopping, Creator Collabs, and Sales Tools",
    },
    { icon: <VerifiedIcon />, text: "Earn trust with a verified Pozse ID" },
    { icon: <VideoLibraryIcon />, text: "Live stream to boost sales" },
    { icon: <LockIcon />, text: "Unlock pozse Analytics tools" },
  ];

  return (
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
          backgroundImage: `url(${OnboardingBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: 2,
          filter: "blur(6px)",
          transform: "scale(1.05)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}>
        <Box sx={{ position: "absolute", top: 20, left: 30 }}>
          <img
            src={Logo}
            alt="Pozse Logo"
            height="40"
          />
        </Box>

        <Typography
          variant="h3"
          fontWeight="700"
          sx={{ fontFamily: "Poppins" }}>
          WELCOME TO POZSE
        </Typography>
        <Typography
          variant="h6"
          mt={1}
          mb={4}
          sx={{ fontFamily: "Poppins" }}>
          Become a Verified Fashion Brand on Pozse
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          maxWidth="md">
          {benefits.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  py: 1,
                  px: 2,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  borderRadius: 4,
                  textAlign: "center",
                }}>
                {item.icon}
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Poppins" }}>
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          onClick={() => navigate("/signin")}
          sx={{
            mt: 4,
            px: 5,
            py: 1.5,
            borderRadius: 5,
            fontWeight: "bold",
            backgroundImage: "linear-gradient(to right, #D32F2F, #B71C1C)",
            fontFamily: "Poppins",
            textTransform: "capitalize",
          }}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
