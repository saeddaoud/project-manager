import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div className='page signup-page'>
      <div className='container flex flex-jcc flex-fdc'>
        <form className='form flex flex-fdc flex-jcsa'>
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
    </div>
  );
};

export default RegistrationScreen;
