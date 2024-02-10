import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import Logout from "./Logout";
import { IContact, IUser } from "../utils/types";

interface ContactsProps {
  contacts: IContact[];
  currentUser: IUser | undefined;
  setCurrentChat: (val: IContact) => void;
}

const Contacts: React.FC<ContactsProps> = ({
  contacts,
  setCurrentChat,
  currentUser,
}) => {
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined
  );

  const changeCurrentChat = (index: number, contact: IContact) => {
    setCurrentSelected(index);
    setCurrentChat(contact);
  };
  return (
    <>
      {contacts && currentUser && (
        <div className="grid grid-rows-[10%_78%_12%] h-full">
          <div className="text-3xl text-center border-b flex justify-center items-center">
            Chat App
          </div>
          <div className="flex flex-col overflow-y-auto">
            {contacts.map((contact: IContact, index: number) => (
              <div
                key={index}
                className={`w-full px-4 py-2.5 flex items-center gap-5 border-b cursor-pointer ${
                  currentSelected === index
                    ? "bg-background dark:bg-default-100"
                    : "bg-background/20 dark:bg-default-100/20"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <Avatar
                  size="md"
                  color="primary"
                  src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                />
                <h3 className="text-base">{contact?.username}</h3>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-primary px-5">
            <div className="w-full flex items-center gap-5 ">
              <Avatar
                size="lg"
                color="primary"
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              />
              <h3 className="text-lg text-white">{currentUser.username}</h3>
            </div>
            <Logout />
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
