import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar'
import ToDoCard from '../components/ToDoCard'




const Dashboard = () => {

  // const { data, isFetching, error } ;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  let item_value = sessionStorage.getItem("userData");
  let userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription) {
      return;
    }

    fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId: userId, 
        title: taskTitle, 
        description: taskDescription 
      }),
    })
      .then((response) => {
    
        if (response.ok) {
          return response.json();

        } else {
           toast.error("Wow so easy !");
          throw new Error('Request failed');
          
        }
      })
      .then((data) => {
        console.log(data);
        //Add new task to array of tasks
      })
      .catch((error) => {
        console.error(error);
       
      });    
  };



  return (
    <div className='flex justify-around h-screen w-screen'>
    <Sidebar/>
    <div className='w-8/12'>
    <h2>Hi there</h2>
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
    <ToDoCard title={'Hello'} content={'hi thejhej'} id={1}/>
    </div>
    </div>
  );
}

export default Dashboard