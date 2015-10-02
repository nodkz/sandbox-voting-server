import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  // if store changes, send to all connected clients new server state
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    // if client connects, send him server state
    socket.emit('state', store.getState().toJS());
    // accept data from client
    socket.on('action', store.dispatch.bind(store))
  });
}