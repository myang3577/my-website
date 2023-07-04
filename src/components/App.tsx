import "./App.module.scss";

import { Paper, Theme } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { BlobSvg } from "./blob/BlobSvg";
import { Homepage } from "./Homepage";
import { PathOfExile } from "./pathofexile/PathOfExile";
import { TeamfightTactics } from "./teamfighttactics/TeamfightTactics";
import { Warframe } from "./warframe/Warframe";

export const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

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
          elevation: 0,
        },
      },
    },
    typography: {
      fontFamily: "Noto Sans",
    },
  };

  const theme: Theme = useMemo(() => {
    const newThemeOptions = structuredClone(themeOptions);
    newThemeOptions.palette = {
      mode,
    };

    return createTheme(newThemeOptions);
  }, [mode]);

  const router = createHashRouter([
    {
      path: "/",
      element: <Homepage toggleColorMode={colorMode.toggleColorMode} theme={theme} />,
      children: [
        {
          path: "/warframe",
          element: <Warframe />,
        },
        {
          path: "/pathofexile",
          element: <PathOfExile />,
        },
        {
          path: "/tft",
          element: <TeamfightTactics />,
        },
        {
          path: "/blob",
          element: <BlobSvg />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        square
        variant="elevation"
        elevation={0}
        sx={{
          minHeight: "100vh",
        }}
      >
        <RouterProvider router={router} />
      </Paper>
    </ThemeProvider>
  );
};
