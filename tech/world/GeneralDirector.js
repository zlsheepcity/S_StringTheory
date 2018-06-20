// AngelLog слушает сообщения и записывает в консоль
// Покровитель радио
function AngelLog() {
    this.m = function(msg) { // m for message
        console.log('o:'+msg);
    };
    this.o = function(label,d) { // o for error
        console.log('ORDNUNG: '+label);
        this.d('Ordnung report',d);
    };
    this.r = function(label,d) { // r for report
        console.group('o:'+label);
        for ( row in d ) console.log(d[row]);
        console.log(' ');
        console.groupEnd();
        
    };
    this.d = function(label,d) { // d for data
        console.log('> '+label+' ------ ');
        console.log(d);
    }
    this.pause = function() {
        console.log(' ');
        console.log('* * *');
        console.log(' ');
    };
}
var Radio = new AngelLog();
Radio.m('Hi, AngelLog');
