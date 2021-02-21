import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddEditProjectForm from '../components/AddEditProjectForm';
import AddEditTaskForm from '../components/AddEditTaskForm';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import Tasks from '../components/Tasks';
import {
  fetchProject,
  updateProject,
  fetchProjects,
} from '../redux/actions/projectActions';
import { addTask, fetchTask, updateTask } from '../redux/actions/taskActions';

const TaskScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { task, loading, error } = useSelector((state) => state.taskFetch);
  const { success } = useSelector((state) => state.taskUpdate);
  // const { project } = useSelector((state) => state.projectFetch);
  // const { projects } = useSelector((state) => state.projectsFetch);

  //   const [employeeName, setEmployeeName] = useState('');
  //   const [employeeDescription, setEmployeeDescription] = useState('');
  //   const [employeeNameError, setEmployeeNameError] = useState('');
  //   const [employeeDescriptionError, setEmployeeDescriptionError] = useState('');
  //   const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskNameError, setTaskNameError] = useState('');
  const [taskDescriptionError, setTaskDescriptionError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const id = match.params.id;

  // console.log(project, projectName, projectDescription);

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    // if (project) {
    //   setProjectName(projectName);
    //   setProjectDescription(projectDescription);
    // }
    dispatch(fetchTask(id));
  }, [dispatch, id, success]);

  //   const addEmployeeHandler = (e) => {
  //     e.preventDefault();

  //     if (employeeName !== '' && employeeDescription !== '') {
  //       dispatch(
  //         addEmployee({
  //           project: project._id,
  //           name: employeeName,
  //           description: employeeDescription,
  //         })
  //       );
  //       setEmployeeNameError('');
  //       setEmployeeDescriptionError('');
  //       setEmployeeName('');
  //       setEmployeeDescription('');
  //       setShowEmployeeForm(false);
  //     } else {
  //       if (employeeName === '') {
  //         setEmployeeNameError("Employee's name is required");
  //       }
  //       if (employeeDescription === '') {
  //         setEmployeeDescriptionError("Employee's decsription is required");
  //       }
  //     }
  //   };

  const editTaskHandler = (e) => {
    e.preventDefault();

    if (taskName !== '' && taskDescription !== '') {
      dispatch(
        updateTask({
          taskId: task._id,
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

  return (
    // <div className='page profile-page'>
    <div className='container'>
      {/* {showProjectForm && (
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
      )} */}
      {showTaskForm && (
        <AddEditTaskForm
          setTaskName={setTaskName}
          taskName={taskName}
          taskNameError={taskNameError}
          setTaskDescription={setTaskDescription}
          taskDescription={taskDescription}
          taskDescriptionError={taskDescriptionError}
          setShowTaskForm={setShowTaskForm}
          addTaskHandler={editTaskHandler}
          edit={true}
        />
      )}
      <div className='add-container my-1 flex flex-jcsa'>
        <div
          className='add-container__btn'
          // onClick={() => setShowAddProjectForm(true)}
        >
          <div className='btn btn--dark' onClick={() => setShowTaskForm(true)}>
            <i className='far fa-edit'></i> Edit Task
          </div>
          {/* <i className='far fa-plus-square'></i> */}
        </div>
        <div
          className='add-container__btn'
          // onClick={() => setShowAddProjectForm(true)}
        >
          <div
            className='btn btn--dark'
            //   onClick={() => setShowTaskForm(true)}
          >
            <i className='fas fa-plus'></i> Assign Employee
          </div>
          {/* <i className='far fa-plus-square'></i> */}
        </div>
      </div>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      {task && (
        <div className='project-details flex flex-fdc'>
          <div className='project-summary'>
            <div className='project-summary__item project-summary__item--title'>
              <h3>Task's Summary</h3>
            </div>

            <div
              className='project-summary__item project-summary__item--name flex'
              style={{ width: '30%' }}
            >
              {task.project.name}{' '}
              <Link to={`/project/${task.project._id}`}>
                <div className='action-btn action-btn__link'>
                  <i className='fas fa-external-link-alt'></i>{' '}
                </div>
              </Link>
            </div>

            <div className='project-summary__item project-summary__item--name'>
              {task.name}
            </div>
            <div className='project-summary__item project-summary__item--desc'>
              {task.description}
            </div>
          </div>
          <div className='h-line'></div>
          <div className='project-tasks'>
            <div className='project-tasks__title my-1'>
              <h4>Task's Employees</h4>
            </div>
            <div className='project-tasks__list'>
              {/* <Tasks tasks={project.tasks} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default TaskScreen;
