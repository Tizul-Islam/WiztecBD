import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../Compnents/Login Page/SignUp";
import Login from "../Compnents/Login Page/Login";
import PrivateRoute from "./PrivateRoute";
import Favorites from "../Compnents/Header/Favorites";

export const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoute><Main /></PrivateRoute>,
    },
]);
