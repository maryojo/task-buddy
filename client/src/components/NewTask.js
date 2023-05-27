import React, {useState} from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchTasks from './fetchTasks';

const NewTask = ({tasks, setTasks, userId}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription) {
      return;
    }

    fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: taskTitle,
        description: taskDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          toast.error("Wow so easy !");
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        console.log(data);
        let newTask = data;
        setTasks((prevTasks) => [...prevTasks, newTask]);
        console.log(tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      placeholder="What task do you have to do?"
    />
    <input
      type="text"
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      placeholder="Add anything else here"
    />
    <button type="submit">Add</button>
  </form>
  )
}

export default NewTask