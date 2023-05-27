import React, { useState, useEffect } from "react";
import ToDoCard from "./ToDoCard";


const AllTasks = ({userId, tasks, setTasks}) => {

  const handleUpdateTask = ( id, name, content, isCompleted ) => {
    const params = {
      userId: userId,
      id: id,
    };


    fetch(`http://localhost:3001/api/task/${params.userId}/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        description: content,
        completed: isCompleted,
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
        console.log(data);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateTaskStatus = ( id, isCompleted ) => {
    const params = {
      userId: userId,
      id: id,
    };


    fetch(`http://localhost:3001/api/task/${params.userId}/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: isCompleted,
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
          prevTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTask = ( id ) => {
    const params = {
      userId: userId,
      id: id,
    };

    fetch(`http://localhost:3001/api/task/${params.userId}/${params.id}`, {
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
      }).then((data) => {
        console.log(data);
        setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if(tasks !== undefined) {
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
  };
};

export default AllTasks;
