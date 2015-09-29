/**
 * Created by igor on 27/09/15.
 */
var five = require("johnny-five");
var board = new five.Board();
var relays = {};
var relay001;

board.on("ready", function() {
    relay001 = new five.Relay({
        id : "relay001",
        pin:10
    });
    relay001.open();

    relays['relay001'] = relay001
});

function releControl(rele,callback){
    var releLocal;
    if(rele == 'rele001'){
        releLocal = relay001
    }

    releLocal.toggle();
    var resposta = {
        rele: releLocal.id,
        ligado: releLocal.isOn
    }
    callback(resposta)
}

function getStatus(callback){
    var relayStatus = {}
    for(var i = 0; i <= relays.length;i++) {
        relayStatus.id = relays[i].isOn;
    }
    callback(relayStatus)
}

module.exports= {
    "releControl":releControl,
    "getStatus":getStatus

};