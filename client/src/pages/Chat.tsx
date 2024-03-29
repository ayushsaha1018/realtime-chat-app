import { Card } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { Socket, io } from "socket.io-client";
import { IContact } from "../utils/types";
import { useUserStore } from "../stores/userStore";

const Chat = () => {
  const socket = useRef<Socket>();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [currentChat, setCurrentChat] = useState<IContact | undefined>(
    undefined
  );
  const { user: currentUser, isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      if (currentUser) {
        if (currentUser?.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getUsers();
  }, [currentUser]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#2E3192] to-[#1BFFFF]">
      <Card
        isBlurred
        fullWidth
        className="border-none max-w-[90vw] px-5 pt-3 h-full max-h-[85vh] p-0 bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <div className="flex h-full">
          <div className="h-full w-[25%] border-r ">
            <Contacts
              contacts={contacts}
              setCurrentChat={setCurrentChat}
              currentUser={currentUser}
            />
          </div>
          <div className="w-[75%]">
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
