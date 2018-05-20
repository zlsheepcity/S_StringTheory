var cc, ccc;
cc = function(log) { console.log(log); };
ccc = function(log) { 
    console.group('o:'+log[log.length-1]);
    for ( row in log ) cc(log[row]);
    console.groupEnd();
};

console.time('time_to_create_the_world');
cc('time_to_create_the_world: Start...');
// ---------------------------------------------- CREATION TOOLS
// ---------------------------------------------- BEGIN

var World = new KingWorld(Galactica.chromosome);
var Planet = World.planet;
var Industry = World.industry;

// ---------------------------------------------- END
console.timeEnd('time_to_create_the_world');



$(function () {
    World.Welcome();
    Story.isNonStop = false;
    Story.Play();
    
    //Planet.Show_MarkerForMapico('kanban');
    //Planet.activateMapico('kanban',true);


    //Planet.insertMapico('index');
    //Planet.insertMapico('kanban');
    //console.log('loaded');
    //console.log(document.querySelector('.mapibox'));
    //cc(World);
});
