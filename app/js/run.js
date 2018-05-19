var cc, ccc;
cc = function(log) { console.log(log); };
ccc = function(log) { 
    console.group('o:'+log[log.length-1]);
    for ( row in log ) cc(log[row]);
    console.groupEnd();
};

console.time('timer__start_C');
cc('timer__start_C: ~0ms');
// ---------------------------------------------- CREATION TOOLS
// ---------------------------------------------- BEGIN

var World = new KingWorld(Galactica.chromosome);
var Planet = World.planet;
var Industry = World.industry;

// ---------------------------------------------- END
console.timeEnd('timer__start_C');



$(function () {
    World.Welcome();
    Story.isNonStop = false;
    Story.Play();


    //Planet.insertMapico('index');
    //Planet.insertMapico('kanban');
    //console.log('loaded');
    //console.log(document.querySelector('.mapibox'));
    cc(World);
});
