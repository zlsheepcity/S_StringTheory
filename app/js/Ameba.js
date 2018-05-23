/* ameba tester */
function ameba_babel(){
    const getMessage2 = () => "Hello World 2";
    cc(getMessage2());
};
function ameba_kliker(){
    
    Planet.ReviewMap();
    Planet.SupportUI();
    
    cc('---------------------------------------- ameba: first content');
    
    World.resources.content.Update(1);
    Industry.GatherResources();
    Planet.SupportUI();
    
    cc('---------------------------------------- ameba: second content');
    
    World.resources.content.Update(1);
    World.resources.html_tag.Update(1);
    Industry.GatherResources();
    Planet.SupportUI();
    
    cc('---------------------------------------- ameba: do job');
    
    Industry.DoDailyJob();
    Planet.SupportUI();
    
    cc('---------------------------------------- ameba: destroy');
    
    World.resources.content.Destroy();
    Industry.GatherResources();
    Industry.DoDailyJob();
    Planet.SupportUI();
    
    cc('---------------------------------------- ameba: build farm');
    
    City.TakeJob('construct_content_farm');
    Industry.GatherResources();
    Industry.DoDailyJob();
    Industry.GatherResources();
    Industry.DoDailyJob();
    Planet.SupportUI();
    
    //World.resources.content.Update();
    //World.resources.content.Update();
    //cc(World);
    //cc(World.resources.content.GenerateJoblist());
    
    //ameba_check_city_job();
    //ameba_check_wifi_transfer();

    /**
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
    
};
function ameba_add_some_data(){
    cc('ameba_add_some_data');
    var job = new WorldJob({finish:function(){cc('goodjob!');}});
    City.AddJobToList(job);

    var job = new WorldJob({name:'longjob',cost:{days:3},finish:function(){cc('goodlongjob!');}});
    City.AddJobToList(job);
    
    //City.AddResources('content');
    World.resources.content.Update(1);
    cc(World.resources.content);
    //World.resources.content.Grab();
}
function ameba_check_city_job(){
    cc('ameba_check_city_job');
    cc(City);cc(City.center.roof.joblist);

    var job = new WorldJob({finish:function(){cc('goodjob!');}});
    City.AddJobToList(job);

    var job = new WorldJob({name:'longjob',cost:{days:3},finish:function(){cc('goodlongjob!');}});
    City.AddJobToList(job);

    job = new WorldJob(Galactica.jobs[0]);
    City.AddJobToList(job);

    cc(City.center.roof.joblist);

    City.DoJobList();

    cc(City.center.roof.joblist);
    Planet.SupportUI();
    cc('-- me off. ameba');
};
function ameba_check_wifi_transfer(){
    cc('ameba_check_wifi_transfer');
    cc('.. current');
        cc(Industry.WifiBalance());
    cc('.. add 9');
        Industry.ConnectWifi(9);
        cc(Industry.WifiBalance());
    cc('.. charge 4');
        Industry.ChargeWifi(4);
        cc(Industry.WifiBalance());
    cc('-- me off. ameba');
}
