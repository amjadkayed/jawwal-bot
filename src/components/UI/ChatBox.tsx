import { useRef, useEffect, useState } from "react";
import { Box, Link } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import useWindowSize from "../../hooks/useWindowWidth";

// Assuming the Message type now also has an optional links field
export type Message = {
  id: string;
  text: string;
  is_user: boolean;
  links?: { url: string; text: string }[]; // Array of objects for links
};

export const ChatBox = ({
  messages,
  Loading,
}: {
  messages: Message[];
  Loading: boolean;
}) => {
  console.log(messages);
  const width = useWindowSize();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initialize with a welcome message
    const welcomeMessage = {
      id: "welcome-msg",
      text: "Welcome to our chat service! How can I assist you today?",
      is_user: false,
      links: [{ url: "https://example.com", text: "Learn More" }], // Example link
    };
    setLocalMessages([welcomeMessage, ...messages]);
  }, [messages]);

  return (
    <Box
      sx={{
        width: width < 700 ? "100%" : "calc(100% - 160px)",
        height: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        position: "relative",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "scroll",
            autoHideDelay: 500,
          },
        }}
      >
        <AnimatePresence>
          {localMessages?.map((message) => (
            <motion.div
              key={message?.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }} // Modified to move up when disappearing
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: message.is_user ? "end" : "start",
              }}
            >
              {!message.is_user && (
                <img
                  src="/public/images/logo.png"
                  alt=""
                  height={width > 700 ? 50 : 30}
                  width={width > 700 ? 50 : 30}
                />
              )}
              <Box
                sx={{
                  margin: "10px",
                  width: "fit-content",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#E5E5E5",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  color: "#000",
                }}
              >
                {message.text}
                {!!message?.link && (
                  <Link
                    href={message?.link}
                    target="_blank"
                    style={{ margin: "5px" }}
                  >
                    For more info, click me !
                  </Link>
                )}
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </OverlayScrollbarsComponent>
    </Box>
  );
};
