import { Avatar } from "@nextui-org/react";
import ChatInput from "./ChatInput";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "../utils/types";

const ChatContainer = ({ currentChat, currentUser, socket }: any) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat) {
      const getAllMessaages = async () => {
        const res = await axios.post(recieveMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });

        setMessages(res.data);
      };
      getAllMessaages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    setMessages((prev: IMessage[]) => [
      ...prev,
      { fromSelf: true, message: msg },
    ]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        console.log({ msgRev: msg });
        setMessages((prev: IMessage[]) => [
          ...prev,
          { fromSelf: false, message: msg },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-[10%_80%_10%] h-full">
          <div className="w-full p-4 flex items-center gap-5 bg-primary/80">
            <Avatar
              size="md"
              color="primary"
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
            />
            <h3 className="text-xl text-white">{currentChat?.username}</h3>
          </div>
          <div className="w-full flex flex-col gap-4 py-4 px-4 overflow-y-auto">
            {messages?.map((msg: IMessage, index: number) => (
              <div
                key={index}
                ref={scrollRef}
                className={`w-full flex ${
                  msg.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <p className="max-w-[60%] bg-primary text-white py-3 px-4 rounded-md shadow-xl">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
