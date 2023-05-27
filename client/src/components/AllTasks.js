import React, { useState, useEffect } from "react";
import ToDoCard from "./ToDoCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AllTasks = ({ userId, tasks, setTasks }) => {
  const handleUpdateTask = (id, name, content) => {
    const params = {
      userId: userId,
      id: id,
    };

    fetch(`https://task-buddy.onrender.com/api/task/${params.userId}/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        description: content,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, ...data } : task
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateTaskStatus = (id, isCompleted) => {
    const params = {
      userId: userId,
      id: id,
    };

    fetch(
      `https://task-buddy.onrender.com/api/task/update/${params.userId}/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: isCompleted,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTask = (id) => {
    const params = {
      userId: userId,
      id: id,
    };

    fetch(`https://task-buddy.onrender.com/api/task/${params.userId}/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success("Your task has been deleted");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (tasks !== undefined || tasks.length !== 0) {
    return (
      <div className="w-full flex flex-wrap gap-3">
        {tasks.map((task) => {
          return (
            <ToDoCard
              key={task.id}
              task={task}
              id={task.id}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
          );
        })}
      </div>
    );
  } else if(tasks.length === 0){
    return (
    <div className="text-zinc-500">You don't have any tasks. Click on the 'Add' button to add a new task</div>
    );
  }
};

export default AllTasks;
