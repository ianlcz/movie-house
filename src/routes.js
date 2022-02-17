import Credit from "./screens/Credit";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Create from "./screens/movie/create";
import Delete from "./screens/movie/delete";
import Read from "./screens/movie/read";
import Update from "./screens/movie/update";
import Register from "./screens/Register";

const routes = [
  {
    path: "/",
    component: localStorage.getItem("authToken") ? <Home/> : <Login/>,
    isProtected: false,
  },
  { path: "/register", component: <Register />, isProtected: false },
  { path: "/new", component: <Create />, isProtected: true },
  { path: "/movie/:title", component: <Read />, isProtected: true },
  { path: "/edit/:reference/:title", component: <Update />, isProtected: true },
  {
    path: "/delete/:reference/:title",
    component: <Delete />,
    isProtected: true,
  },
  { path: "/credit/:title", component: <Credit />, isProtected: true },
];

export default routes;
