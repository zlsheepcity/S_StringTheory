console.time('timer__start_C');
var cc, ccc;
cc = function(log) { console.log(log); };
ccc = function(log) { 
    console.group('R:'+log[log.length-1]);
    for ( row in log ) cc(log[row]);
    console.groupEnd();
};
cc('timer__start_C: ~0');


// ---------------------------------------------- DATA

var city;
city = {
    name:'index',
    xoxox:'xoxox',
    //goods:[],
    map:'true'
};

var resources;
resources = [
    {
        name:'content',
        map:'true'
    }
];

// ---------------------------------------------- UNIVERSE

var world;
world = {
    Welcome:
    function() {
        cc('world created');
    }
};

var planeta; // prince: world.display;
planeta = {
    Welcome:
    function() {
        cc('its show time');
        this.city();
        this.resources();
    }
    ,
    city: 
    function() {
        if (city.map)
        ccc([
            city.name,
            'DO_display.city'
        ]);
    }
    ,
    resources:
    function() {
        for ( i in resources )
        if (resources[i].map)
        ccc([
            resources[i].name,
            'DO_display.resource.R['+i+']'
        ]);
    }    
};

var industry;
industry = {
    Welcome:
    function() {
        cc('industry works');
        var industry = this;
        industry.supportUI();
    }
    ,
    supportUI:
    function() {
        cc('Display user interface');
    }
};


// ---------------------------------------------- BEGIN

world.Welcome();
planeta.Welcome();
industry.Welcome();

// ---------------------------------------------- END
console.timeEnd('timer__start_C');
