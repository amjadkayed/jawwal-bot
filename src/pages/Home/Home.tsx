import { Box, Typography } from "@mui/material";
import ChatInput from "../../components/UI/ChatBox";

function Home() {
  return (
    <Box
      style={{
        padding: "20px",
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        boxSizing: "border-box",
      }}
      display="flex"
      justifyContent="center"
      alignItems="start"
    >
      <Box sx={{ maxHeight: "100%" }}>
        <Typography
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #4A90E2, #6A1B9A, #D32F2F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome To Fine-Tuned Bot
        </Typography>
        <ChatInput />
      </Box>
    </Box>
  );
}

export default Home;
