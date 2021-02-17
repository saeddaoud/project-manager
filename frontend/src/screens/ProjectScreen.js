import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEditProjectForm from '../components/AddEditProjectForm';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { fetchProject, updateProject } from '../redux/actions/projectActions';

const ProjectScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector(
    (state) => state.projectFetch
  );

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [projectDescriptionError, setProjectDescriptionError] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);

  const id = match.params.id;

  // console.log(project, projectName, projectDescription);

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description);
    }
  }, [project]);

  useEffect(() => {
    // if (project) {
    //   setProjectName(projectName);
    //   setProjectDescription(projectDescription);
    // }
    dispatch(fetchProject(id));
  }, [dispatch, id]);

  const editProjectHandler = (e) => {
    e.preventDefault();

    if (projectName !== '' && projectDescription !== '') {
      dispatch(
        updateProject({
          projectId: project._id,
          name: projectName,
          description: projectDescription,
        })
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
    // <div className='page profile-page'>
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
          addProjectHandler={editProjectHandler}
          edit={true}
        />
      )}
      <div className='add-container my-1 flex flex-jcsa'>
        <div
          className='add-container__btn'
          // onClick={() => setShowAddProjectForm(true)}
        >
          <div
            className='btn btn--dark'
            onClick={() => setShowProjectForm(true)}
          >
            <i className='far fa-edit'></i> Edit Project
          </div>
          {/* <i className='far fa-plus-square'></i> */}
        </div>
        <div
          className='add-container__btn'
          // onClick={() => setShowAddProjectForm(true)}
        >
          <div className='btn btn--dark'>
            <i className='fas fa-plus'></i> Add Task
          </div>
          {/* <i className='far fa-plus-square'></i> */}
        </div>
      </div>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      {project && (
        <div className='project-details flex flex-fdc'>
          <div className='project-summary'>
            <div className='project-summary__item project-summary__item--title'>
              <h3>Project's Summary</h3>
            </div>
            <div className='project-summary__item project-summary__item--name'>
              {project.name}
            </div>
            <div className='project-summary__item project-summary__item--desc'>
              {project.description}
            </div>
          </div>
          <div className='h-line'></div>
          <div className='project-tasks'>
            <div className='project-tasks__title'>
              <h4>Project's Tasks</h4>
            </div>
            <div className='project-tasks__list'></div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default ProjectScreen;
