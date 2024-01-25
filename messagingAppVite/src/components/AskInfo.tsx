import { Info } from "../types";
import { parseFormField, setLocalStorage } from "../helpers";

interface Props {
  info: Info;
  setInfoState: React.Dispatch<React.SetStateAction<Info>>;
}

export default function AskInfo({ info, setInfoState }: Props) {
  function setInfos(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formUsername = parseFormField("username", e.currentTarget);
    const formRoom = parseFormField("room", e.currentTarget);
    if (!formUsername || !formRoom) return;

    const user = formUsername.toString();
    const room = formRoom.toString();

    // Update URL with room query parameter
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("room", room);
    window.history.pushState({}, "", `?${searchParams}`);

    setLocalStorage("user", user);
    setInfoState({ user, room, infoAsked: true });

    // Reset form fields
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={setInfos}>
      <input
        name="username"
        type="text"
        defaultValue={info.user}
        placeholder="Pick a username"
      />
      <input
        name="room"
        type="text"
        defaultValue={info.room}
        placeholder="Provide a room to join"
      />
      <button type="submit">Enter</button>
    </form>
  );
}
