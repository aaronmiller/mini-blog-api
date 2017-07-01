const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { BlogPosts } = require('./models');

const blogRouter = require('./routes/blogRouter');

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 1337;

app.use(morgan('common'));

app.use('/blog', blogRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(PORT, () => console.log(`Listening at ${HOST}:${PORT}`));
