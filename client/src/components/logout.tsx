import React from "react";
import { api } from "../api/api-config";
import { useNavigate } from "react-router-dom";

function LogoutButton(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await api.post("/logout", { accessToken }, { withCredentials: true });

      localStorage.removeItem("accessToken");

      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error.response?.data || error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
