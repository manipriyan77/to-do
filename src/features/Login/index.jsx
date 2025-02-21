import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { login } from '../../store/slices/userSlice';
import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
  function handleLogin(e) {
    e.preventDefault();
    dispatch(login({ userName, password }));
  }
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = Cookies.get('todoLoggedIn');
      if (loggedIn) {
        navigate('/');
      }
    };

    checkLoginStatus();
  }, [navigate]);
  return (
    <section className="login_container">
      <form className="login flex flex-col">
        <h1 className="">Login</h1>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={handleLogin}>Submit</button>
      </form>
    </section>
  );
};

export default Login;
