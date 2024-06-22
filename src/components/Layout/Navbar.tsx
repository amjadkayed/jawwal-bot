import { AppBar, Box, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../../context/AppContext";
import ThemeSwitch from "../UI/ThemeSwitch";

function Navbar() {
  const { setIsDrawerOpen, theme } = useAppContext();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 25px 0px ",
        height: "70px",
      }}
    >
      <Toolbar sx={{ gap: 3 }}>
        <img
          src="/public/images/logo.png"
          alt="jawwal logo"
          height={57}
          width={57}
        />
        <Box color="#226188" fontSize="20px" fontWeight="800">
          <span style={{ color: "#6abf4b" }}>JAWWAL</span> Bot
        </Box>
        <Box marginLeft="auto">
          <ThemeSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
