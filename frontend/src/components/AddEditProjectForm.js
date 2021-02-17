import React from 'react';
import BackDrop from './BackDrop';

const AddEditProjectForm = ({
  setProjectName,
  projectName,
  projectNameError,
  setProjectDescription,
  projectDescription,
  projectDescriptionError,
  setShowProjectForm,
  addProjectHandler,
  edit = false,
}) => {
  return (
    <>
      <BackDrop />
      <form className='form add-project-form' onSubmit={addProjectHandler}>
        <div className='input-control'>
          <label>Project's Name</label>
          <input
            type='text'
            placeholder="Enter Project's Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {projectNameError && <small>{projectNameError}</small>}
        </div>
        <div className='input-control' style={{ height: '140px' }}>
          <label>Project's Description</label>
          <textarea
            placeholder="Enter Project's Name"
            rows='5'
            // cols='35'
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {projectDescriptionError && <small>{projectDescriptionError}</small>}
        </div>

        <div className='flex'>
          <button className='btn btn--add' type='submit'>
            {edit ? 'Update Project' : 'Add Project'}
          </button>
          <button
            className='btn'
            onClick={() => {
              setShowProjectForm(false);
              setProjectName('');
              setProjectDescription('');
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditProjectForm;
