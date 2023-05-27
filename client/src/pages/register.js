import React, {useState} from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import pattern from '../assets/images/pattern.png'
import PrimaryButton from '../components/PrimaryButton';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      return;
    }

    try {
      const response = await fetch('https://task-buddy.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');

      } else {
        toast("Something went wrong, check your details and try again!", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row bg-[#222222] text-neutral-300">
      <section className="h-[30vh] md:h-screen w-full md:w-2/6 lg:w-3/6">
        <img src={pattern} className="h-full w-full object-cover object-top" alt=""/>
      </section>
      <section className="h-screen w-full md:w-4/6 lg:w-3/6 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-4/6">
          <div className="flex justify-center mb-5">
            <img src={logo} className="w-[9rem]" alt="logo"/>
          </div>

          <div className="flex flex-col">
            <label for="name" className="text-sm">Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="basic-input"
            />
          </div>
          
          <div className="flex flex-col">
            <label for="email" className="text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="basic-input"
            />
          </div>
          <div className="flex flex-col">
            <label for="password" className="text-sm">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="basic-input"
            />
          </div>

          <PrimaryButton type="submit" text="Register" />
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-primary underline font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register