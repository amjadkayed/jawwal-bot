import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function AuthWrapper({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setMessages } = useAppContext();
  const thereIsToken = !!localStorage.getItem("access_token");

  useEffect(() => {
    if (thereIsToken) {
      setLoading(false);
      fetchMessages(localStorage.getItem("access_token"));
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "user1", password: "pass1" }),
    };

    fetch("http://fine-tuned-devs.azurewebsites.net/auth/token", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const fetchMessages = (token) => {
    fetch("http://fine-tuned-devs.azurewebsites.net/user/last_messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data?.messages?.reverse());
      })
      .catch((err) => console.error("Failed to fetch messages:", err));
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="/public/images/logo.png"
          alt="Loading..."
          style={{
            animation: "pulse 2s infinite",
            maxWidth: "20%", // Adjust size as needed
          }}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
}

export default AuthWrapper;

// Additional CSS (you might include this in your index.css or App.css)
/*
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
*/
