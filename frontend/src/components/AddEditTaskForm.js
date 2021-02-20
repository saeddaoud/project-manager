import React from 'react';
import BackDrop from './BackDrop';

const AddEditTaskForm = ({
  setTaskName,
  taskName,
  taskNameError,
  setTaskDescription,
  taskDescription,
  taskDescriptionError,
  setShowTaskForm,
  addTaskHandler,
  edit = false,
}) => {
  return (
    <>
      <BackDrop />
      <form className='form add-form' onSubmit={addTaskHandler}>
        <div className='input-control'>
          <label>Tasks's Name</label>
          <input
            type='text'
            placeholder="Enter Task's Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {taskNameError && <small>{taskNameError}</small>}
        </div>
        <div className='input-control' style={{ height: '140px' }}>
          <label>Task's Description</label>
          <textarea
            placeholder="Enter Task's Description"
            rows='5'
            // cols='35'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          {taskDescriptionError && <small>{taskDescriptionError}</small>}
        </div>

        <div className='flex'>
          <button className='btn btn--add' type='submit'>
            {edit ? 'Update Task' : 'Add Task'}
          </button>
          <button
            className='btn'
            onClick={() => {
              setShowTaskForm(false);
              setTaskName('');
              setTaskDescription('');
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditTaskForm;
