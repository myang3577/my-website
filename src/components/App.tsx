import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
        },
      },
    },
    typography: {
      fontFamily: "Noto Sans",
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
      // h5: {
      //   fontWeight: 700,
      // },
      // h4: {
      //   fontWeight: 700,
      // },
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
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
