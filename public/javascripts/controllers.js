/**
 * Created by igor on 27/09/15.
 */

angular.module('callidus.controllers',[])

    .controller('callidus_controller',function($scope,mySocket){
        mySocket.on('connect',function(data){
            console.log(data);
        });
        mySocket.on('resposta',function(data){
            console.log(data);
        });

        $scope.releControl = function (rele) {
            console.log(rele);
            var data = {rele: rele};
            mySocket.emit('acionado',data)
        }
    });