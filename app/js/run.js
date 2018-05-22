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
var City = World.city;

// ---------------------------------------------- END
console.timeEnd('time_to_create_the_world');


/* ---------------------------------------------- MAIN RUN */
$(function () {
    World.Welcome();

    // pre ameba
    //ameba_add_some_data();

    Story.isNonStop = false;
    Story.Play();

    // post ameba

    //World.resources.content.Update();
    //World.resources.content.Update();
    //cc(World);
    //cc(World.resources.content.GenerateJoblist());
    
    //ameba_check_city_job();
    //ameba_check_wifi_transfer();
    
    World.resources.content.Update();
    cc(World.resources.content.Grab());
    Industry.GatherResources();
    for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    World.industry.DoDailyJob();
    for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    //Industry.GatherResources();
    //for ( var i in City.center.roof.joblist) cc(City.center.roof.joblist[i]);
    //World.industry.DoDailyJob();
    
    cc(City);
    
    cc(World.jobs);
    //Industry.GatherResources();
    //cc(World.jobs);
    
});
