import * as express from 'express';
import * as socket_io from 'socket.io';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
const server = app.listen(3000, () => console.log('connected listening on port 3000'));
const io = socket_io.listen(server);

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile('index.html', { root: 'build/client/' }));

// connects client to server socket 
io.on('connection', (socket) => {
    console.log('a new player connected');
    // sends a message to all clients A new player has joined
    io.emit('new player joined');
    // when a the server recieves a message from the client execute callback
    socket.on('newMessage', (data) => {
        console.log(data)
        // sends an event 'userMessage' and the data form the callback to all clients
        io.emit('userMessage', data);
    });
    // when a client disconnects
    socket.on('disconnect', () => {
        // sends a message to all clients
        console.log('user disconnected');
        io.emit('user d/c');
    });
});

// server.listen(3000, ;