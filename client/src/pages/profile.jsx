import { useEffect, useState } from "react";
import { api } from "../api/api-config";

export default function ProfilePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await api.get("/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error("Failed to fetch data:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{message}</p>
    </div>
  );
}
