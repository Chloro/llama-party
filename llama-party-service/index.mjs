import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http'
import SocketIO from 'socket.io';

const app = express()
const httpServer = http.Server(app)
const io = new SocketIO(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected')
    let count = 0
    socket.emit('news', 'Total messages sent: ' + count)
    socket.on('clientSays', (data) => {
        console.log('!!!:', data)
        setTimeout(() => {
            count++
            socket.emit('news', 'Total messages sent: ' + count)
        }, 500)
    });

});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});