const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async showAll (request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async storeDev (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        const dev = await Dev.findOne({ github_username });

        if(dev){
            return response.json({ sucesso: false, mensagem: 'User already exists!' });
        }

        const techsForSaving = techs.split(',').map(tech => tech.trim());
        const result = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = result.data;
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    
        const devCadastrado = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio, 
            techs: techsForSaving,
            location
        });
        return response.json({ sucesso: true, cadastrado: devCadastrado });
    }
};
    