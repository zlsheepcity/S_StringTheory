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
        world.industry.GatherResources();
        // Dinner
        world.industry.ContactAll(world);
        // Party
        world.planet.Party('newday');
    };
    this.ContactAll = function() {
        var world = this.world;
        Story.Call('seobot1',world);
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

// ---------------------------------------------- DATA

var Galactica;
Galactica = {
    resources: [
        { name:'content' },
        { name:'html_tag' }
    ],
    landmarks: [
        { name:'voronsnest' }
    ],
    contacts: [
        { name:'admin', lvl:1, homeland:'voronsnest' },
        { name:'seobot1', lvl:1 }
    ],
    chromosome:
    {
        city:{
            name:'index',
            contacts:['seobot1']
        },
        resources:{
            content:{lvl:1,map:true},
            html_tag:{map:true},
        },
        landmarks:{
            voronsnest:{map:true}
        },
        turn: 0,
        name: 'Galactica.KingWorld'
    }
};

var Story;
Story = {
    Call: function(contact, world) {
        cc('Calling '+contact+'...');
        switch (contact) {
            case 'seobot1':
                // trade for content
                if ( world.city.hasResource('content') )
                    cc('-- content for seobot');
                break;
        }
    },
    Tasks: {
        'seobot1': {
            'grab_content': { active:true, status:0 }
        },
        'admin': {
            'html_quiz': { active:false, status:0 }
        },
    }
};

/*
var City;
City = {
    name:'index',
    age:0,
    xoxox:'xoxox',
    goods:[],
    on_breakfast:['GatherResources'],
    on_dinner:['TradeOffers'],
    on_party:['CityWelcome'],
    center:{
        market: {
            name:'rooter',
            lvl:1,
            traders:['seobot1']
        }
    },
    Welcome: function(){ cc('City welcome!') },    
    map:true
};
*/
/*
var Resources;
Resources = [
    {
        name:'content',
        lvl:1,
        map:'true'
    },
    {
        name:'html_tag',
        lvl:0,
        map:true
    }
];

var Landmarks;
Landmarks = [
    {
        name:'voronsnest',
        lvl:0,
        map:true
    }
];
*/

// ---------------------------------------------- UNIVERSE

/*
var World;
World = {
    age:0,
    Welcome:
        function() {
            this.age++;
            cc('# world created');
            Planeta.Welcome();
            Industry.Welcome();
        }
    ,
    GoodNight: // end turn
        function() {
            //
        }
    ,
    Have_a_Nice_Day: // Breakfast/Dinner/Party
        function() {
            City.age++;
            cc('# ---------------------- Have a Nice Day, '+City.name+' #'+City.age);
            for ( var i in City.on_breakfast )     Industry.DoJob(City.on_breakfast[i]);
            for ( var i in City.on_dinner )        Industry.DoJob(City.on_dinner[i]);
            for ( var i in City.on_party )         Industry.DoJob(City.on_party[i]);
        }
};
*/
/*
var Planeta; // prince: world.display
Planeta = {
    age:0,
    Welcome:
        function() {
            this.age++;
            cc('# ---------------------- Its Show Time #'+this.age);
            this.city();
            this.resources();
            this.landmarks();
        }
    ,
    skyface:
        function() {
            if ( this.age < 1 ) 
                cc('Display skyface: rejected, too young planet');
            else
                cc('Display skyface');
        }
    ,
    city: 
        function() {
            if (City.map)
            ccc([
                'Name:'+City.name,
                'Resources:',City.goods,
                'Buildings:',Industry.get_list_of_buldings(),
                'DO_display.city'
            ]);
        }
    ,
    resources:
        function() {
            for ( i in Resources )
                if (Resources[i].map)
                    ccc([
                        'name:'+Resources[i].name,
                        'lvl:'+Resources[i].lvl,
                        'DO_display.resources.R['+i+']'
                    ]);
        } 
    ,
    landmarks:
        function() {
            for ( i in Landmarks )
                if (Landmarks[i].map)
                    ccc([
                        'name:'+Landmarks[i].name,
                        'lvl:'+Landmarks[i].lvl,
                        'DO_display.landmarks.L['+i+']'
                    ]);
        } 
};
*/

/*
var Industry; // prince: world.update
Industry = {
    age:0,
    DoJob:
        function(job) {
            var Industry = this;
            switch(job) {
                case 'CityWelcome':
                    City.Welcome();
                    break;
                case 'GatherResources':
                    Industry.gatherResources();
                    break;
                case 'TradeOffers':
                    Industry.tradeOffers();
                    break;
                default:
                    cc('-- I cant do '+job);
            }
        }
    ,
    gatherResources:
        function() {
            var fresh_goods = [];
            for ( i in Resources ) {
                if ( Resources[i].lvl > 0 )
                    fresh_goods.push({ 
                        name:Resources[i].name,
                        id:i 
                    });
            }
            ccc([fresh_goods,'DO_resources.gather']);
            City.goods = fresh_goods;
        }
    ,
    tradeOffers:
        function() {
            var traders = City.center.market.traders;
            ccc([traders, 'DO_contacts.trade']);
            for ( i in traders )
                cc('-- Trade offer with '+traders[i]);
            
        }
    ,
    get_list_of_buldings:
        function() {
            var list = [];
            for ( i in City.center )
                list.push(i);
            return list;
        }
    ,
    Welcome:
        function() {
            cc('# industry works');
        }
};
*/

/*
var Contact;
Contact = {
    Player: {
        WhatNext:
            function() {
                //if ( Contact.Autoplayer.active ) Contact.Autoplayer.WhatNext();
                cc('player...');
                cc(Story.chapter);
            }
        ,
        active:true
    },
    Autoplayer: {
        WhatNext:
            function() {
                cc('autoplayer...');
                Story.NextChapter();
            }
        ,
        active:true
    },
    DoCall:
        function(contact) {
            return contact.active;
        }
};
*/

/*
var Story;
Story = {
    chapter:0,
    Begin:
        function() {
            cc('# ---------------------- Read the Story #'+Story.chapter);
            World.Welcome();
            //Contact.Player.WhatNext();
            Story.NextChapter();
        }
    ,
    NextChapter:
        function() {
            Story.chapter++;
            Story.Play();
        }
    ,
    Play:
        function() {
            var id = Story.chapter;
            switch(id) {
                case 1:
                    ccc(['---------------------- Story message '+id,'DO_story.message.C'+id]);
                    World.Have_a_Nice_Day();
                    Contact.Player.WhatNext();
                    break;
                case 0:
                default:
                    Story.Begin();
            }
        }
};
*/


// ---------------------------------------------- BEGIN

var World = new KingWorld();
var Planet = World.planet;
var Industry = World.industry;
World.Welcome();
Planet.show();

World.NextTurn();
World.NextTurn();

// ---------------------------------------------- END
console.timeEnd('timer__start_C');

cc(World);

//World.Welcome();
//Industry.Welcome();
//Planeta.Welcome();
//City.center.market.Welcome();
//World.Have_a_Nice_Day(City);
//Story.Begin();
/*
var zz = new KingWorld();
var zc = zz.city;
cc(zz);
cc(zc);
for ( i in zz.resources ) cc(zz.resources[i]);
*/

