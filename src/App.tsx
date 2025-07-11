import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayOut from "./components/HomeLayOut";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
