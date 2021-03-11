import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEditProjectForm from '../components/AddEditProjectForm';
import AddEditTaskForm from '../components/AddEditTaskForm';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import Tasks from '../components/Tasks';
import {
  fetchProject,
  updateProject,
  fetchTasks,
} from '../redux/actions/projectActions';
import { addTask } from '../redux/actions/taskActions';

const ProjectScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector(
    (state) => state.projectFetch
  );
  const { tasks, loading: tasksLoading, error: tasksError } = useSelector(
    (state) => state.tasksFetch
  );
  const { success: addTaskSuccess } = useSelector((state) => state.taskAdd);
  const { success: deleteTaskSuccess } = useSelector(
    (state) => state.taskDelete
  );

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [projectDescriptionError, setProjectDescriptionError] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskNameError, setTaskNameError] = useState('');
  const [taskDescriptionError, setTaskDescriptionError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const id = match.params.id;

  // console.log(project, projectName, projectDescription);

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description);
      dispatch(fetchTasks(project._id));
    }
  }, [project]);

  useEffect(() => {
    // if (project) {
    //   setProjectName(projectName);
    //   setProjectDescription(projectDescription);
    // }
    dispatch(fetchProject(id));
  }, [dispatch, id, addTaskSuccess, deleteTaskSuccess]);

  const addTaskHandler = (e) => {
    e.preventDefault();

    if (taskName !== '' && taskDescription !== '') {
      dispatch(
        addTask({
          project: project._id,
          name: taskName,
          description: taskDescription,
        })
      );
      setTaskNameError('');
      setTaskDescriptionError('');
      setTaskName('');
      setTaskDescription('');
      setShowTaskForm(false);
    } else {
      if (taskName === '') {
        setTaskNameError("Task's name is required");
      }
      if (taskDescription === '') {
        setTaskDescriptionError("Task's decsription is required");
      }
    }
  };

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
      {showTaskForm && (
        <AddEditTaskForm
          setTaskName={setTaskName}
          taskName={taskName}
          taskNameError={taskNameError}
          setTaskDescription={setTaskDescription}
          taskDescription={taskDescription}
          taskDescriptionError={taskDescriptionError}
          setShowTaskForm={setShowTaskForm}
          addTaskHandler={addTaskHandler}
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
          <div className='btn btn--dark' onClick={() => setShowTaskForm(true)}>
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
            <div className='project-tasks__title my-1'>
              <h4>Project's Tasks</h4>
            </div>
            <div className='project-tasks__list'>
              {tasksLoading && <Spinner />}
              {tasksError && <Message>{tasksError}</Message>}
              {tasks && <Tasks tasks={tasks} />}
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default ProjectScreen;
