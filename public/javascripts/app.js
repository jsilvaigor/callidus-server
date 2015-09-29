/**
 * Created by igor on 27/09/15.
 */

angular.module('callidus', [
    'ngRoute',
    'btford.socket-io',
    'callidus.controllers'
])
    .factory('mySocket', function (socketFactory) {
        var myIoSocket = io.connect(window.location.protocol + "//" + window.location.host + "/");
        var mySocket = socketFactory({
            ioSocket : myIoSocket
        });
        return mySocket;
})
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                controller: 'callidus_controller'
            });

        $locationProvider.html5Mode(true);
});
