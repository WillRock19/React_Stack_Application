const { Router } = require('express');
const routes = Router();
const axios = require('axios');
const Dev = require('./models/Dev');

routes.get('/', (request, response) => {
    console.log('Teste');
    return response.json({ fatos: 'O servidor tá no ar, bichão! :D' });
});

routes.post('/devs', async (request, response) => {
    const { github_username, techs } = request.body;

    const result = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = login, avatar_url, bio } = result.data;

    const devCadastrado = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio, 
        techs
    });
    return response.json({ sucesso: true, cadastrado: devCadastrado });
});

module.exports = routes;