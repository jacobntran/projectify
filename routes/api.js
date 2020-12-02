const express = require('express');
const mongoose = require('mongoose');
const asyncHelper = require('async');
require('dotenv').config({ path: __dirname + '/../.env' });

const router = express.Router();

const Projects = require('../models/ProjectSchema');
const Users = require('../models/UserSchema');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//get all projects associated to user
router.get('/:userId/project/all', (req, res) => {
  Projects.find({ users: { $all: [req.params.userId] } }, (err, data) => {
    if (err) throw err;

    if (data) {
      res.json(data);
    }
  });
});

//get specific project
router.get('/project/:id', (req, res) => {
  Projects.findById(req.params.id, (err, data) => {
    if (err) throw err;
    if (data) {
      res.json(data);
    }
  });
});

router.post('/project/new', (req, res) => {
  Projects.create(req.body, (err, data) => {
    if (err) {
      res.send(err);
    }
    if (data) {
      res.send(data);
    }
  });
});

//insert new task to a specific project
router.put('/project/:id/task/new', (req, res) => {
  Projects.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { tasks: req.body } },
    (err, data) => {
      if (err) throw err;
      if (data) {
        res.sendStatus(200);
      }
    }
  );
});

router.put('/project/:id/chat', (req, res) => {
  Projects.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    { $push: { chat: req.body } },
    (err, data) => {
      if (err) throw err;
      if (data) res.sendStatus(200);
    }
  );
});

//edit task status

router.put('/project/:id/task/edit/:taskId', (req, res) => {
  Projects.findOneAndUpdate(
    {
      _id: req.params.id,
      'tasks._id': req.params.taskId,
    },
    {
      $set: {
        'tasks.$.status': req.body.status,
      },
    },
    (err, data) => {
      if (err) throw err;
      if (data) {
        res.sendStatus(200);
      }
    }
  );
});

router.post('/user/new', (req, res) => {
  Users.findOne({ _id: req.body._id }, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      res.json(user);
    } else {
      Users.create(req.body, (error, newUser) => {
        if (error) {
          throw error;
        }
        if (newUser) {
          res.json(newUser);
        }
      });
    }
  });
});

//request permission to view/edit project
router.put('/project/request/permission', (req, res) => {
  const { _id, users, projectId, notification, requesterId } = req.body;

  //update each project user with notification with async library
  asyncHelper.eachSeries(users, (id, done) => {
    Users.update(
      { _id: id },
      {
        $push: {
          notifications: {
            _id,
            projectId,
            notification,
            requesterId,
          },
        },
      },
      done
    ),
      (err) => {
        if (err) throw err;
      };
  });
});

router.put('/accept/request/:id', (req, res) => {
  const { id: projectID } = req.params;
  const { userId, requesterID, notificationID } = req.body;

  Projects.findOneAndUpdate(
    { _id: projectID },
    { $push: { users: requesterID } }
  ).then((res) => console.log(res));
  Users.findOneAndUpdate(
    { _id: userId },
    { $pull: { notifications: { _id: notificationID } } }
  ).then((response) => {
    res.json(response);
  });
});

module.exports = router;
