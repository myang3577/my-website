import "./App.module.scss";

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Homepage from "./Homepage";
import PathOfExile from "./pathofexile/PathOfExile";
import Warframe from "./warframe/Warframe";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/warframe",
      element: <Warframe />,
    },
    {
      path: "/pathofexile",
      element: <PathOfExile />,
    },
  ]);

  const themeOptions: ThemeOptions = {
    palette: { mode: "light" },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "outlined",
          disableRipple: true,
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: "outlined",
        },
      },
    },
    typography: {
      fontFamily: "Noto Sans",
    },
  };

  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const newThemeOptions = structuredClone(themeOptions);
    newThemeOptions.palette = {
      mode,
    };

    return createTheme(newThemeOptions);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Paper square sx={{ m: 0 }} variant="elevation" elevation={0}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
        <RouterProvider router={router} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
