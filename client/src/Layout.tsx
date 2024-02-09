import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default Layout;
