import React, {useState} from 'react'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const ToDoCard = ({title, content, color, id}) => {
  const [taskTitle, setTaskTitle] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  let userId = localStorage.getItem("userId");
  let tTitle = null;
  let description = null;



  
  const handleUpdateTask = async () =>{

    const params = {
      userId: "1",
      id: "1"
    };

    fetch(`http://localhost:3001/api/task/${params.userId}/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: tTitle, 
        description: description,
      }),
    })
      .then((response) => {
    
        if (response.ok) {
          return response.json();

        } else {
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


  const handleTitleSave = ({ name, value, previousValue }) => {
    tTitle = value;
    handleUpdateTask();
  };

  const handleDescSave = ({ name, value, previousValue }) => {
    description = value;
    handleUpdateTask();
  };



  return (
    <div className=' bg-pink-300 flex gap-5 flex-col p-5 rounded-md'>
    <div>
    <EditText
    name='title'
    onSave={handleTitleSave}
    defaultValue ={title}/>
    <button>Edit</button>
    </div>
      <EditText
      name='description'
      defaultValue={content}
      onSave={handleDescSave}/>
    </div>
  )
}

export default ToDoCard