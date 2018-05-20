function KanbanBoard() {
  this.todo = [];  
  this.sprint = [];
  this.closed = [];
  // actions
  this.setTodo = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'todo');
  };
  this.setSprint = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'sprint');
  };
  this.setClosed = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'closed');
  };
  this.do_remove_from_memory = function(name) {
    if (!name) return false;
    this.do_remove_from_status(name,'todo');
    this.do_remove_from_status(name,'sprint');
    this.do_remove_from_status(name,'closed');
    return true;
  };
  this.do_remove_from_status = function(name,status) {
      if (!this[status]) return false;
      var i;
      for ( i = 0; i < this[status].length; i++ )
          if ( this[status] == name )  this[status].splice(i,1);
      return this[status];
  };
  this.do_add_to_status = function(name,status) {
      if (!this[status]) return false;
      this[status].push(name);
      return this[status];
  };
};
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
            mission: dna.mission ? dna.mission : {
                name:'becone_an_empire',
                goals:[],
            },
            Board: new KanbanBoard(),
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

