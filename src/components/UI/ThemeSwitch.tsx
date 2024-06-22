import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import { useAppContext } from "../../context/AppContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 5,
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "#6abf4b"
            : theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
    backgroundColor:
      theme.palette.mode === "dark" ? "#fff" : theme.palette.grey[300],
  },
  "& .MuiSwitch-track": {
    height: "26px",
    borderRadius: "20px",
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ThemeSwitch = () => {
  const { toggleTheme, isDarkMode, theme } = useAppContext();

  return (
    <FormGroup
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Tooltip
        title="Toggle theme"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialUISwitch
          checked={isDarkMode}
          onChange={toggleTheme}
          icon={<Brightness7Icon style={{ color: theme.palette.grey[300] }} />}
          checkedIcon={<Brightness4Icon style={{ color: "#fff" }} />}
        />
      </Tooltip>
    </FormGroup>
  );
};

export default ThemeSwitch;
