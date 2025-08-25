import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const businessName = user.businessName;
  const email = user.email;
  const displayName = businessName || email || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          handleLogout();
          return;
        }

        const res = await fetch(
          "https://api.pozse.com/api/v1/business/my-submissions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        console.log("Submissions:", data);

        if (data.success && data.data?.length > 0) {
          setSubmission(data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusDisplay = () => {
    if (!submission) return null;

    const status = submission.status?.toLowerCase();

    const statusMap = {
      submitted: { label: "Application Submitted", color: "green" },
      "application submitted": {
        label: "Application Submitted",
        color: "green",
      },
      pending: { label: "Pending Approval", color: "orange" },
      "pending approval": { label: "Pending Approval", color: "orange" },
      approved: { label: "Approved", color: "blue" },
      rejected: { label: "Rejected", color: "red" },
    };

    const { label, color } = statusMap[status] || {
      label: submission.status || "Unknown",
      color: "gray",
    };

    return (
      <Box
        display="flex"
        alignItems="center"
        gap={1}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />
        <Typography>{label}</Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minWidth: "100vw",
        bgcolor: "#f9f9f9",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          bgcolor: "#fff",
          borderBottom: "1px solid #ddd",
        }}>
        <img
          src={Logo}
          alt="Pozse Logo"
          height={35}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold">
            Hello, {displayName}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            minWidth: 400,
          }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom>
            Status
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : submission ? (
            <Box
              sx={{
                borderTop: "1px solid #ddd",
                pt: 2,
                mt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              {getStatusDisplay()}
            </Box>
          ) : (
            <Typography>No submissions found.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
