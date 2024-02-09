import { Button, Input } from "@nextui-org/react";
import SendIcon from "./icons/SendIcon";
import { useState } from "react";

interface ChatInputProps {
  handleSendMsg: (msg: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState<string>("");
  const sendChat = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  return (
    <form onSubmit={sendChat} className="border-t px-5 flex items-center gap-4">
      <Input
        type="text"
        value={msg}
        required
        onChange={handleOnChange}
        label="Enter Message"
        size="sm"
      />
      <Button
        type="submit"
        isIconOnly
        color="primary"
        variant="shadow"
        aria-label="Logout"
      >
        <SendIcon filled fill="#fff" />
      </Button>
    </form>
  );
};

export default ChatInput;
