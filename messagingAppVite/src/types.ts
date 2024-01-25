export type Message = {
  text: string;
  sender: string;
  room: string;
  timestamp: Date;
};

export type Info = {
  user: string;
  room: string;
  infoAsked: boolean;
};
