console.time('timer__start_C');
var cc, ccc;
cc = function(log) { console.log(log); };
ccc = function(log) { 
    console.group('o:'+log[log.length-1]);
    for ( row in log ) cc(log[row]);
    console.groupEnd();
};
cc('timer__start_C: ~0ms');


// ---------------------------------------------- CREATION TOOLS

function WorldCity(dna) {
    this.name = dna.name ? dna.name : 'index0';
    this.map = dna.map ? true : false ;
    this.age = 0;
    this.dna = dna;
    this.resources = [];
    this.center = {
        rooter: {
            lvl:1,
            contacts: dna.contacts ? dna.contacts : ['seobot0']
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
function PrincePlanet(world) {
    this.world = world;
    this.show = function(options){
        cc('# Its Show Time ------------');
        this.city();
        this.resources();
        this.landmarks();
        cc('# ------------ Show Ends');
    };
    this.city = function() {
        ccc([this.world.city,'DO_display.city']);
    };
    this.resources = function() {
        ccc([this.world.resources,'DO_display.resources']);
    };
    this.landmarks = function() {
        ccc([this.world.landmarks,'DO_display.landmarks']);
    };
    this.Party = function(event) {
        ccc(['No party!', 'DO_display.update.noparty']);
    };
    this.SupportUI = function(){
        cc('# Currect State ------------');
        cc('Wifi:'+this.world.wifi);
        cc('# ------------ No more current');
    };
}
function PrinceIndustry(world) {
    this.world = world;
    this.ApplyChromosome = function(chromosome) {
        cc('# ApplyChromosome');
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
        this.world.city = new WorldCity( chromosome.city );
    };
    this.GatherResources = function() {
        cc('# GatherResources');
        var id, gathered_resources = [];
        var world = this.world;
        for ( id in world.resources )
            if ( world.resources[id].map && world.resources[id].lvl )
                gathered_resources.push(id);
        cc(gathered_resources);
        world.city.ClearResources();
        world.city.AddResources(gathered_resources);
    };
    this.GoodMorning = function() {
        var world = this.world;
        world.turn++;
        cc('# GoodMorning, day#'+world.turn);
        // Breakfast
        world.industry.ContactAll(world);
        world.industry.GatherResources();
        // Dinner
        world.industry.ContactAll(world);
        // Party
        world.planet.Party('newday');
        world.planet.SupportUI();
        if ( Story && Story.isNonStop ) Story.Autoplay();
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
    this.age = 0;
    this.turn = chromosome && chromosome.turn ? chromosome.turn : 0;
    this.name = chromosome && chromosome.name ? chromosome.name : 'KingWorld';
    this.wifi = 0;
    this.chromosome = chromosome;

    // --------- Planet — prince of visualization

    this.planet = new PrincePlanet(this);

    // --------- City

    var cityDNA =
        this.chromosome && this.chromosome.city
        ? this.chromosome.city
        : false ;
    this.city = new WorldCity( cityDNA );

    // --------- Resources

    this.resources = {};
    for ( i in Galactica.resources )
        if ( Galactica.resources[i].name )
            this.resources[Galactica.resources[i].name] =
                new WorldResource( Galactica.resources[i] );

    // --------- Landmarks

    this.landmarks = {};
    for ( i in Galactica.landmarks )
        if ( Galactica.landmarks[i].name )
            this.landmarks[Galactica.landmarks[i].name] =
                new WorldLandmark( Galactica.landmarks[i] );
                
    // --------- Contacts

    this.contacts = {};
    for ( i in Galactica.contacts )
        if ( Galactica.contacts[i].name )
            this.contacts[Galactica.contacts[i].name] =
                new WorldContact( Galactica.contacts[i] );

    // --------- Industry — prince of logic

    this.industry = new PrinceIndustry(this);
    
    // --------- Functions

    this.Welcome = function() {
        this.age++;
        cc('# Welcome to the World ------------');
        if ( !Galactica ) cc('--- Galactica is missed. No Galactica — no World.');
        if ( !this.chromosome ) this.chromosome = Galactica.chromosome;
        this.industry.ApplyChromosome(Galactica.chromosome);
        this.industry.GatherResources();
        cc('# ------------ Welcome!');
    };
    this.NextTurn = function() {
        this.industry.GoodMorning();
        return true;
    };

    // --------- Feedback

    cc('# New World created');
}

// ---------------------------------------------- BEGIN

var World = new KingWorld();
var Planet = World.planet;
var Industry = World.industry;
World.Welcome();
Planet.show();
Story.Play();

//World.NextTurn();
//World.resources['html_tag'].Grab();
//World.contacts.scout.lvl++;
//World.NextTurn();

// ---------------------------------------------- END
console.timeEnd('timer__start_C');

cc(World);
