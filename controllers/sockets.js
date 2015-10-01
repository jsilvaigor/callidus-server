/**
 * Created by igor on 27/09/15.
 */
var boardControl = require("./boardControl");


module.exports = function(io) {

    io.sockets.on('connection', function (socket) {
        socket.on('connected',function(){

        });

        socket.on('join', function(data) {
            console.log("Cliente");
        });

        socket.on('acionado',function(data){
            boardControl.releControl(data.rele, function (data) {
                socket.emit('resposta',data);
            })
        })

        socket.on('getStatus',function(){
            boardControl.getStatus(function(status){
                socket.emit('status',status);
            })
        })

    });
};