console.time('time_to_create_the_world');
cc('time_to_create_the_world: Start...');
// ---------------------------------------------- CREATION TOOLS
// ---------------------------------------------- BEGIN

var World = new KingWorld(Galactica.chromosome);
var Planet = World.planet;
var Industry = World.industry;
var City = World.city;

// ---------------------------------------------- END
console.timeEnd('time_to_create_the_world');


/* ---------------------------------------------- MAIN RUN */
$(function () {

    // # First required

    World.Welcome();

    //ameba_add_some_data(); // ameba!

    // # Story begins

    Story.isNonStop = false;
    //Story.Play();
    
    //ameba_kliker(); // ameba!
    //ameba_babel(); // ameba!
    //cc('eee?');
});
