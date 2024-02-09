import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (username == "") {
      toast.error("Username required.");
      return false;
    } else if (password == "") {
      toast.error("Password required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        toast.success("Login successful");
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#2E3192] to-[#1BFFFF]">
      <Card
        isBlurred
        fullWidth
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[450px] px-5 pt-3"
        shadow="sm"
      >
        <CardHeader className="flex justify-center ">
          <h1 className="text-4xl uppercase">Login</h1>
        </CardHeader>
        <CardBody className="w-full">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              type="text"
              variant="flat"
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter username"
            />

            <Input
              isRequired
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="text-white mt-2"
              size="md"
              isLoading={loading}
            >
              LOGIN
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <div>
            Dont't have a account?
            <Link
              to="/register"
              className="pl-1 underline underline-offset-2 text-primary"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
