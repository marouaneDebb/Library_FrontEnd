import React, { useState, useEffect } from 'react';

import Login from './login';
import HomeUser from '../home/HomeUser';
function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  

  return (
    
    <div>
      {isLoggedIn ? <div> mar7ba bik</div> : <Login />}
    </div>
  );
}

export default Auth;