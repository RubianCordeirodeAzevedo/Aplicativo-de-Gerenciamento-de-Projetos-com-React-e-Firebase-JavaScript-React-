import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../services/projectService';

const ProjectList = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects(user.uid, statusFilter);
    setProjects(fetchedProjects);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <div>
      <h2>Project List</h2>
      <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Status: {project.status}</p>
          <button onClick={() => handleDelete(project.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
