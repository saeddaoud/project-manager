import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { registerEmployee } from '../redux/actions/employeeActions';

const RegistrationScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(
    (state) => state.employeeRegister
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (userInfo) {
      history.push('/profile/me');
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      dispatch(registerEmployee({ name, email, password }));
    }
  };
  return (
    // <div className='page signup-page'>
    <div className='container flex flex-jcc flex-fdc'>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <form className='form flex flex-fdc flex-jcsa' onSubmit={submitHandler}>
        <div className='input-control'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='e.g., John Doe'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className='input-control'>
          <label>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <small>{confirmPasswordError}</small>}
        </div>
        <button type='submit' className='btn'>
          Sign up
        </button>
      </form>
      <p className='my-2'>
        Already have an account? Sign in
        <Link to='/login'> here</Link>
      </p>
    </div>
    // </div>
  );
};

export default RegistrationScreen;
