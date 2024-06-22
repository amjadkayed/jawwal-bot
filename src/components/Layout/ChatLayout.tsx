import React, { useState } from "react";
import { Box } from "@mui/material";
import { ChatInput } from "../UI/ChatInput";
import { ChatBox } from "../UI/ChatBox";
import useWindowSize from "../../hooks/useWindowWidth";
import { useAppContext } from "../../context/AppContext";

export const ChatLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const width = useWindowSize();
  const { setMessages, messages } = useAppContext();
  const addMessage = (text: string, isUser: boolean = false, link?: string) => {
    const newMessage = {
      id: messages?.length + 1,
      text,
      is_user: isUser,
      link: link,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    if (isUser) fetchBotResponse(text);
  };

  const fetchBotResponse = async (inputText: string) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token is not available");
      addMessage("Authentication error, please log in again.", false);
      return;
    }

    setIsLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `bearer ${accessToken}`);

    try {
      const response = await fetch(
        "http://fine-tuned-devs.azurewebsites.net/process",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ input_text: inputText }),
          redirect: "follow",
        }
      );
      if (!response.ok) {
        throw new Error(
          "HTTP status " + response.status + " - " + (await response.text())
        );
      }
      const data = await response.json();
      addMessage(
        data?.processed_text?.result?.content,
        false,
        data?.processed_text?.source
      );
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      addMessage(`Error fetching response: ${error.message}`, false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        width: (width || 0) < 700 ? "100%" : "70%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatBox messages={messages} isLoading={isLoading} />
      <ChatInput addMessage={(text) => addMessage(text, true)} />
    </Box>
  );
};
