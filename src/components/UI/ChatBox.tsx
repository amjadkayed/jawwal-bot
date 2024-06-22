import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: string;
}

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   // Simulate receiving new messages
  //   const interval = setInterval(() => {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: prevMessages.length + 1, text: "New message!", sender: "user" },
  //     ]);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                margin: "10px",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
              }}
            >
              {message.text}
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};
