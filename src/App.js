import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [count, setCount] = useState(0);

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository ${count}`,
      url: `https://github.com/${count}`,
      techs: '["Javascript", "ReactJS"]'
    })
    setCount(count + 1);
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)

    const filteredRepositoriesByID = repositories.filter(repo => repo.id !== id);

    setRepositories([...filteredRepositoriesByID]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => {
          return(
            
            <li key={repo.id}> {repo.title} 

            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button>

            </li>

          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
