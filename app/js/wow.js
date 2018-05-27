/* dev & programming shortcuts */

function WorldWow() {
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
    this.lvlPass = function(lvl,passport) {
        if (!lvl) return false;
        if (!passport) return true;
        if (passport.min_lvl && passport.min_lvl>lvl) return false;
        if (passport.max_lvl && passport.max_lvl<lvl) return false;
        return true;
    }
    // dev log
    this.cc = function(log) { console.log(log); };
    this.ccc = function(log) {
        console.group('o:'+log[log.length-1]);
        for ( row in log ) cc(log[row]);
        console.groupEnd();
    };
    // error log
    this.aer = [];
    this.ae = function(ae, proof) {
        this.aer.push({msg:ae,proof:proof});
        this.ccc([ae,proof,'===> AE! <===:o']);
        return false;
    };
    // report x
    this.x = false;
}
var wow = new WorldWow();
var cc = wow.cc;
var ccc = wow.ccc;
var x = wow.x;
