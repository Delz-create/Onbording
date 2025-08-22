import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const businessName = user.businessName || user.username || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minWidth: "100vw",
        bgcolor: "grey",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          bgcolor: "white",
          boxShadow: 1,
        }}>
        <img
          src={Logo}
          alt="Logo"
          height="40"
        />
        <Box
          display="flex"
          alignItems="center"
          gap={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold">
            Hello, {businessName}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: "none", borderRadius: 2 }}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 500,
            width: "100%",
          }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom>
            Submission Status
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary">
            Your brand details are under review. Please check back later for
            updates.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
