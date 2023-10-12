import { useState } from "react";
import LoginForm from "../components/login-form";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api-config";

export default function Login() {
  const [identifier, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/login",
        {
          identifier,
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
      <LoginForm onSubmit={handleSubmit} username={identifier} setUsername={setUsername} password={password} setPassword={setPassword} />
    </div>
  );
}
