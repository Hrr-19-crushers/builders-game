// function name (arg1:type,arg2:type): return type {function body}

// {"userId":some_large_int, "text":"the_message_body"}

import * as request from 'request';

export let sendMessage = (userId: string, message: string): void => {
  request.post('http://localhost:1337', { json: { userId: userId, message: message } },
  (error, response, body) =>  {
    if (!error && response.statusCode === 201) {
            console.log(body);
    }
  });
}; 