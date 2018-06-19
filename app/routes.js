const taskController = require('./controllers/taskController');

const apiPrefix = '/api/';

module.exports = (app)=>{
    app.use(apiPrefix+'task',        taskController);
};
