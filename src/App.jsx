import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Home from './features/Home';

const App = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = Cookies.get('todoLoggedIn');
      if (!loggedIn) {
        navigate('/login');
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }
  return (
    <div className="h-screen">
      <Home />
    </div>
  );
};

export default App;
