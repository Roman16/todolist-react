const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

const bodyParser = require('body-parser');
const todolistRoutes = require('./routes/todolistRoute');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/", todolistRoutes);

const port = process.env.API_PORT || 8080;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('GET_TASKS', () => {
        io.emit('SHOW_TASKS', true);
    });
});


mongoose.connect(dbHost + dbName, {
    useNewUrlParser: true
})
    .then(() => {
        server.listen(port);
        console.log('server run')
    })
    .catch(() => console.log('error'));