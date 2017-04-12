import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socket from 'feathers-socketio/client';
import io from 'socket.io-client';
import auth from 'feathers-authentication-client';
import localStorage from 'localstorage-memory';

let instance = false;
const uri = 'http://localhost:3030/';
const authOptions = {
  service:'user',
  storage: localStorage
}

export function feathersClient() {
  if (instance) return instance;

  instance = feathers()
    .configure(socket(io(uri)))
    .configure(hooks())
    .configure(auth(authOptions));

  return instance;
}

export function service(name) {
  return feathersClient().service(name);
}
