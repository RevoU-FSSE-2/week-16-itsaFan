import { useEffect, useState } from "react";
import { api } from "../api/api-config";
import LogoutButton from "../components/logout";

export default function ProfilePage() {
  const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]); // new state for todos

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await api.get("/todo/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
        setTodos(response.data.todos); // update todos state
      } catch (error) {
        console.error("Failed to fetch data:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <p>{message}</p>
        <ul>
          {todos.map(
            (
              todo // map over the todos to display each one
            ) => (
              <li key={todo._id}>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
                <p>
                  Created By: {todo.createdBy.username}, ({todo.createdBy.email})
                </p>
              </li>
            )
          )}
        </ul>
      </div>
      <LogoutButton />
    </>
  );
}
