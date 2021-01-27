import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='page login-page'>
      <div className='container flex flex-jcc flex-fdc'>
        <form className='form flex flex-fdc flex-jcsa'>
          <div className='input-control'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='user@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-control'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn'>
            Login
          </button>
        </form>
        <p className='my-2'>
          Do not have an account? Sign up
          <Link to='/signup'> here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
