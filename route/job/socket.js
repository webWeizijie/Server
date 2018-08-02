const models = require('./model')
const Chat = models.getModel('chat');

module.exports = (io) => {
    io.on('connection', function (socket) {
        socket.on('sendmsg', function (data) {
            const { from, to, msg } = data;
            const chatid = [from, to].sort().join('_')
            Chat.create({ chatid, from, to, content: msg, create_time: new Date().getTime() }, function (err, doc) {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })

        })
    })
}