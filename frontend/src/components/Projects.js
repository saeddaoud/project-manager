import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  // console.log(projects);
  return (
    <ul className='projects-list'>
      {projects.map((project) => (
        <Link to={`/project/${project._id}`} key={project._id}>
          <li>
            <div className='flex'>
              <div>Name: {project.name}</div>
              <div>Status: {project.status}</div>
            </div>
            <div className='flex'>
              <div>Tasks: {project.name}</div>
              <div>Employees:{project.status}</div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Projects;
