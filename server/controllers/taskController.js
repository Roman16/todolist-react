const Todolist = require("../models/taskModels");

const controller = {};

controller.index = (req, res) => {
    Todolist.find()
        .then(todolist => {
            res.json(todolist);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "400", err});
        });
};

controller.create = (req, res) => {
    let data = new Todolist(req.body);
    data.save()
        .then(task => {
            res.json({message: "ok", task});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "400", err});
        });
};

controller.update = (req, res) => {
    Todolist.findOneAndUpdate({_id: req.body._id}, {
        $set: {
            title: req.body.title,
            done: req.body.done
        }
    }, {new: true}, (err, doc) => {
        if (err) {
            return err
        }
        res.sendStatus(200)
    });
};

controller.destroy = (req, res) => {
    Todolist.findOneAndDelete({_id: req.body.id}, (err, doc) => {
        if (err) {
            return err
        }
        res.sendStatus(200)
    })
};

controller.moveCard = (req, res) => {
    Todolist.remove({}, (err, doc) => {
        if (err) {
            return err
        }
        Todolist.create(req.body)
        res.sendStatus(200)

    })
};

module.exports = controller;
