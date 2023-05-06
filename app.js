const express = require("express");
const app = express();
const morgan = require('morgan');
const postBank = require('./postBank');
const allPosts = require('./allPosts');
const individualPosts = require('./individualPosts');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const posts = postBank.list();
  res.send(allPosts(posts));
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (post.id) {
    res.send(individualPosts(post));
  } else {
    next('404 Page Not Found')
  }
});

const PORT = 1337;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
