import { IUser } from "../utils/types";

interface WelcomeProps {
  currentUser: IUser | undefined;
}

const Welcome: React.FC<WelcomeProps> = ({ currentUser }) => {
  return (
    <div className="h-full width-full flex flex-col items-center justify-center">
      <div className="text-lg">
        Hi, <span className="text-primary">{currentUser?.username}</span>
      </div>
      <div>Please select a chat to start messaging</div>
    </div>
  );
};

export default Welcome;
