import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject } from '../redux/actions/projectActions';

import Projects from '../components/Projects';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
// import BackDrop from '../components/BackDrop';
import AddEditProjectForm from '../components/AddEditProjectForm';

const ProjectsScreen = () => {
  // const history = useHistory();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  // console.log(user);
  const { projects, error, loading } = useSelector(
    (state) => state.projectsFetch
  );

  // console.log(projects);

  const [keyword1, setKeyword1] = useState('');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('active');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [projectDescriptionError, setProjectDescriptionError] = useState('');

  useEffect(() => {
    if (keyword !== '') {
      dispatch(fetchProjects({ keyword }));
      setKeyword('');
    } else if (status === 'all') {
      dispatch(fetchProjects());
    } else {
      dispatch(fetchProjects({ status }));
    }
  }, [keyword, status, dispatch]);

  const searchProjectsHandler = (e) => {
    e.preventDefault();
    setKeyword(keyword1);
    setKeyword1('');
  };

  const addProjectHandler = (e) => {
    e.preventDefault();

    if (projectName !== '' && projectDescription !== '') {
      dispatch(
        addProject({ name: projectName, description: projectDescription })
      );
      setProjectNameError('');
      setProjectDescriptionError('');
      setProjectName('');
      setProjectDescription('');
      setShowProjectForm(false);
    } else {
      if (projectName === '') {
        setProjectNameError("Project's name is required");
      }
      if (projectDescription === '') {
        setProjectDescriptionError("Project's decsription is required");
      }
    }
  };

  return (
    <div className='container'>
      {showProjectForm && (
        <AddEditProjectForm
          setProjectName={setProjectName}
          projectName={projectName}
          projectNameError={projectNameError}
          setProjectDescription={setProjectDescription}
          projectDescription={projectDescription}
          projectDescriptionError={projectDescriptionError}
          setShowProjectForm={setShowProjectForm}
          addProjectHandler={addProjectHandler}
        />
        // <AddEditProjectForm>
        //   <BackDrop />
        //   <form className='form add-project-form' onSubmit={addProjectHandler}>
        //     <div className='input-control'>
        //       <label>Project's Name</label>
        //       <input
        //         type='text'
        //         placeholder="Enter Project's Name"
        //         value={projectName}
        //         onChange={(e) => setProjectName(e.target.value)}
        //       />
        //       {projectNameError && <small>{projectNameError}</small>}
        //     </div>
        //     <div className='input-control' style={{ height: '140px' }}>
        //       <label>Project's Description</label>
        //       <textarea
        //         placeholder="Enter Project's Name"
        //         rows='5'
        //         // cols='35'
        //         value={projectDescription}
        //         onChange={(e) => setProjectDescription(e.target.value)}
        //       />
        //       {projectDescriptionError && (
        //         <small>{projectDescriptionError}</small>
        //       )}
        //     </div>

        //     <div className='flex'>
        //       <button className='btn btn--add' type='submit'>
        //         Add Project
        //       </button>
        //       <button
        //         className='btn'
        //         onClick={() => setShowAddProjectForm(false)}
        //       >
        //         Cancel
        //       </button>
        //     </div>
        //   </form>
        // </AddEditProjectForm>
      )}

      <div className='actions flex flex-aife flex-fdc my-1'>
        {user && user.role === 'manager' && (
          <div className='add-container'>
            <div
              className='add-container__btn'
              onClick={() => setShowProjectForm(true)}
            >
              <div className='btn btn--dark'>
                <i className='fas fa-plus'></i> Add Project
              </div>
              {/* <i className='far fa-plus-square'></i> */}
            </div>
          </div>
        )}
        <div className='flex flex-aife' style={{ width: '100%' }}>
          <div className='search'>
            <form
              onSubmit={searchProjectsHandler}
              className='form flex flex-fdc flex-jcsa'
              style={{
                minHeight: '25px',
                width: '100%',
                border: 'none',
                padding: '0',
                boxShadow: 'none',
                borderRadius: '0',
                borderBottom: '1px solid black',
              }}
            >
              {/* <div
                className='input-control'
                style={{
                  height: '30px',
                  marginBottom: '0',
                  width: '100%',
                }}
              > */}
              {/* <label>Keyword</label> */}
              <input
                style={{ top: '15px', width: '100%' }}
                type='text'
                placeholder='Search Projects'
                value={keyword1}
                onChange={(e) => setKeyword1(e.target.value)}
              />
              {/* </div> */}
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
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className='display-projects flex flex-aifs flex-fdc'>
        {projects && <Projects projects={projects} />}
      </div>
    </div>
  );
};

export default ProjectsScreen;
