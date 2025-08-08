import { Box, Typography } from "@mui/material";
import React from "react";

const SignUp = () => {
  return (
    <Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins",
          fontSize: 50,
          textAlign: "center",
        }}>
        Sign Up
      </Typography>
    </Box>
  );
};

export default SignUp;
