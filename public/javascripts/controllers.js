/**
 * Created by igor on 27/09/15.
 */

angular.module('callidus.controllers',[])

    .controller('callidus_controller',function($scope,mySocket,$interval){

        mySocket.on('resposta',function(data){
            console.log(data);
        });
        mySocket.on('status',function(data){
            console.log(data);
        });

        //$interval(mySocket.emit('getStatus'),2000)

        $scope.releControl = function (rele) {
            console.log(rele);
            var data = {rele: rele};
            mySocket.emit('acionado',data)
        }

        $scope.getReleStatus = function () {

            mySocket.emit('getStatus')
        }
    });