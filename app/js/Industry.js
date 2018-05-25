/*
    Industry (World.industry)
    — game logic & processes
*/

function PrinceIndustry(world) {
    this.world = world;
    this.Welcome = function() {
        cc('# Welcome Industry!');
        cc(this);
        //this.world.NeedsYou();//not now
    }
    this.GoodMorning = function() {
        this.world.turn++;
        var world = this.world;
        ccc([
            world,
            '-- Industry takes the lead, and rules the day',
            'Industry.GoodMorning.Day#'+world.turn
        ]);

        // Schedule

        cc('# Breakfast');
        //world.industry.ContactAll(world);
        world.industry.GatherResources();

        cc('# Dinner');
        world.industry.DoDailyJob();
        world.industry.ContactAll(world);

        cc('# Party');
        
        world.planet.Party('GoodEvening');
        world.planet.SupportUI();
        
        // Industry finished
        
        this.world.NeedsYou();
    };
    this.DoDailyJob = function() {
        this.world.city.DoYourJob();
    };
    this.GetJob = function(name) {
        var job = new WorldJob(this.world.jobs[name].dna);
        return job;
    };
    this.ActivateQuest = function(name,quest){
        var world = this.world;
        var contact = world.contacts[name];
        var kanban = world.city.center.kanban.Board;
        contact.has_to_say = true;
        contact.quests[quest] = { name:quest,chapter:1 };
        kanban.setTodo(quest);
    };
    this.GeoDescription = function() {
        // XOXOXOX
        var description = {};
        description.relief = {
            index: {name:'index',map:true,contact:true},
            kanban: {name:'kanban',map:true,contact:true},
            index_valley: {name:'index_valley',map:true,contact:true},
        }
        return description;
    };
    this.ApplyChromosome = function(chromosome) {
        cc('# ApplyChromosome:');
        cc(chromosome);
        var injection;
        injection =
            chromosome && chromosome.resources
            ? chromosome.resources
            : false ;
        if ( injection ) this.world.resources = this.make_injection(this.world.resources, injection);
        injection =
            chromosome && chromosome.landmarks
            ? chromosome.landmarks
            : false ;
        if ( injection ) this.world.landmarks = this.make_injection(this.world.landmarks, injection);
        if ( chromosome.turn ) this.world.turn = chromosome.turn;
        if ( chromosome.name ) this.world.name = chromosome.name;
        // Evolve
        //this.world.city = new WorldCity( chromosome.city );
    };
    this.GatherResources = function() {
        var id;
        var jobs_from_resource = [];
        var total_jobs = [];
        var world = this.world;

        // create joblist from all resources

        for ( id in world.resources )
            if ( this.IsResourceAdopted(id) ) {
                jobs_from_resource = world.resources[id].Grab();
                total_jobs = Industry.make_array_summ(total_jobs, jobs_from_resource);
            };

        // send job

        ccc(['jobs:',total_jobs,'Industry.GatherResources']);
        this.world.city.TakeThisJoblist(total_jobs);
        return total_jobs;
    };
    this.IsResourceAdopted = function (id) {
        var world = this.world;
        return world.resources[id].map && world.resources[id].lvl;
    };
    this.PlanetCall = function(dialog) {
        //this.world.NextTurn();//test only
        var world = this.world;
        var contact = this.world.contacts[dialog.name ? dialog.name : dialog];
        for ( var id in contact.quests )
            if ( contact.quests[id] ) 
                Planet.PrepareDialog(
                    contact.name,
                    Story.QuestRequest( contact.quests[id] )
                );
        ccc([dialog,contact,'Industry.PlanetCall']);
    };
    this.ContactAll = function() {
        var world = this.world;
        for ( var contact in world.contacts )
            Story.Call( contact, world );
    };
    this.ConnectWifi = function(wifi) {
        if (wifi>0) this.WifiTransaction(wifi);
    };
    this.ChargeWifi = function(wifi) {
        if (wifi>0) this.WifiTransaction(wifi*(-1));
    };
    this.WifiBalance = function() {
        return World.wifi;
    }
    this.WifiTransaction = function(wifi, official){
        ccc([wifi, official, 'Industry.WifiTransaction']);
        if (!wifi)  return false;
        World.wifi += 1*wifi;
        return World.wifi;
    };
    this.make_injection = function(patient,cure) {
        var id, i, single_action_key, single_action_value;
        for ( id in cure ) // each object
            if ( patient[id] )
                for ( i in cure[id] ) { // each property
                    cc('-- inject '+id+'.'+i);
                    patient[id][i] = cure[id][i];
                }
        return patient;
    };
    this.make_array_summ = function (array1, array2) {
        if (!array1) array1 = [];
        if (array2.length)
            array1 = array1.concat(array2);
        else
            array1.push(array2);
        return array1;
    };
}
