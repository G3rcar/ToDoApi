let express = require('express');
let router = express.Router();

let Task = null;

router.get('/', async (req, res) => {
    if(Task == null) Task = require('../models/Task');

    let results = await Task.findAll();
    res.send({data:results});
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if(Task == null) Task = require('../models/Task');

    let task = await Task.find({id:id});
    if(task==null){
        task = {
            id:null,
            title:null,
            description:null,
            date:null,
            state:null
        }
    }

    res.send(task);
});

router.post('/:id?', async (req, res) => {
    if(Task == null) Task = require('../models/Task');

    let id = req.params.id;
    let editing = (id!=null);


    let task = {};
    if(editing){
        task = await Task.find({id:id});
        if(task==null){
            res.send({
                success: false,
                message: 'No existe el registro'
            });
            return;
        }
    }
    if(req.body.title!=null){
        task.title = req.body.title;
    }
    if(req.body.description!=null){
        task.description = req.body.description;
    }

    if(req.body.date!=null){
        task.date = req.body.date;
    }

    if(req.body.status!=null){
        task.status = req.body.status;
    }

    await Task.save(task);

    res.send({
        success: true,
        message: 'Guardado con éxito'
    });
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    if(Task == null) Task = require('../models/Task');

    let success = true;
    let message = 'Borrado con éxido';

    let task = await Task.delete({id:id});
    if(!Array.isArray(task) || task.length == 0){
        success = false;
        message = 'No encontrado';
    }

    res.send({
        success:success,
        message:message
    });
})

module.exports = router;
