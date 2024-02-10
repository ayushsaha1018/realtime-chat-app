import { Button } from "@nextui-org/react";
import LogoutIcon from "./icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import { useUserStore } from "../stores/userStore";

const Logout = () => {
  const navigate = useNavigate();
  const { user, setLogIn } = useUserStore();
  const handleClick = async () => {
    const id = user?._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      setLogIn(false);
      navigate("/login");
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        isIconOnly
        color="danger"
        variant="shadow"
        aria-label="Logout"
      >
        <LogoutIcon />
      </Button>
    </div>
  );
};

export default Logout;
