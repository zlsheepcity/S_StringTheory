function WorldJob(dna) {
    this.name = dna && dna.name ? dna.name : 'prokastination';
    this.cost = {
        days:       dna && dna.cost && dna.cost.days ? dna.cost.days : 1,
        sheeps:     dna && dna.cost && dna.cost.sheeps ? dna.cost.sheeps : 0,
        wifi:       dna && dna.cost && dna.cost.wifi ? dna.cost.wifi : 0,
        resources:  dna && dna.cost && dna.cost.resources ? dna.cost.resources : false,
    };
    this.progress = this.cost.days;
    this.finish = dna && dna.finish ? dna.finish : false ;
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
    this.has_to_say = false;
    this.homeland = dna.homeland ? dna.homeland : this.name ;
    this.turn_of_last_visit = 0;
    this.quests = dna.quests ? dna.quests : {};
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

