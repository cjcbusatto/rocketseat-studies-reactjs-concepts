import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {}).then(console.log);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`, {});
    if (response.status === 204) {
      setRepositories(repositories.filter((repository) => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Add</button>
    </div>
  );
}

export default App;
