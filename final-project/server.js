const express = require('express');
const path = require('path');
const ProjectDB = require('./server/projectdb')
const UserDB = require('./server/userdb')
const MessageDB = require('./server/messagedb')
const Recommender = require('./server/recommender')
const bodyParser = require('body-parser');
const database = require("./server/database");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json({
  extended: true
}));

database.initialize();
const projectDB = new ProjectDB(database);
const userDB = new UserDB(database);
const messageDB = new MessageDB(database);
const recommender = new Recommender(projectDB, userDB);

// projectDB.create({ 'name' : 'Test'}, console.log)

app.route('/api/projects')
  .get((req, res) => {
    projectDB.getAll(function(json){
      res.json(json);
    });
  })
  .post((req, res) => {
    projectDB.create(req.body, function(id){
      var project = req.body;
      project.id = id;
      res.json(project);
    });
  })

app.route('/api/projects/:id')
  .get((req, res) => {
    projectDB.get(req.params.id, function(json){
      res.json(json);
    });
  })
  .put((req, res) => {
    projectDB.update(req.params.id, req.body, function(id){
      res.json(req.body);
    });
  })
  .delete((req, res) => {
    projectDB.remove(req.params.id, function(didRemove){
      res.json({'removed': didRemove});
    })
  })

app.route('/api/projects/recommended/:email')
  .get((req, res) => {
    recommender.getRecommendedProjects(req.params.email, projects => res.json(projects));
  })

app.route('/api/users')
  .post((req, res) => {
    userDB.create(req.body, function(id){
      res.json({ success: true });
    });
  })
  .get((req, res) => {
    userDB.getAll(users => res.json(users));
  })

app.route('/api/users/authentication')
  .post((req, res) => {
    userDB.authenticate(req.body, function(user){
      res.json(user);
    });
  })

app.route('/api/users/:email')
  .get((req, res) => {
    userDB.getBasicInfo(req.params.email, function(user){
      res.json(user);
    })
  })
  .put((req, res) => {
    userDB.update(req.body.id, req.body.user, id => res.json(req.body.user));
  })


app.get('/api/skills', (req, res) => {
  res.sendFile(path.join(__dirname, '/server/skills.json'));
});

app.get('/api/topics', (req, res) => {
  res.sendFile(path.join(__dirname, '/server/topics.json'));
});


app.route('/api/messages')
  .get((req, res) => {
    messageDB.getAll(message => res.json(message));
  })
  .post((req, res) => {
    messageDB.create(req.body, id => res.json({ id: id }));
  })

app.route('/api/messages/:id')
  .get((req, res) => {
    messageDB.get(req.params.id, message => res.json(message));
  })
  .put((req, res) => {
    messageDB.update(req.params.id, req.body, id => res.json(req.body));
  })
  .delete((req, res) => {
    messageDB.remove(req.params.id, didRemove => res.json({ didRemove: didRemove }));
  })

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on port ${port}...`);
