import React, { useState } from 'react';

const ProjectsScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(keyword);
    setKeyword('');
  };
  return (
    <div className='container flex flex-jcc flex-aifs'>
      <div className='actions flex flex-aife my-1'>
        <div className='search '>
          <form
            onSubmit={handleSubmit}
            className='form flex flex-fdc flex-jcsa'
            style={{
              minHeight: '25px',
              width: '100%',
              border: 'none',
              padding: '0',
              boxShadow: 'none',
            }}
          >
            <div
              className='input-control'
              style={{
                height: '50px',
                marginBottom: '0',
                width: '90%',
                borderBottom: '1px solid black',
              }}
            >
              {/* <label>Keyword</label> */}
              <input
                style={{ top: '15px', width: '100%' }}
                type='text'
                placeholder='search project'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='filter'>
          <select
            name='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
