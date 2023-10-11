import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ProfilePage from "./pages/profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: '/profile',
      element: <ProfilePage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
