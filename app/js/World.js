function KingWorld(chromosome) {

    this.Welcome = function() {
        cc('# Welcome to the World');
        cc(this);
        this.planet.Welcome();
        this.industry.Welcome();
        return this;
    };
    this.NextTurn = function() {
        this.awaiting = false;
        this.industry.GoodMorning();
        return this;
    };
    this.NeedsYou = function() {
        cc('# The World needs You! ....... .... ..... .........(●ᴥ●)');
        this.awaiting = true;
        if ( Story && Story.isNonStop ) Story.Autoplay();
        return this;
    };

    // --------- Life ciycle

    this.ResourceUpdate = function(resource, lvl) {
        if ( this.resources[resource] )
            this.resources[resource].Update(lvl);
        return this;
    }
    this.ResourceGather = function() {
        this.industry.GatherResources();
        return this;
    }
    this.ResourceAdd = function(resource) {
        this.city.AddResources(resource);
        return this;
    }
    this.JobWork = function() {
        this.industry.DoDailyJob();
        return this;
    }
    this.JobTake = function(id) {
        this.city.TakeJob(id);
        return this;
    }

    // --------- Display

    this.ReviewMap = function() {
        this.planet.ReviewMap();
        return this;
    }
    this.UI = function() {
        this.planet.SupportUI();
        return this;
    }

    // ============================================== Data center

    this.GeoDescription = function() {
        var description = {};
        description.relief = this.landmarks;
        return description;
    }

    // ============================================== World Coronation

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

    /* --------- HQ */

    this.chromosome = chromosome;
    this.aer = [];
    this.ae = function(ae) {this.aer.push(ae)};
    this.mission = chromosome && chromosome.mission ? chromosome.mission : {};
    this.awaiting = false;

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

    // --------- Jobs

    this.jobs = {};
    for ( i in Galactica.jobs )
        if ( Galactica.jobs[i].name )
            this.jobs[Galactica.jobs[i].name] =
                new WorldJob( Galactica.jobs[i] );

    // --------- Planet — prince of visualization

    this.planet = new PrincePlanet(this);

    // --------- Industry — prince of logic

    this.industry = new PrinceIndustry(this);
    this.industry.ApplyChromosome(this.chromosome);

    // --------- Feedback

    cc('# New World created');
    cc(this);
    
    // --------- Functions


}

