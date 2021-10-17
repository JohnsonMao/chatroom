import io from 'socket.io-client';

// 連接 server
const socket = io('ws://localhost:4000');

socket.emit('sendMsg', {name: 'test'});

socket.on('receiveMsg', function (data) {
  
})