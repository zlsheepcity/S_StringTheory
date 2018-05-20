/* ameba tester */
function ameba_check_city_job(){
    cc('ameba_check_city_job');
    cc(City);
    cc(City.center.roof.joblist);
    var job = new WorldJob({finish:function(){cc('goodjob!');}});
    City.AddJobToList(job);
    job = new WorldJob(Galactica.jobs[0]);
    City.AddJobToList(job);
    cc(City.center.roof.joblist);
    City.DoJobList();
    cc(City.center.roof.joblist);
    cc(City);
};
