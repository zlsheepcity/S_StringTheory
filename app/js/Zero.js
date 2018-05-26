// v2018.5.25

// # Describe the World

// function KingWorld (chromosome)
// ==> ZeroWorld.js

// # Describe the Industry
// First prince of World
// Lord of the processes

// function WorldIndustry (world)
// ==> ZeroIndustry.js

// # Describe Job
// Resources → Jobs → Products

function WorldJob(dna) {
    this.name = dna && dna.name ? dna.name : 'prokastination';
    this.cost = {
        d: dna && dna.cost && dna.cost.d ? dna.cost.d : 1,
        w: dna && dna.cost && dna.cost.w ? dna.cost.w : 0,
        s: dna && dna.cost && dna.cost.s ? dna.cost.s : 0,
        r: dna && dna.cost && dna.cost.r ? dna.cost.r : false,
    }
    this.progress = 0;
    this.start = dna && dna.start ? dna.start : false ;
    this.finish = dna && dna.finish ? dna.finish : false ;
    this.dna = dna;
    
    // ------------ Services
    
    this.ResetProgress = function() {
        this.progress = this.cost.d;
        return this;
    }
    this.UpdateProgress = function() {
        this.progress--;
        // XOXOXOX Check complete
        return this;
    }
    this.Report = function() {
        return this.progress;
    }
    
    // ------------ On register
    
    this.ResetProgress();
    cc('--- job created: '+this.name+'.'+this.Report());
}

// # Describe the Landlord
// Second prince of World
// worldmap

function WorldLandlord(world) {

    this.Welcome = function() {
        this.geo.Welcome();
        this.NewMap();
        cc('# Landlord, welcome!');
        return this;
    }
    this.NewBorn = function(dna) {
        if (dna.name)
            this.world.landmarks[dna.name] = 
                new WorldLandmark(dna);
        return this;
    }
    this.NewMap = function() {
        for ( var name in this.world.landmarks )
            this.geo.CreateContinent(name)
    };
    this.VisitLandmark = function(name) {
        cc('XOXOX:VisitLandmark');
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
    this.name = dna && dna.name ? dna.name : 'desert' ;
    this.lvl = dna && dna.lvl ? dna.lvl : 0 ;
    this.map = dna && dna.map ? true : false ;
}

// # Describe the Geo
// landlords master of dom

function WorldGeoMaster() {
    
    this.paths_for = {
        mapico: 'art/planet/',
    }
    
    // ------------ export

    this.Welcome = function() {
        this.FindHome();
        cc('- Geo master, welcome!');
        return this;
    }
    this.FindHome = function() {
        if (!this.Doma()) {wow.ae('FindHome:Ne doma!');return false;}
        this.home.map = $('.GeoMap');
        this.home.hq = true;
        cc('--- New Home found');
        return this;
    }

    this.CreateContinent = function(name) {
        if (!this.Homa()) {wow.ae('CreateContinent:Ne homa!');return false;}
        var html = this.BuldDomForContinent({name:name});
        this.home.map.append(html);
        this.home.mapico[name] = html;
        return this;
    }
    
    // ------------ Services
    
    this.BuldDomForContinent = function (relief) {
        var name = relief.name;
        var id = 'Mapico-'+name;
        var html = $('<figure>');
            var html_img = $('<img>');
            var html_info = $('<figcaption>');
                var html_trigga = $('<span>');

        html_img
            .attr('src',this.paths_for.mapico+name+'.svg')
            .attr('alt',name)
            .addClass('mapico_img')
            .appendTo(html);
        html_trigga
            .attr('data-name',name)
            .addClass('mapico_trigga')
            .appendTo(html_info)
            .on('click',this.domContinentalQuake);
        html_info
            .addClass('mapico_info')
            .appendTo(html);
        html
            .addClass('mapico')
            .addClass('mapico--'+name)
            .attr('data-name',name)
            .attr('id',id);
        return html;
    }
    this.domContinentalQuake = function(dom_event) {
        var kliker = $(dom_event.target);
        var name = kliker.attr('data-name');
        World.land.VisitLandmark(name);
        evt.stopPropagation();
    }
    
    this.Doma = function(id) {
        if (!id) return $ && document.readyState === "complete" ? true : false ;
    }
    this.Homa = function() {
        return this.home.hq ? true : false ;
    }
    this.HomeInspector = function(){
        var inspection = true; // positive inspector
        if (!this.home.map.length) inspection = false;
        ccc([
            '- map:', this.home.map,
            '- Mapico:', Geo.home.mapico,
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

// # Describe the City
// third prince of the World
// lord of current state

function WorldCity(dna) {
    
    this.name = dna && dna.name ? dna.name : 'Index City';
    this.homeplace = dna && dna.homeplace ? dna.homeplace : 'index';
    this.joblist = {};
    
    this.Welcome = function() {
        cc('# City, welcome!');
        return this;
    }
    
    // ------------ JobCenter
    
    this.TakeJob = function(job) {
        if (!job || !job.name) {
            wow.ae('City.TakeJob:no job',job);
            return this;
        }
        if ( this.joblist[job.name] && this.joblist[job.name].Report() ) {
            cc('--- Already in progress '+job.name);
            return this;
        }             
        this.joblist[job.name] = new WorldJob(job);
        return this;
    }
    this.DoJob = function(jobname) {
        if (!jobname || !this.joblist[jobname] || !this.joblist[jobname].Report() ) {
            wow.ae('City.DoJob:no job',jobname);
            return this;
        }
        var rich = this.CheckPayment(this.joblist[jobname].cost);
        return this;
    }
    
    // ------------ Bank
    
    this.CheckPayment = function(dwsr_cost,official) {
        var answer = true;
        // dwsr_cost.d always true
        if ( dwsr_cost.w && dwsr_cost.w*1 > World.Wifi(this.name)*1 ) answer = false;
        if ( dwsr_cost.s && dwsr_cost.s*1 > World.Sheep(this.name)*1 ) answer = false;
        // dwsr_cost.r is ignored
        // official bourocracy is ignored
        return answer;
    }
    this.DoPayment = function(dwsr_cost,official) {
        if (!this.CheckPayment(dwsr_cost,official)) return false;
        var bank_backup = {
            w:World.Wifi(this.name),
            s:World.Sheep(this.name),
        };
        // bank operations
        if ( dwsr_cost.w && dwsr_cost.w > 0 ) World.wifi = World.wifi - 1*dwsr_cost.w;
        if ( dwsr_cost.s && dwsr_cost.s > 0 ) World.sheep = World.sheep - 1*dwsr_cost.s;
        // bank report
        var bank_report = [
            dwsr_cost, official, '- bank nackup:', bank_backup,
            'DoPayment.report'
        ];
        return true;
    }
    this.ConnectWifi = function(wifi) {
        if (!wifi || wifi < 1) return false;
        // bank operations
        World.wifi = World.wifi + 1*wifi;
        // bank report - no reports for connections
        return true;
    }
    
    
    // ------------ Born process
    
    cc('--- New City '+this.name);
}

// # Describe the Chromosome
// Initial data base

function WorldChromosome() {
    this.name = 'Index World';
    this.landmarks =  [
        { name:'index' },
        { name:'kanban' },
        { name:'content' },
        { name:'index_valley' },
        { name:'content_fields' },
        { name:'router_lakes' },
        { name:'header_mountains' },
    ];
    this.resources = [
        {
            name:'idea',
            production:[
                { job:'find_idea', min_lvl:1,max_lvl:false },
                { job:'find_genius_idea', min_lvl:1,max_lvl:false },
            ],
        },
        {
            name:'content',
            production:[
                { job:'grow_content', min_lvl:1,max_lvl:false },
            ],
        },
    ];
    this.jobs = [
        {
            name:'find_idea',
            cost: { d:7, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new idea!');
                World.ProductDelivery('idea', {job:'find_idea'});
                return true;
            }
        },
        {
            name:'find_genius_idea',
            cost: { d:31, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new genius idea!');
                World.ProductDelivery('genius_idea', {job:'find_genius_idea'});
                return true;
            }
        },
        {
            name:'construct_content_farm',
            cost: { d:1, w:0, s:1, r:0 },
            finish:function(){
                cc('--- job done - content farm constructed');
                World.ResourceUpdate({name:'content',max_lvl:1});
                return true;
            }
        },
        {
            name:'grow_content',
            cost: { d:1, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new content');
                World.ProductDelivery('content', {job:'grow_content'});
                return true;
            }
        },
    ];
    this.city = {
        name:'index'
    };
}

// ============================= Browser initiation

var Chromosome = new WorldChromosome();
var World = new KingWorld(Chromosome);
var Industry = World.industry;
var Geo = World.land.geo;

ccc([
    'World.Welcome()',
    'Industry.Tester(9,1,1)',
    '# EOF // AE:'+wow.aer.length
]);

// ============================= Run

