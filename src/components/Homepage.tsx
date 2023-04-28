import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { AppBar, Button, IconButton, Stack, Theme, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

interface HomepageProps {
  toggleColorMode: () => void;
  theme: Theme;
}

interface TabDef {
  label: string;
  path: string;
}

const TABS: TabDef[] = [
  {
    label: "Home",
    path: "",
  },
  {
    label: "Warframe",
    path: "warframe",
  },
  {
    label: "Path of Exile",
    path: "pathofexile",
  },
];

const Homepage = ({ toggleColorMode, theme }: HomepageProps) => {
  return (
    <>
      <AppBar variant="outlined" elevation={0} position="sticky" enableColorOnDark>
        <Toolbar variant="dense">
          <Typography>Website</Typography>

          <Stack
            direction={"row"}
            sx={{
              flexGrow: 1,
            }}
          >
            {TABS.map((tab, index) => (
              <Button key={index} disableRipple={false} component={Link} to={tab.path} variant="text" color="inherit">
                {tab.label}
              </Button>
            ))}
          </Stack>

          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Homepage;
