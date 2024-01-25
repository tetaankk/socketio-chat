import { Message } from "../types";

type Props = {
  messages: Message[];
};

export default function Messages({ messages }: Props) {
  return (
    <div className="messages">
      {messages.map((message: Message, index: number) => (
        <p key={index}>
          {message.sender}: {message.text}
        </p>
      ))}
    </div>
  );
}
