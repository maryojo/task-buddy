import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTask = ({ tasks, setTasks, userId }) => {
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
          return response.json();
        } else {
          toast.error("Wow so easy !");
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        let newTask = data;
        setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success("Your task has been added");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-zinc-100 text-zinc-900 rounded-md w-[95%] flex justify-between"
    >
      <div className="flex flex-col gap-5 w-full">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full border-none focus:outline-none focus:border-none bg-transparent"
          placeholder="What task do you have to do?"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full border-none focus:outline-none focus:border-none bg-transparent"
          placeholder="Add a detailed description here"
        />
      </div>

      <button type="submit" className="bg-primary rounded-md p-4 h-14">
        Add
      </button>
    </form>
  );
};

export default NewTask;
