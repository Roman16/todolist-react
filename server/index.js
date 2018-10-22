const express = require('express');
const bodyParser = require('body-parser');
const todolistRoutes = require('./routes/todolistRoute');
const cors = require('cors');


require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/", todolistRoutes);

const port = process.env.API_PORT || 8080;

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});