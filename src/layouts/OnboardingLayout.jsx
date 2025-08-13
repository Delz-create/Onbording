import React from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import Logo from "../assets/images/Logo.png";
import OnboardingBG from "../assets/images/OnboardingBG.png";

import {
  MdSupervisorAccount,
  MdBusiness,
  MdOutlinePermIdentity,
} from "react-icons/md";
import { CiCircleInfo, CiShop } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";

const stepsList = [
  { title: "Account Setup", icon: <MdSupervisorAccount /> },
  { title: "Brand Information", icon: <CiCircleInfo /> },
  { title: "Business Verification", icon: <MdBusiness /> },
  {
    title: "Brand Representative Identity Check",
    icon: <MdOutlinePermIdentity />,
  },
  { title: "Portfolio / Live Store Submission", icon: <CiShop /> },
  { title: "Terms Agreement", icon: <FaRegFileAlt /> },
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
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${OnboardingBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backdropFilter: "blur(8px)",
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
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          my: 15,
          mx: 4,
          gap: 4,
        }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "flex-start",
            py: 8,
            px: 4,
            borderRadius: 3,
            maxHeight: "50vh",
            backgroundColor: "rgba(255,255,255,0.85)",
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
              <Typography
                sx={{
                  fontSize: 20,
                  mr: 2,
                  color: activeStep === index ? "#B71C1C" : "#111",
                }}>
                {step.icon}
              </Typography>
              <Typography
                sx={{
                  fontWeight: activeStep === index ? "bold" : "normal",
                  color: activeStep === index ? "#B71C1C" : "#111",
                }}>
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
            borderRadius: 3,
          }}>
          <Box sx={{ mb: 4 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: "right",
                fontWeight: "bold",
                color: "#111",
              }}>
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
    </Box>
  );
};

export default OnboardingLayout;
