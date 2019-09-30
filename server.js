const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  next();
});

app.post('/users', (req, res) => {
  res.send({name: req.body.name, id: 1});
});

app.listen(3000, () => {
  console.log('Server running');
});
