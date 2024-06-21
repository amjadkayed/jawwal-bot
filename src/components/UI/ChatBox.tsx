import { useState, useReducer } from "react";
import { Box, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

const randomResponses = [
  "Wait.. am I talking to the winners?!",
  "How can I help the winners!!",
  "Thank you champ!",
  "That sounds interesting! champ!",
  "You're doing great, champ!",
  "Keep up the amazing work, winners!",
  "Winners always find a way!",
  "You're on the right track, champ!",
  "That's the spirit of a true winner!",
  "Fantastic job, winners!",
  "Champ, you're unstoppable!",
  "You're crushing it, winners!",
  "Winners, you're making history!",
  "Impressive work, champ!",
];

const initialState = {
  messages: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendMessage = () => {
    if (message.trim() !== "") {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { text: message, sender: "user" },
      });
      console.log("Message sent:", message);
      setMessage(""); // Clear input after sending
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomResponses.length);
        dispatch({
          type: "ADD_MESSAGE",
          payload: { text: randomResponses[randomIndex], sender: "bot" },
        });
      }, 1000); // Respond after a delay
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
          alignItems: "stretch",
        }}
      >
        {state.messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: "10px",
                backgroundColor:
                  msg.sender === "user"
                    ? "rgba(198, 44, 59,0.7)"
                    : "rgba(80, 120, 211,0.5)",
                borderRadius: "8px",
                color: "white",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              {msg.text}
            </Box>
          </motion.div>
        ))}
      </Box>
      <Box
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "transparent",
          borderRadius: "inherit",
          padding: "8px",
          flexGrow: 1,
          border: "2px solid",
          borderImageSlice: 1,
          borderImageSource:
            "linear-gradient(45deg, #4A90E2, #6A1B9A, #D32F2F, #b5d62e)",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          InputProps={{
            style: {
              color: "#fff",
              background: "transparent",
              borderRadius: "4px",
            },
          }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "transparent", borderRadius: "4px" },
              "&:hover fieldset": { borderColor: "transparent" },
              "&.Mui-focused fieldset": { borderColor: "transparent" },
            },
            flexGrow: 1,
            marginRight: "10px",
          }}
        />
        <Button
          variant="outlined"
          onClick={sendMessage}
          sx={{
            bgcolor: "transparent",
            color: "#b5d62e",
            borderColor: "transparent",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "rgba(181, 214, 46, 0.1)",
              borderColor: "rgba(181, 214, 46, 0.5)",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;
