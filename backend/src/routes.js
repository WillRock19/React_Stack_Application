const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', DevController.showAll);

routes.post('/devs', DevController.storeDev);

routes.get('/search', SearchController.index)

module.exports = routes;