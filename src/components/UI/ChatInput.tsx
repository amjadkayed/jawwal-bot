import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import VoiceButton from "./VoiceButton";
import { useAppContext } from "../../context/AppContext";

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { theme } = useAppContext();

  const handleSendMessage = () => {
    console.log("Send message:", message);
    setMessage("");
  };

  const inputVariants = {
    initial: {
      scale: 1,
      boxShadow: "none",
      borderColor: theme.palette.grey[400],
    },
    focus: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
      boxShadow: `0 0 8px ${theme.palette.primary.main}`,
      borderColor: theme.palette.primary.main,
    },
  };

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <motion.div
        variants={inputVariants}
        initial="initial"
        whileFocus="focus"
        style={{ flex: 1 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          sx={{
            color: theme.palette.primary.dark,
            border: `2px solid ${theme.palette.primary.dark}`,
            borderRadius: "15px",
            bgcolor: theme.palette.primary.light,
            "&.Mui-focused": {
              borderRadius: "15px",
              borderColor: theme.palette.primary.main,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
        />
      </motion.div>
      <Button
        onClick={handleSendMessage}
        sx={{ ml: 1, color: theme.palette.primary.dark, height: "100%" }}
      >
        Send
      </Button>
      <VoiceButton onTextRecognized={setMessage} />
    </Box>
  );
};
