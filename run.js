console.time('timer__start_C');
var cc, ccc;
cc = function(log) { console.log(log); };
ccc = function(log) { 
    console.group('o:'+log[log.length-1]);
    for ( row in log ) cc(log[row]);
    console.groupEnd();
};
cc('timer__start_C: ~0');


// ---------------------------------------------- DATA

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

// ---------------------------------------------- UNIVERSE

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
    /*supportUI:
        function() {
            Planeta.skyface();         
        }
    ,*/
    Welcome:
        function() {
            cc('# industry works');
        }
};

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

// ---------------------------------------------- BEGIN

//World.Welcome();
//Industry.Welcome();
//Planeta.Welcome();
//City.center.market.Welcome();
//World.Have_a_Nice_Day(City);

Story.Begin();

// ---------------------------------------------- END
console.timeEnd('timer__start_C');
