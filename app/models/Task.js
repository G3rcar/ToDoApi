const util = require('util');
let BaseModel = require('./BaseModel');

let Task = util._extend({},BaseModel);

Task.modelObj = global.database.task;
Task.viewObj = null;



module.exports = Task;
