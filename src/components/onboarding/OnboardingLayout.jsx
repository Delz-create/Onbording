import React from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import OnboardingBG from "../../assets/images/OnboardingBG.png";

const stepsList = [
  { title: "Account Setup", icon: "👤" },
  { title: "Brand Information", icon: "🏷️" },
  { title: "Business Verification", icon: "📄" },
  { title: "Rep Identity", icon: "🪪" },
  { title: "Portfolio", icon: "🛍️" },
  { title: "Terms", icon: "📜" },
];

const OnboardingLayout = ({
  activeStep,
  totalSteps,
  stepValid,
  onStepClick,
  onPrev,
  onNext,
  onSaveDraft,
  children,
}) => {
  const progressValue = ((activeStep + 1) / totalSteps) * 100;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        backgroundImage: `url(${OnboardingBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          p: 2,
          zIndex: 2,
        }}>
        <img
          src={Logo}
          alt="Pozse Logo"
          height="40"
        />
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          p: 4,
          pt: 12,
          width: "26%",
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
        }}>
        {stepsList.map((step, index) => (
          <Box
            key={index}
            onClick={() => onStepClick(index)}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              cursor: "pointer",
              opacity: activeStep === index ? 1 : 0.7,
            }}>
            <Typography sx={{ fontSize: 20, mr: 2 }}>{step.icon}</Typography>
            <Typography
              sx={{ fontWeight: activeStep === index ? "bold" : "normal" }}>
              {step.title}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 6 },
          pt: 14,
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
        }}>
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "right", fontWeight: "bold" }}>
            {activeStep + 1}/{totalSteps}
          </Typography>
        </Box>

        <Box sx={{ minHeight: "60vh" }}>{children}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={onPrev}>
            Prev
          </Button>

          <Box>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={onSaveDraft}>
              Save Draft
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!stepValid}>
              {activeStep === totalSteps - 1 ? "Finish" : "Continue"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingLayout;
