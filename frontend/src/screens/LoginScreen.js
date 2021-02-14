import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmployee } from '../redux/actions/employeeActions';
import Message from '../components/Message';
import Spinner from '../components/Spinner';

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, error, loading } = useSelector(
    (state) => state.employeeLogin
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [emailErr, setEmailErr] = useState('');
  // const [passwordErr, setPasswordErr] = useState('');

  useEffect(() => {
    if (userInfo) {
      history.push('/profile/me');
    }
  }, [userInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginEmployee({ email, password }));
  };

  return (
    // <div className='page login-page'>
      <div className='container flex flex-jcc flex-fdc'>
        {error && <Message>{error}</Message>}
        {loading ? (
          <Spinner />
        ) : (
          <form
            className='form flex flex-fdc flex-jcsa'
            onSubmit={handleSubmit}
          >
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
        )}
        <p className='my-2'>
          Do not have an account? Sign up
          <Link to='/signup'> here</Link>
        </p>
      </div>
    // </div>
  );
};

export default LoginScreen;
