import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NewTask from "../components/NewTask";
import AllTasks from "../components/AllTasks";



let userIdFromStorage = localStorage.getItem("userId");

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(userIdFromStorage);

  useEffect(() => {
    function fetchTasks(userID) {
      const params = new URLSearchParams({
        userId: userID,
      });
  
      fetch(`http://localhost:3001/api/tasks?${params}`)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    fetchTasks(userId); 
  }, []);

  console.log(tasks);
  return (
    <div className="flex justify-around h-screen w-screen ">
      <Sidebar setTasks={setTasks} tasks={tasks}/>
      <div className="w-8/12">
        <h2>Hi there</h2>
        <NewTask tasks={tasks} userId={userId} setTasks={setTasks}/>
        <AllTasks tasks={tasks} userId={userId} setTasks={setTasks}/>
      </div>
    </div>
  );
};

export default Dashboard;
