const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv1 = require('uuid/v1');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/:id', (req, res) => {
  for(let post of db){
    if(post.id == req.params.id){
      res.send(post);
    };
  };
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  const newPost = {author: author, text: text, id: uuidv1()};
  db.push(newPost);
  res.send({message: 'OK'});
})

app.put('/testimonials/:id', (req, res) => {
  const {author, text} = req.body;
  for(let post of db){
    if(post.id == req.params.id){
      post.author = author;
      post.text = text;
    };
  };
  res.send({message: 'OK'});
})

app.delete('/testimonials/:id', (req, res) => {
  for(let post of db){
    if(post.id == req.params.id){
      db.splice(db.indexOf(post));
    };
  };
  res.send({message: 'OK'});
})

app.use((req, res) => {
  res.status(404).send({message: '404 not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});