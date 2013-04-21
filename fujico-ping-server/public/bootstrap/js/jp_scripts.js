$(document).ready(function() {
    //var socket = io.connect('http://jp-fujico-dev-5007.apse1.actionbox.io:8888');
//    var socket = io.connect('http://localhost:8888');
//    socket.emit('connection');
//    socket.emit('host_lists');
//    socket.on('server_hosts_list', function(data) {
//        $.each(data.hosts, function(k,v) {
//
//            //$('.host_lists').append('<li><a>' + v + '</a></li>')
//            //$('.host_lists').append('<li><a>' + v + '</a></li>').clone().insertAfter('.host_lists')
//            //$('.host_lists').append('<li><a>' + v + '</a></li>')
//        });
//    });
//
//    socket.on('server_message', function(data) {
//        //$('.news').html(data);
////                  console.log(data)
//    });
//
//    socket.on('server_msg', function(data) {
//        var myHost = $('.myHosts');
//        //$('.header_ping_counter').html(data.counter + ' ping');
//        //$('title').text('(' + data.counter + ')' + ' jp-fujico-dev-5007');
//        //myHost.prepend('<li>' + data.headers +'</li>');
//    })


    $('.host_lists > li').addClass('border-radius');

});
