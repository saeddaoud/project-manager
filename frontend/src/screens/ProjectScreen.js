import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { fetchProject } from '../redux/actions/projectActions';

const ProjectScreen = ({ match }) => {
  const id = match.params.id;

  const dispatch = useDispatch();
  const { project, loading, success, error } = useSelector(
    (state) => state.projectFetch
  );

  useEffect(() => {
    dispatch(fetchProject(id));
  }, [dispatch, id]);

  return (
    // <div className='page profile-page'>
      <div className='container flex flex-jcsb flex-fdc'>
        {loading && <Spinner />}
        {error && <Message>{error}</Message>}
        {project && <h3>{project.name}</h3>}
      </div>
    // </div>
  );
};

export default ProjectScreen;
