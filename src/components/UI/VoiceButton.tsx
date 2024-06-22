import MicIcon from "@mui/icons-material/Mic";
import { Box, styled } from "@mui/material";
import useSpeechToText from "../../hooks/useSpeechToText";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

// Styled component for the pulsating circle
const PulsatingCircle = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto", // Center the circle
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor: "#6abf4b",
  opacity: 0.5,
  animation: "pulse 2s infinite ease-in-out",
  "@keyframes pulse": {
    "0%, 100%": {
      transform: "scale(1)",
      opacity: 0.5,
    },
    "50%": {
      transform: "scale(1.2)",
      opacity: 0.75,
    },
  },
}));

function VoiceButton({
  onTextRecognized,
}: {
  onTextRecognized: (text: string) => void;
}) {
  const { isListening, toggleListening, text } = useSpeechToText();
  const { theme } = useAppContext();

  useEffect(() => {
    if (onTextRecognized && isListening) onTextRecognized(text);
  }, [text]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: "100%",
        cursor: "pointer",
      }}
      onClick={toggleListening}
    >
      <MicIcon
        sx={{
          color: theme.palette.primary.dark,
          fontSize: "large",
        }}
      />
      {isListening && <PulsatingCircle />}
    </Box>
  );
}

export default VoiceButton;
