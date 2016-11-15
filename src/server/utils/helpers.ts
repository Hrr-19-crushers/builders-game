import * as request from 'request';

// remote and local instance of the redis server
const local: string = 'http://localhost:1337/api/chat';
const remote: string = 'https://builder-game.herokuapp.com/api/chat';

// POST request
export let sendMessage = ({name, text, date, type}): void => {
  console.log(text);
  request.post(remote,
    { json: { userId: name, text } },
    (error, response, message) => {
      if (error) {
        console.log(error);
      }
      console.log('the message =', message);
    });
};

// GET request
export let getMessages = (): void => {
  request.get(remote, (error, response, messages) => {
    if (error) {
      console.log(error);
    }
    console.log('the messages =', messages);
  });
};

// DELET request
export let deleteMessages = (): void => {
  request.del(remote,
    { json: { password: 'usAqzHzRIrxoRaCHCGgYqA5a' } },
    (err, res, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
};

