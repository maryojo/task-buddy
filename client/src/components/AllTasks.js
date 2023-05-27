import React, { useState, useEffect } from "react";
import ToDoCard from "./ToDoCard";
import fetchTasks from "./fetchTasks";

// let userId = localStorage.getItem("userId");


const AllTasks = ({userId, tasks, setTasks}) => {
 
  // useEffect(() => {
  //   fetchTasks(userId)
  //     .then((fetchedTasks) => {
  //       setTasks(fetchedTasks);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching tasks:", error);
  //     });
  // }, []);

  const handleUpdateTask = ( id, name, content ) => {
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
  console.log(tasks);
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
          />
        );
      })}
    </div>
  );
  };
};

export default AllTasks;
