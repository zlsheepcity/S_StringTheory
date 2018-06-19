// AngelLog слушает сообщения и записывает в консоль
// Покровитель радио
function AngelLog() {
    this.m = function(msg) { // m for message
        console.log('oOo '+msg);
    };
    this.o = function(label,d) { // o for error
        console.log('ORDNUNG: '+label);
        this.d('Ordnung report',d);
    };
    this.r = function(label,d) { // r for report
        console.group('o:'+label);
        for ( row in d ) console.log(d[row]);
        console.groupEnd();
        
    };
    this.d = function(label,d) { // d for data
        console.log('> '+label+' ------ ');
        console.log(d);
    }
}
var Radio = new AngelLog();
Radio.m('Hi, AngelLog');
