import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Layout from "./Layout";
import SetAvatar from "./pages/SetAvatar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Chat />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="setAvatar" element={<SetAvatar />} />
          </Route>
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  </>
);
