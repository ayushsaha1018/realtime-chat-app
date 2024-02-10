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
import { registerRoute } from "../utils/APIRoutes";
import { useUserStore } from "../stores/userStore";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setLogIn, isLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        toast.success("Register successful");
        setUser(data.user);
        setLogIn(true);
        navigate("/");
      }
      setLoading(false);
      console.log(values);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-[#2E3192] to-[#1BFFFF]">
      <Card
        isBlurred
        fullWidth
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[450px]"
        shadow="sm"
      >
        <CardHeader className="flex justify-center">
          <h1 className="text-4xl uppercase">Register</h1>
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
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter email"
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
            <Input
              isRequired
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Enter confirm password"
            />
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="text-white"
              size="md"
              isLoading={loading}
            >
              Register
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <div>
            Already have a account?
            <Link
              to="/login"
              className="pl-1 underline underline-offset-2 text-primary"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
