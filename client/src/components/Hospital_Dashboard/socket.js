import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ['websocket'],
});

socket.on("connect", () => {
  console.log("Socket connected with id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

export default socket;
