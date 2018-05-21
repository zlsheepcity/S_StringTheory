/* ameba tester */
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
