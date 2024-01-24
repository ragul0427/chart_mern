/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField, Box } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message-from-server", (data) => {
      setChat([...chat, data]);
    });
  }, [socket]);

  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("send-message", message);
    setMessage("");
  };

  return (
    <div>
      <Box component="form" onSubmit={handleForm}>
        <TextField
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          defaultValue="Small"
          size="small"
          label="Write your message"
          variant="standard"
        />
        <Button variant="text" type="submit">
          Send
        </Button>
      </Box>
    </div>
  );
}

export default App;
