function PrinceIndustry(world) {
    this.world = world;
    this.Welcome = function() {
        cc('# Welcome Industry!');
        cc(this);
        this.world.planet.show();
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
        world.industry.ContactAll(world);
        world.industry.GatherResources();
        cc('# Dinner');
        world.industry.ContactAll(world);
        cc('# Party');
        world.planet.Party('GoodEvening');
        world.planet.SupportUI();
        
        // Industry finished
        
        this.world.NeedsYou();
    };
    this.ActivateQuest = function(name,quest){
        var world = this.world;
        var contact = world.contacts[name];
        var kanban = world.city.center.kanban.Board;
        contact.has_to_say = true;
        contact.quests[quest] = { name:quest,chapter:1 };
        kanban.setTodo(quest);
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
        var id, gathered_resources = [];
        var world = this.world;
        for ( id in world.resources )
            if ( world.resources[id].map && world.resources[id].lvl )
                gathered_resources.push(id);
        ccc([gathered_resources,'Industry.GatherResources']);
        world.city.ClearResources();
        world.city.AddResources(gathered_resources);

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
        cc('-- more wifi '+wifi);
        this.world.wifi += 1*wifi;
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
    }
}
