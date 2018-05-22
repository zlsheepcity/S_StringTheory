/* dev & programming shortcuts */

function wowWow() {
    this.to_array = function (data,append) {
        var output = append && append.length ? append : [];
        if (data.length)
            output = output.concat(data);
        else if (data)
            output.push(data);
        return output;
    };
    this.do_object_sex = function(mom,dad) {
        var id, i;
        var baby = mom;
        for ( id in dad ) { // each dad
            if ( baby[id] && baby[id].length && dad[id].length )
                baby[id] = this.do_object_sex(baby[id],dad[id]);
            else
                baby[id] = dad[id];
        };
        return baby;
    };
    // dev log
    this.cc = function(log) { console.log(log); };
    this.ccc = function(log) {
        console.group('o:'+log[log.length-1]);
        for ( row in log ) cc(log[row]);
        console.groupEnd();
    };
}
var wow = new wowWow();
var cc = wow.cc;
var ccc = wow.ccc;
