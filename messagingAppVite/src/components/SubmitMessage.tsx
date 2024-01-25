import { FormEventHandler } from "react";

type Props = {
  submitMessage: FormEventHandler<HTMLFormElement>;
  room: string;
};

export default function SubmitMessage({ submitMessage, room }: Props) {
  return (
    <form onSubmit={submitMessage}>
      <input
        style={{ width: "100%" }}
        name="messageText"
        type="text"
        placeholder={`Type a message to #${room}`}
      />
    </form>
  );
}
