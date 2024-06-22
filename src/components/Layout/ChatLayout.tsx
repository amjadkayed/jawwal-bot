// ChatLayout.tsx
import React from "react";
import { Box } from "@mui/material";
import { ChatInput } from "../UI/ChatInput";
import { ChatBox } from "../UI/ChatBox";

export const ChatLayout: React.FC = () => {
  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatBox />
      <ChatInput />
    </Box>
  );
};
