import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/login-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { accessToken } = response.data;

      console.log("Access Token:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
    </div>
  );
}
