// api-routes - all api endpoints
// controller - process HTTP requests and defines available endpoints
// model - manages database layer(request and response)

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./api-routes');
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());
app.use('/api', apiRoutes);

mongoose.connect('mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
if (!db) {
  console.error('Cannot connect to db');
} else {
  console.log('db connected successfully');
}
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello world with express');
});

app.listen(port, () => console.log(`server started at port ${port}`));
