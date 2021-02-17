import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '../redux/actions/projectActions';

const Projects = ({ projects }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  // console.log(projects);
  return (
    <ul className='projects-list'>
      {projects.map((project) => (
        // <Link to={`/project/${project._id}`} key={project._id}>
        <li key={project._id}>
          <div className='flex'>
            <div>Name: {project.name}</div>
            <div>Status: {project.status}</div>
            <div
              className={
                user && user.role === 'manager'
                  ? 'action-btns flex'
                  : 'action-btns flex flex-jcfe'
              }
            >
              {user && user.role === 'manager' && (
                <div
                  className='action-btn action-btn__delete'
                  onClick={() => dispatch(deleteProject(project._id))}
                >
                  <i className='far fa-trash-alt'></i>
                </div>
              )}
              {/* {user && user.role === 'manager' && (
                <div className='action-btn action-btn__edit'>
                  <i className='far fa-edit'></i>
                </div>
              )} */}
              <Link to={`/project/${project._id}`}>
                <div className='action-btn action-btn__link'>
                  <i className='fas fa-external-link-alt'></i>{' '}
                </div>
              </Link>
            </div>
          </div>
          <div className='flex'>
            <div>Tasks: {project.name}</div>
            <div>Employees:{project.status}</div>
          </div>
        </li>
        // </Link>
      ))}
    </ul>
  );
};

export default Projects;
