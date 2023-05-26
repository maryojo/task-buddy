import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();


  const fetchTasks = (userID) => {
    const params = new URLSearchParams({
      userId: userID,
    });

      fetch(`http://localhost:3001/api/tasks?${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("userData", data);
      }).catch((error) => {
        console.error(error);
      });
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log({ email, password });
    
        if (response.ok) {
          return response.json();

        } else {
           toast.error("Wow so easy !");
          throw new Error('Request failed');
          
        }
      })
      .then((data) => {
        console.log(data);
        const token = data.token;
        const userId = data.userId;
        localStorage.setItem('userId', userId);
        fetchTasks(userId);
        localStorage.setItem('token', token);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error);
       
      });    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
