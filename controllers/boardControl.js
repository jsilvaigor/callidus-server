/**
 * Created by igor on 27/09/15.
 */
var five = require("johnny-five");
var board = new five.Board();
var relays = {};
var sensors = {}
var relay001, relay002, relay003, proximidade,luminosidade;
var countDataPerto = 0;
var countDataLonge = 0;

var ansi = require('ansi'), cursor = ansi(process.stdout)

board.on("ready", function() {
    relay001 = new five.Relay({
        id : "relay001",
        pin:10
    });
    relay001.open();

    relays['relay001'] = relay001

    relay002 = new five.Relay({
        id : "relay002",
        pin:11
    });
    relay002.open();

    relays['relay002'] = relay002

    relay003 = new five.Relay({
        id : "relay003",
        pin:12
    });
    relay003.open();

    relays['relay003'] = relay003

    proximidade = new five.Proximity({
        controller: "HCSR04",
        pin: 9,
        freq: 250
    });

    proximidade.on("data", function() {

       if(this.cm <= 5 ) {
           countDataLonge = 0
           if (countDataPerto == 0) {
               relay003.close();
               cursor.blue().write("Objeto se aproximou! \n").fg.reset();
               cursor.hex("#9A32CD").write("relay003: ").fg.reset();
               cursor.green().write("Ligado\n").fg.reset();
               countDataPerto++;
           }else if(countDataPerto >= 20000000){
               countData=1
           }else{
               countDataPerto++
           }
       }else{
           countDataPerto = 0
           if (countDataLonge == 0) {
               relay003.open();
               cursor.blue().write("Objeto se distanciou! \n").fg.reset();
               cursor.hex("#9A32CD").write("relay003: ").fg.reset();
               cursor.red().write("Desligado\n").fg.reset();
               countDataLonge++;
           } else if (countDataLonge >= 20000000) {
               countDataLonge = 1
           } else {
               countDataLonge++;
           }

       }
    });

    sensors['proximidade'] = proximidade;

    luminosidade = new five.Sensor("A0");

    luminosidade.scale(0, 10).on("change", function() {
        if(this.value > 8){
            //console.log(this.value);
        }
    });

    sensors['luminosidade'] = luminosidade;
});

function releControl(rele,callback){
    var releLocal;
    if(rele == 'relay001'){
        releLocal = relay001
    }else if(rele == 'relay002'){
        releLocal = relay002
    }else if(rele == 'relay003'){
        releLocal = relay003
    }

    releLocal.toggle();
    var resposta = {
        relay: releLocal.id,
        ligado: releLocal.isOn
    };

    if(sensors.luminosidade.value > 8){
        resposta['dia'] = true;
    }

    cursor.hex("#9A32CD").write(releLocal.id + ": ").fg.reset();
    if(releLocal.isOn){
        cursor.green().write("Ligado \n").fg.reset();
    }else{
        cursor.red().write("Desligado \n").fg.reset();
    }
    callback(resposta)
}

function getStatus(callback){
    var relayStatus = {}

    for(key in relays) {
        relayStatus[key] = relays[key].isOn;

    }
    console.log(relayStatus);
    callback(relayStatus);
}

module.exports= {
    "releControl":releControl,
    "getStatus":getStatus

};