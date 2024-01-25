import "./App.css";
import AskInfo from "./components/AskInfo";
import Room from "./components/Room";
import { useState } from "react";
import { Info } from "./types";

function App() {
  const [info, setInfo] = useState<Info>(() => {
    const user = JSON.parse(localStorage.getItem("user")!) || "";

    const searchParams = new URLSearchParams(window.location.search);
    const room = searchParams.get("room") || "";

    return { user, room, infoAsked: false };
  });

  return (
    <>
      {info.room !== "" && info.user !== "" && info.infoAsked == true ? (
        <Room info={info} />
      ) : (
        <AskInfo info={info} setInfoState={setInfo} />
      )}
    </>
  );
}

export default App;
