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
    Story.Play();

    // post ameba

    //World.resources.content.Update();
    //World.resources.content.Update();
    //cc(World);
    //cc(World.resources.content.GenerateJoblist());
    
    //ameba_check_city_job();
    //ameba_check_wifi_transfer();

    /**/
    cc('xx upd');
    World.resources.content.Update();
    cc('xx grab');
    cc(World.resources.content.Grab());
    cc('xx gather');
    Industry.GatherResources();
    cc('xx display');
    for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    cc('xx daily');
    World.industry.DoDailyJob();
    for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    Planet.SupportUI();
    //Industry.GatherResources();
    //for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    //World.industry.DoDailyJob();
    
    cc(City);
    cc(World.jobs);

    Industry.GatherResources();
    cc(City.center.roof.joblist);
    /**/


    
});
