const express = require('express');
const routes = express.Router();

const GroupController = require('./controllers/GroupController');
const AuthenticateController = require('./controllers/AuthenticateController');

routes.get('/groups', GroupController.get);
routes.get('/groups/:id', GroupController.getById);
routes.get('/groups/by/:userId', GroupController.getByUser);
routes.post('/group', GroupController.create);
routes.delete('/group/:id', GroupController.delete);

routes.post('/group/:groupId/member', GroupController.addMember);
routes.delete('/group/:groupId/member/:memberId', GroupController.deleteMember);

routes.post('/signIn', AuthenticateController.signIn);
routes.post('/signUp', AuthenticateController.signUp);

module.exports = routes;
