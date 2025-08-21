import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Dashboard = ({ user }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #eee",
        }}>
        <img
          src="/logo192.png"
          alt="Logo"
          style={{ height: 40 }}
        />
        <Typography fontWeight="bold">@{user?.username}</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 400,
            boxShadow: 3,
          }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom>
            Submission Status
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666" }}>
            Your brand information has been submitted. Our team is reviewing it.
            Please check back later for updates.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
