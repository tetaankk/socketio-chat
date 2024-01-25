import { useEffect, useState } from "react";
import { parseFormField, setLocalStorage } from "../helpers";
import SubmitMessage from "./SubmitMessage";
import Messages from "./Messages";
import { socket } from "../socket";
import { Info } from "../types";
import { Message } from "../types";

function getMessages(): Message[] {
  const value = localStorage.getItem("messages");
  if (value == null) return [];
  return JSON.parse(value);
}

function formatMessage(messageText: string, sender: string, room: string) {
  return { text: messageText, sender, room, timestamp: new Date() };
}

export default function Room({ info }: { info: Info }) {
  const [messages, setMessages] = useState<Message[]>(getMessages());
  const { room, user } = info;

  useEffect(() => {
    socket.emit("joinRoom", { user, room });
  }, [user, room, socket]);

  useEffect(() => {
    setLocalStorage("messages", messages);
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) =>
      setMessages((prevMessages) => [...prevMessages, message])
    );

    socket.on("disconnect", () => {
      console.log("disconnected!");
      socket.emit("leftRoom", { user, room });
    });
  }, [socket]);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const messageText = parseFormField("messageText", e.currentTarget);
    if (!messageText) return;

    const message = formatMessage(messageText.toString(), user, room);

    socket.emit("sendMessage", message);

    e.currentTarget.reset();
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      className="room"
    >
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ padding: 0, margin: 0 }}>#{room}</h1>
        <p style={{ padding: 0, margin: 0 }}>{user}</p>
      </header>

      <Messages messages={messages} />
      <SubmitMessage room={room} submitMessage={submitMessage} />
    </section>
  );
}
