import React, { useEffect, useState } from 'react';
import './App.css';
import './global.css';
import './sidebar.css';
import './Main.css';

import apiCaller from './services/apiCaller';

function App() {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      }, 
      (error) => {
        console.log(error);
    });
  }, []);

  async function handleAddDeveloper(event){
    event.preventDefault();

    const response = await apiCaller.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    console.log(response.data);
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
          <li className="dev-info">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/6953687?s=460&v=4" alt="imagem do will" />
              <div className="user-details">
                <strong>William Porto</strong>
                <span>React, DotNet Core, React Native</span>
              </div>
            </header>            
            <p>Program Enginneer at Dasko Ltda. Apaixonado por escrita e desafios no desenvolvimento dos códigos da vida</p>
            <a href="https://github.com/WillRock19">Acessar Github</a>
          </li>
          <li className="dev-info">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/6953687?s=460&v=4" alt="imagem do will" />
              <div className="user-details">
                <strong>William Porto</strong>
                <span>React, DotNet Core, React Native, Java</span>
              </div>
            </header>            
            <p>Program Enginneer at Dasko Ltda. Apaixonado por escrita e desafios no desenvolvimento dos códigos da vida</p>
            <a href="https://github.com/WillRock19">Acessar Github</a>
          </li>
          <li className="dev-info">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/6953687?s=460&v=4" alt="imagem do will" />
              <div className="user-details">
                <strong>William Porto</strong>
                <span>React, DotNet Core, React Native, Java</span>
              </div>
            </header>            
            <p>Program Enginneer at Dasko Ltda. Apaixonado por escrita e desafios no desenvolvimento dos códigos da vida</p>
            <a href="https://github.com/WillRock19">Acessar Github</a>
          </li>
          <li className="dev-info">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/6953687?s=460&v=4" alt="imagem do will" />
              <div className="user-details">
                <strong>William Porto</strong>
                <span>React, DotNet Core, React Native, Java</span>
              </div>
            </header>            
            <p>Program Enginneer at Dasko Ltda. Apaixonado por escrita e desafios no desenvolvimento dos códigos da vida</p>
            <a href="https://github.com/WillRock19">Acessar Github</a>
          </li>
        </ul>
      </main>
    </section>
  );
}

export default App;
