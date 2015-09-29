/**
 * Created by igor on 27/09/15.
 */
var boardControl = require("./boardControl");

module.exports = function(io) {

    io.sockets.on('connection', function (socket) {
        socket.on('join', function(data) {
            console.log(data);
            boardControl.getStatus(function(status){
                socket.emit(status);
            })
        });

        socket.on('acionado',function(data){
            boardControl.releControl(data.rele, function (data) {
                socket.emit('resposta',data);
            })
        })
    });
};