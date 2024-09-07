import {
  createBrowserRouter,
} from "react-router-dom";
import Home from '../pages/Home';
import Layout from "../pages/layouts/Layout";
import Create from "../pages/Create";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AuthorEdit from "../pages/AuthorEdit";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Layout />,
      children: [
          {
              path: "",
              element: <Home />
          },
          {
              path: "/books/:id",
              element: <BookDetail />
          },
          {
            path: "/create",
            element: <Create />
          },
          {
              path: "/create/:id?",
              element: <Create />
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/login/:param",
            element: <Login/>
          },
          {
            path: "/register",
            element: <Register/>
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/author",
            element: <AuthorEdit/>
          },
          {
            path: "/author/:id",
            element: <AuthorEdit/>
          },
          {
              path: "/search",
              element: <Search />
          }
      ]
  },
]);

export default router;