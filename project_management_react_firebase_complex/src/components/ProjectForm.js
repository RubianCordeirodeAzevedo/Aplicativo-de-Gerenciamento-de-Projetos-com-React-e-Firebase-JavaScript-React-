import React, { useState } from 'react';
import { addProject } from '../services/projectService';

const ProjectForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = {
      title,
      description,
      userId: user.uid,
      userName: user.displayName,
    };
    await addProject(project);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
