import React, { useEffect, useState } from 'react';
import './App.css';
import './global.css';
import './sidebar.css';
import './Main.css';

import apiCaller from './services/apiCaller';

function App() {

  const [devs, setDevs] = useState([]);
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      }, 
      (error) => {
        console.log(error);
    });
  }, []);

  useEffect(() => {
    async function loadDevs(){
      const response = await apiCaller.get('/');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDeveloper(event){
    event.preventDefault();

    const response = await apiCaller.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');

    console.log('Os dados do dev salvo: ', response.data);

    setDevs([...devs, response.data.cadastrado]);
  }

  return (
    <section id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github:</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
             />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias:</label>
            <input 
              name="techs" 
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
             />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude:</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude:</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>
          <button type="submit" onClick={e => handleAddDeveloper(e)}>Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-info">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-details">
                  <strong>{dev.name}}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>            
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar Github</a>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

export default App;
