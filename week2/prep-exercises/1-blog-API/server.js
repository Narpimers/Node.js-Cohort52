const { error } = require('console');
const express = require('express');
const fs = require("fs");
const app = express();


app.use(express.json());

app.post('/blogs', (req, res) => {
  const {title, content} = req.body;
  fs.writeFileSync(title, content);
  res.statusCode = 200;
  res.end('ok');
});

app.put('/posts/:title', (req, res) => {
  const {title, content} = req.body;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.statusCode = 200;
    res.end('ok');

  } else {
    res.statusCode = 404;
    res.send('This post does not exist!', error);
  }
});

app.delete('/blogs/:title', (req, res) => {
  const {title} = req.body;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.statusCode = 200;
    res.end('ok');
  } else {
    res.statusCode = 404;
    res.send('This post was deleted!', error);
  }
});


app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)){
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    res.statusCode = 404;
    res.send(error);
  }
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

 
app.listen(3000)