function WorldCity(dna) {
    this.name = dna.name ? dna.name : 'index0';
    this.map = dna.map ? true : false ;
    this.age = 0;
    this.dna = dna;
    this.resources = [];
    this.center = {
        roof: dna.roof ? dna.roof : {
            name:'index',
            lvl:1,
            map:true,
        },
        kanban: dna.kanban ? dna.kanban : {
            name:'kanban',
            lvl:1,
            map:true,
        },
        rooter: dna.rooter ? dna.rooter : {
            name:'rooter',
            lvl:1,
            map: true,
            contacts: dna.contacts ? dna.contacts : ['seobot0']
        },
        kde: dna.kde ? dna.kde : {
            name:'market',
            lvl:1,
            map:true,
        }
        
    };
    this.gov = {name:'anarchy'};
    this.AddResources = function(resource) {
        this.resources = Industry.make_array_summ(this.resources, resource);
    };
    this.ClearResources = function() {
        this.resources = [];
    };
    this.AddContacts = function(contacts) {
        this.center.rooter.contacts = Industry.make_array_summ(this.contacts, contacts);
    };
    this.hasResource = function(resource) {
        return this.resources && this.resources.indexOf(resource) > -1;
    };
    cc('# City was born '+this.name);
}
function WorldResource(dna) {
    this.name = dna.name ? dna.name : 'content';
    this.lvl = dna.lvl ? dna.lvl : 0;
    this.map = dna.map ? true : false ;
    this.Grab = function() {
        if( this.lvl < 1 ) this.lvl = 1;
        if( !this.map ) this.map = true;
    };
}
function WorldLandmark(dna) {
    this.name = dna.name ? dna.name : 'valley';
    this.lvl = dna.lvl ? dna.lvl : 0;
    this.map = dna.map ? true : false ;
}
function WorldContact(dna) {
    this.name = dna.name ? dna.name : 'seobot0';
    this.lvl = dna.lvl ? dna.lvl : 0;
    this.homeland = dna.homeland ? dna.homeland : false ;
    this.turn_of_last_visit = 0;
}
function PrinceIndustry(world) {
    this.world = world;
    this.Welcome = function() {
        cc('# Welcome Industry!');
        cc(this);
        this.world.planet.show();
        //this.world.NeedsYou();
    }
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
    this.GoodMorning = function() {
        var world = this.world;
        world.turn++;
        ccc(['Day#'+world.turn,world,'Industry.GoodMorning']);
        cc('# Breakfast');
        world.industry.ContactAll(world);
        world.industry.GatherResources();
        cc('# Dinner');
        world.industry.ContactAll(world);
        cc('# Party');
        world.planet.Party('GoodEvening');
        world.planet.SupportUI();
        this.world.NeedsYou();
    };
    this.PlanetCall = function(dialog) {
        ccc([dialog,'Industry.PlanetCall']);
        this.world.NextTurn();
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

function KingWorld(chromosome) {

    // --------- Required
    
    var required_messages = [];

    if ( !Galactica ) required_messages.push('--- Galactica is missed. No Galactica — no World.');
    else if (
           !Galactica.resources
        || !Galactica.landmarks
        || !Galactica.contacts
    ) required_messages.push('--- Galactica is broken.');
    if ( !Story ) required_messages.push('--- Story is missed. No Story — no World.');

    if (required_messages.length) {
        required_messages.push('World Creation Not Allowed');
        ccc(required_messages);
        return false;
    }
    
    // --------- World Basics

    this.turn = chromosome && chromosome.turn ? chromosome.turn : 0;
    this.wifi = chromosome && chromosome.wifi ? chromosome.wifi : 0;
    this.name = chromosome && chromosome.name ? chromosome.name : 'KingWorld';
    this.mission = chromosome && chromosome.mission ? chromosome.mission : {
        name:'Grab content',
        goals: {
            grab_content: function(){ return false; }
        },
    };
    this.chromosome = chromosome;
    

    // --------- City

    var cityDNA =
        this.chromosome && this.chromosome.city
        ? this.chromosome.city
        : false ;
    this.city = new WorldCity( cityDNA );

    // --------- Landmarks

    this.landmarks = {};
    for ( i in Galactica.landmarks )
        if ( Galactica.landmarks[i].name )
            this.landmarks[Galactica.landmarks[i].name] =
                new WorldLandmark( Galactica.landmarks[i] );

    // --------- Resources

    this.resources = {};
    for ( i in Galactica.resources )
        if ( Galactica.resources[i].name )
            this.resources[Galactica.resources[i].name] =
                new WorldResource( Galactica.resources[i] );

    // --------- Contacts

    this.contacts = {};
    for ( i in Galactica.contacts )
        if ( Galactica.contacts[i].name )
            this.contacts[Galactica.contacts[i].name] =
                new WorldContact( Galactica.contacts[i] );

    // --------- Planet — prince of visualization

    this.planet = new PrincePlanet(this);

    // --------- Industry — prince of logic

    this.industry = new PrinceIndustry(this);
    this.industry.ApplyChromosome(this.chromosome);

    // --------- Feedback

    cc('# New World created');
    cc(this);
    
    // --------- Functions

    this.Welcome = function() {
        cc('# Welcome to the World');
        cc(this);
        this.planet.Welcome();
        this.industry.Welcome();
    };
    this.NextTurn = function() {
        this.industry.GoodMorning();
        return true;
    };
    this.NeedsYou = function() {
        cc('# The World needs You! ....... .... ..... ..... . ........... .........(●ᴥ●)');
        if ( Story && Story.isNonStop ) Story.Autoplay();
        // Activate User Input
    }
}

