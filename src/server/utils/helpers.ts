// function name (arg1:type,arg2:type): return type {function body}

// {"userId":some_large_int, "text":"the_message_body"}

import * as request from 'request';
const local: string = 'http://localhost:1337/api/chat';
const remote: string = 'https://builder-game.herokuapp.com/api/chat';
export let sendMessage = (userId: string, message: string): void => {
  request.post(remote,
  { json: { userId: userId, text: message } },
  (error, response, body) =>  {
    if (error) {
      console.log(error);
    }
    console.log('the body =', body);
    console.log('the response = ');
    };
  });
};

export let getMessages = (): void => {
  request.get('http://localhost:1337/api/chat', (error, response, messages) =>  {
    if (error) {
      console.log(error);
    }
    console.log('the body =', message);
    console.log('the response = ');
    };
  });
}; 

