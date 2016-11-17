// import * as express from 'express';
// import * as socket_io from 'socket.io';
// import * as path from 'path';
// import * as bodyParser from 'body-parser';
// import { sendMessage, getMessages, deleteMessages } from './utils/helpers';

// const app = express();
// const server = app.listen(3000, () => console.log('connected listening on port 3000'));
// const io = socket_io.listen(server);

// const localStore = {
//   players: {},
//   playerCount: 0,
//   voteObj: {},
// };

// app.use(express.static(path.join(__dirname, '../../')));
// app.use(bodyParser.json());

// app.get('/', (req, res) => res.sendFile('index.html', { root: 'build/client/' }));

// app.post('/game/prompt', (req, res) => {
//   io.sockets.emit('prompt', req.body);
//   res.sendStatus(201);
// });

// app.post('/vote/result', (req, res) => {

//   res.sendStatus(201);
// });

// app.delete('/', (req, res) => {
//   res.sendStatus(201);
// });

// // connects client to server socket 
// io.on('connection', (socket) => {
//   localStore.playerCount++;

// // __________________________ new player event ________________________________________
//   socket.on('newPlayer', (playerName, fn) => {
//     if (!localStore.players[playerName]) {
//       // addes player name to the socket object as playerName prop.
//       socket['playerName'] = playerName;
//       localStore.players[playerName] = playerName;
//       fn(true);
//     } else {
//       fn(false);
//     }
//   });
// // ________________________ messageing event ___________________________________________
//   socket.on('newMessage', (data) => {

//     // deletes data from redis server
//     if (data.payload.text === '#delete') {
//       deleteMessages();
//     }  // gets data from redis server
//     else if (data.payload.text === '#get') {
//       getMessages( (data) => console.log(data));
//     }
//     else { // posts data to redis server
//       sendMessage(data.payload, data => console.log('line 56 of server.ts', data));
//     }
//         // sends an event 'userMessage' and the data to all clients listening for userMessage;
//     socket.broadcast.emit('userMessage', data.message);
//   });


//     // ______________ disconnect event _________________________
//     socket.on('disconnect', () => {
//       const playerName = socket['playerName'] || 'anonymos player' ;
//       socket.emit('playerLeft', playerName + 'has left the game'  );
//       localStore.playerCount--;
//       if (socket['playerName'] !== undefined){
//         localStore.players[socket['playerName']] = undefined;
//       }
//     });
// });