import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#b71c1c",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: "#d32f2f",
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        },
        outlinedPrimary: {
          borderColor: "#111",
          color: "#d32f2f",
          "&:hover": {
            borderColor: "#b71c1c",
            color: "#b71c1c",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          backgroundColor: "#d32f2f",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#111",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b71c1c",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d32f2f",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#d32f2f",
          "&.Mui-checked": {
            color: "#d32f2f",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#d32f2f",
          },
        },
      },
    },
  },
});

export default theme;
