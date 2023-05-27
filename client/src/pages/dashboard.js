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

  return (
    <div className="flex flex-col md:flex-row justify-around min-h-screen w-screen bg-[#222222] text-neutral-50">
      <Sidebar setTasks={setTasks} tasks={tasks}/>
      <div className="w-full md:w-8/12 flex flex-col gap-5 md:py-4 py-2 md:px-0 px-5 md:ml-[25%]">
        <h2 className="text-2xl pt-5">Hi there 👋</h2>
        <NewTask tasks={tasks} userId={userId} setTasks={setTasks}/>
        <AllTasks tasks={tasks} userId={userId} setTasks={setTasks}/>
      </div>
    </div>
  );
};

export default Dashboard;
