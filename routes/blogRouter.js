const express = require('express');
const bodyParser = require('body-parser');
const { BlogPosts } = require('../models');

const router = express.Router();
const jsonParser = bodyParser.json();

// Get the blog posts
router.get('/', (req, res) => {

  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  console.log(req);
  console.log(req.body);
  const requiredParams = ['title', 'content', 'author', 'publishDate'];

  for (let i = 0; i < requiredParams.length; i += 1) {
    const fields = requiredParams[i];

    if (!(fields in req.body)) {
      const message = `Your post is missing ${fields}`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(post);
});

router.put('/:id', jsonParser, (req, res) => {
  console.log(req);
  console.log(req.body);
  const requiredParams = 'id';

  if (!(requiredParams in req.body)) {
    const message = 'You must provide a valid post ID';
    console.log('You must provide a valid post ID');
    return res.status(400).send(message);
  }

  if (req.body.id !== req.params.id) {
    const message = 'Error, post ID must match post.';
    console.log('Error, post ID must match post.');
    return res.status(400).send(message);
  }

  BlogPosts.update(req.body);

  console.log('Success, updating blog post');
  const successMessage = 'Success, updating blog post';
  res.send(successMessage);
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  const message = `Deleted post ${req.params.id}.`;
  console.log(`Deleted post ${req.params.id}.`);
  res.send(message);
  res.status(204).end();
});

module.exports = router;
