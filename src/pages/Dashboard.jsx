import React from "react";
import { Box, Typography, AppBar, Toolbar, Avatar, Paper } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const email = localStorage.getItem("email");

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f9f9f9" }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "#b71c1c" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}>
            <img
              src={Logo}
              alt="Pozse Logo"
              style={{ height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins" }}>
              Dashboard
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <Typography
              variant="body1"
              sx={{ fontFamily: "Poppins" }}>
              {user?.name || email || "Guest"}
            </Typography>
            <Avatar sx={{ bgcolor: "#fff", color: "#b71c1c" }}>
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: 2,
        }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 400,
          }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ fontFamily: "Poppins" }}>
            Brand Status
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, fontFamily: "Poppins" }}>
            Your brand details have been submitted successfully.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", fontFamily: "Poppins" }}>
            Our team is reviewing your application. Expect an update within
            24–48 hours.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
