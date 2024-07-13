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
            path: "/register",
            element: <Register/>
          },
          {
              path: "/search",
              element: <Search />
          }
      ]
  },
]);

export default router;