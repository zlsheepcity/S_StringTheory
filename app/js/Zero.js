// v2018.5.25

// # Describe the World

function KingWorld (chromosome) {

    this.Welcome = function() {
        this.land.Welcome();
        this.industry.Welcome();
        cc('# World, welcome!');
        return this;
    }
    
    // ------------ Lords
    
    this.industry = new WorldIndustry(this);
    this.land = new WorldLandlord(this);

    // ------------ Services
    
    this.isAlive = function() { return this.chromosome ? true : false }
    
    // ------------ HQ
    
    this.name = 'KingWorld';
    this.chromosome = false;
    
    this.landmarks = {};
    
    // ============ KingWorld coronation ceremony ============
   
    this.industry.ApplyChromosome(chromosome);
    ccc([
        'name: '+this.name,
        'alive: '+this.isAlive(),
        'o New World was born == o =='
    ]);

}

// # Describe the Industry
// First prince of World
// Lord of the processes

function WorldIndustry (world) {

    this.Welcome = function() {
        cc('# Industry, welcome!');
        return this;
    }
    this.ApplyChromosome = function(chromosome) {
        this.ApplyChromosomeProcess(chromosome);
        return this;
    }
    
    // ------------ processes
    
    this.ApplyChromosomeProcess = function(dna) {
        if (!dna) {wow.ae('ApplyChromosomeProcess:empty dna',dna);return this;}
        var i;
        // gene
        if (dna.name) this.world.name = dna.name;
        // landmarks
        for ( i in dna.landmarks ) this.world.land.NewBorn(dna.landmarks[i])
        this.world.chromosome = dna;
        cc('--- New chromosome from '+dna.name);
        return this;
    }

    
    // ------------ Services
    
    this.Tester = function(testname,testvalues) {
        var testpass = true;
        var DoTest = function(test,request){
            if (request==='all'||request===9) return true;
            return test === request;
        }
        if (DoTest('Doma',testname)) // ------------ Doma
        {
            if (testvalues) {
                Geo.FindHome();
            }
            var t_HomeInspector = Geo.HomeInspector();
            ccc([
                '- *HomeInspector was '+t_HomeInspector,
                '- Doma is '+ Geo.Doma(),
                'o Tester.Doma o:o'
            ]);
            if ( !t_HomeInspector ) testpass = false;
        }
        if (DoTest('ApplyChromosome',testname)) // ------------ ApplyChromosome
        { 
            if (testvalues) {
                Industry.ApplyChromosome(Chromosome);
            }
            ccc([
                '- World:', World,
                '- Chromosome:', Chromosome,
                '- *landmarks:', World.landmarks,
                '- *'+World.name + '/' + Chromosome.name,
                'o Tester.ApplyChromosome o:o'
            ]);
            if ( World.name != Chromosome.name ) testpass = false;
            if ( !World.landmarks.index ) testpass = false;
        }
        return 'Tester was '+testpass;
    }

    // ------------ HQ
    
    this.world = world;
    
}

// # Describe the Landlord
// Second prince of World
// worldmap

function WorldLandlord(world) {

    this.Welcome = function() {
        this.geo.Welcome();
        cc('# Landlord, welcome!');
        return this;
    }
    this.NewBorn = function(dna) {
        if (dna.name) {
            // for king 
            this.world.landmarks[dna.name] = 
                new WorldLandmark(dna);
            // for land
            this.geo.CreateContinent(dna.name);
        }
        return this;
    }
    
    // ------------ masters
    
    this.geo = new WorldGeoMaster();
    
    // ------------ HQ
    
    this.world = world;
}

// ## Describe landmark
// map object

function WorldLandmark(dna) {
    this.name = dna.name;
    this.map = true;
}

// # Describe the Geo
// landlords master of dom

function WorldGeoMaster() {

    this.Welcome = function() {
        this.FindHome();
        cc('- Geo master, welcome!');
        return this;
    }
    this.FindHome = function() {
        if (!this.Doma()) {wow.ae('FindHome:Ne doma!');return false;}
        this.home.map = $('.GeoMap');
        cc('--- New Home found');
        return this;
    }

    this.CreateContinent = function(name) {
        return this;
    }
    
    // ------------ Services
    
    this.Doma = function(id){
        if (!id) return $ ? true : false ;
    }
    this.HomeInspector = function(){
        var inspection = true; // positive inspector
        if (!this.home.map.length) inspection = false;
        ccc([
            '- map:', this.home.map,
            '- I.T.O.G.O.: This is '+inspection,
            'o HomeInspector (o.o)'
        ]);
        return inspection;
    }
    
    // ------------ Home
    
    this.home = {
        hq:false,
        map:false,
        mapico:{},
    }
}

// # Describe the Chromosome
// Initial data base

function WorldChromosome() {
    this.name = 'Index World';
    this.landmarks =  [
        { name:'index' },
        { name:'canban' },
        { name:'content' },
        { name:'index_valley' },
        { name:'content_fields' },
        { name:'router_lakes' },
        { name:'header_mountains' },
        //{ name:'body_coast' },
        //{ name:'head_peak' },
        //{ name:'north_land' },
        //{ name:'seobot_desert' },
        //{ name:'sty_land' },
        //{ name:'cascadia_land' },
        //{ name:'sheet_peak' },
        //{ name:'bold_mountains' },
        //{ name:'git_river' },
    ]
}

// # Browser initiation

var Chromosome = new WorldChromosome();
var World = new KingWorld(Chromosome);
var Industry = World.industry;
var Geo = World.land.geo;

cc('# EOF // Call: Industry.Tester(9,1,1);');
