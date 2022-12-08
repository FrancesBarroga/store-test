import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          textTransform: "none",
          boxShadow: "none",
        },
        text: {
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        outlinedSecondary: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#326295",
    },
    secondary: {
      main: "#3d3d3d",
    },
    text: {
      primary: "#222222",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
