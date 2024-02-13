import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/root/Root";
import { HomePage } from "./pages/home/Home";
import { EventsPage } from "./pages/event/Events";
import { UserPage } from "./pages/user/UserPage";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "events",
          element: <EventsPage />,
        },
        {
          path: "user/:username",
          element: <UserPage />,
        },
      ],
    },
  ]);

  return (
    <div id="App">
      <RouterProvider router={router} />
    </div>
  );
};
