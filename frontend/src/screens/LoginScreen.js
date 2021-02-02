import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmployee } from '../redux/actions/employeeActions';
import Message from '../components/Message';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, error, loading } = useSelector(
    (state) => state.employeeLogin
  );

  console.log(userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [emailErr, setEmailErr] = useState('');
  // const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginEmployee({ email, password }));
  };

  return (
    <div className='page login-page'>
      <div className='container flex flex-jcc flex-fdc'>
        {error && <Message>{error}</Message>}
        <form className='form flex flex-fdc flex-jcsa' onSubmit={handleSubmit}>
          <div className='input-control'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='user@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {emailErr && <small>{emailErr}</small>} */}
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
            {/* {passwordErr && <small>{passwordErr}</small>} */}
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
