import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useNavigate } from 'react-router-dom';


const LogoutButton = ({setTasks, tasks}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.removeItem("userTasks");
    sessionStorage.removeItem("userData");
    setTasks = setTasks([]);
    navigate('/');
  };

  return (
    <PrimaryButton onClick={handleLogout} text='Logout'/>
  );
};

export default LogoutButton;
