import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      setAvatarLoading(true);
      const user = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY) ?? "null"
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }

      setAvatarLoading(true);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#2E3192] to-[#1BFFFF]">
      {isLoading ? (
        <div>
          <Spinner color="default" size="lg" />
        </div>
      ) : (
        <Card
          isBlurred
          fullWidth
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[450px] px-5 pt-3"
          shadow="sm"
        >
          <CardHeader className="flex justify-center ">
            <h1 className="text-4xl uppercase">Select Avatar</h1>
          </CardHeader>
          <CardBody className="w-full">
            <div className="flex gap-4 w-full justify-between">
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  size="lg"
                  isBordered={index === selectedAvatar}
                  onClick={() => setSelectedAvatar(index)}
                  color="primary"
                  src={`data:image/svg+xml;base64,${avatar}`}
                />
              ))}
            </div>
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="text-white mt-6"
              size="md"
              onClick={setProfilePicture}
              isLoading={avatarLoading}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
