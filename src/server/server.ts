import * as express from 'express';
import * as socket_io from 'socket.io';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { sendMessage, getMessages, deleteMessages } from './utils/helpers';

const app = express();
const server = app.listen(3000, () => console.log('connected listening on port 3000'));
const io = socket_io.listen(server);

// temporary index file path while working on the server
app.use(express.static(path.join(__dirname, '../../')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile('index.html', { root: 'build/client/' }));

app.post('/', (req, res) => {
    res.sendStatus(201);
});

app.put('/', (req, res) => {
    res.sendStatus(201);
});

app.delete('/', (req, res) => {
    res.sendStatus(201);
});

// connects client to server socket 
io.on('connection', (socket) => {
    console.log('a new player connected');
    // sends a message to all clients listening for new player joined
    io.emit('new player joined');
    // server listening for newMessages
    socket.on('newMessage', (data) => {
        // deletes data from redis server
        if (data.payload.text === '#delete') {
            deleteMessages();
        }  // gets data from redis server
        else if (data.message === '#get') {
            getMessages();
        }
        else { // posts data to redis server
            console.log(data);
            sendMessage(data.payload);
        }
        // sends an event 'userMessage' and the data to all clients listening for userMessage;
        socket.broadcast.emit('userMessage', data.message);
    });
    // when a client disconnects console.logs userdisconneccted
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});