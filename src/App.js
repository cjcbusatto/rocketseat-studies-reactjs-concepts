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
    api.delete(`repositories`, {});
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
