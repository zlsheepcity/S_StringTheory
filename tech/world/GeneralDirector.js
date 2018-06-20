// AngelLog слушает сообщения и записывает в консоль
// Покровитель радио
function AngelLog() {
    this.m = function(msg) { // m for message
        console.log('o:'+msg);
        return this;
    };
    this.o = function(label,d) { // o for error
        console.log('ORDNUNG: '+label);
        this.d('Ordnung report',d);
        return this;
    };
    this.r = function(label,d) { // r for report
        console.group('o:'+label);
        for ( row in d ) console.log(d[row]);
        console.log(' ');
        console.groupEnd();
        return this;
    };
    this.d = function(label,d) { // d for data
        console.log('> '+label+' ------ ');
        console.log(d);
        return this;
    }
    this.pause = function() {
        console.log(' ');
        console.log('* * *');
        console.log(' ');
        return this;
    };
    this.chapter = function(title) {
        console.log('============ '+title+' ============');
        return this;
    };
}
var Radio = new AngelLog();
Radio.m('Hi, AngelLog');
