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
    xoxox:'xoxox',
    goods:[],
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
    Welcome:
        function() {
            this.age++;
            cc('# ---------------------- Industry works #'+this.age);
            this.gatherResources();
            this.supportUI();
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
    supportUI:
        function() {
            Planeta.skyface();         
        }
};


// ---------------------------------------------- BEGIN

World.Welcome();
Industry.Welcome();
Planeta.Welcome();

// ---------------------------------------------- END
console.timeEnd('timer__start_C');
