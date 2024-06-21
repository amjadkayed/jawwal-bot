import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

const chats = [
  {
    name: "Weather Bot",
    desc: "Provides real-time weather updates and forecasts.",
  },
  { name: "News Bot", desc: "Delivers the latest news from around the world." },
  {
    name: "Fitness Bot",
    desc: "Guides you through daily workouts and tracks your progress.",
  },
  {
    name: "Finance Bot",
    desc: "Helps you manage your expenses and investments.",
  },
  {
    name: "Travel Bot",
    desc: "Assists with travel planning, bookings, and local suggestions.",
  },
  {
    name: "Food Bot",
    desc: "Finds recipes based on your dietary preferences and what’s in your fridge.",
  },
  {
    name: "Shopping Bot",
    desc: "Helps you find the best deals and tracks your orders.",
  },
  {
    name: "Study Bot",
    desc: "Aids in organizing study schedules and provides learning resources.",
  },
  { name: "Music Bot", desc: "Recommends music based on your taste and mood." },
  {
    name: "Reminder Bot",
    desc: "Keeps track of your tasks and reminds you of important dates.",
  },
];

export default function AppDrawer() {
  return (
    <Box
      style={{
        backgroundColor: "black",
        minHeight: "100%",
        width: "240px",
        maxWidth: "240px",
        boxShadow: "4px 0 10px rgba(181, 214, 46, 0.2)",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          borderBottom: "2px solid rgba(255,255,255,0.2)",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <MenuIcon sx={{ color: "white" }} />
        <SettingsIcon sx={{ color: "white" }} />
      </Box>

      {chats.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              color: "white",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
          </Box>
          <Box
            sx={{
              color: "gray",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.desc}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
