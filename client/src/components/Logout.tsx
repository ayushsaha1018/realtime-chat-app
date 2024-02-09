import { Button } from "@nextui-org/react";
import LogoutIcon from "./icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY) ?? "null"
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
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
