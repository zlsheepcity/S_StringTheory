// v2018.5.25

// # Describe the World

// function KingWorld (chromosome)
// ==> ZeroWorld.js

// # Describe the Industry
// First prince of World
// Lord of the processes

// function WorldIndustry (world)
// ==> ZeroIndustry.js


// # Describe Resources
// Resources → Jobs → Products

function WorldResource(dna) {
    this.name = dna && dna.name ? dna.name : 'dreams' ;
    this.lvl = dna && dna.lvl ? dna.lvl : 0 ;
    this.ai = dna && dna.ai ? dna.ai : 0 ;
    this.homeland = dna && dna.homeland ? dna.homeland : this.name ;
    this.production = dna && dna.production ? dna.production : [] ;

    // ------------ Actions

    this.Grab = function() {
        this.Ai();
        if (this.isWild()) return false;
        return this.DoGenerateJoblist();
    };
    this.Update = function(limit){
        if ( limit && limit <= this.lvl ) return this;
        this.lvl++;
        cc('--- Resource updated: '+this.name+'.'+this.lvl);
        return this;
    }
    this.Destroy = function(){
        this.lvl = 0;
        return this;
    };
    this.DoGenerateJoblist = function(){
        var production = this.production;
        var joblist = [], all;
        for ( all in production )
            if ( this.DoVerifyJob(production[all]) )
                joblist.push(production[all].job);
        return joblist.length ? joblist : false ;
    };
    this.DoVerifyJob = function(job) {
        if (!job||!job.job) return false;
        if ( job.min_lvl && job.min_lvl>this.lvl ) return false;
        if ( job.max_lvl && job.max_lvl<this.lvl ) return false;
        return true;
    }

    // ------------ Services

    this.isWild = function() {
        return this.lvl ? false : true ;
    }
    this.Ai = function(x) {return ++this.ai}

}

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
    this.start = dna && dna.start ? dna.start : function(){return false} ;
    this.finish = dna && dna.finish ? dna.finish : function(){return false} ;
    this.dna = dna;
    
    // ------------ Services
    
    this.ResetProgress = function() {
        this.progress = this.cost.d;
        return this;
    }
    this.UpdateProgress = function() {
        if (!this.progress || !this.progress<0) return false;
        var before = this.progress;
        this.progress--;
        cc('-- Work in progress for '+this.name+', '+before+' → '+this.Report());
        // Check complete
        if ( this.Report() < 1 ) {
            cc('--- job done: '+this.name);
            this.finish();
            return 'complete';
        }
        return true;
    }
    this.FinishHim = function(){
        this.progress = 1;
        this.UpdateProgress();
        return this;
    }
    this.Report = function() {
        return this.progress > 0 ? this.progress*1 : 0 ;
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

    // function WorldCity(dna)
    // ==> ZeroCity.js

// # Describe the Network
// npc contacts

function NetworkContact(dna) {
    this.name = dna && dna.name ? dna.name : 'seobot0';
    this.lvl = dna && dna.lvl ? dna.lvl : 0;
    this.trade_questions = dna && dna.trade_questions ? dna.trade_questions : [];

    this.TradeCall = function() {
        for ( var i in this.trade_questions )
            if ( wow.lvlPass(this.lvl,this.trade_questions[i]) )
                if ( typeof this.trade_questions[i].answer === 'function' )
                    this.trade_questions[i].answer();
        return this;
    }
    this.isAlive = function() { return this.lvl ? true : false }
    this.lvlPass = wow.lvlPass; // check min and max allowed level
}

// # Describe the Chromosome
// Initial data base

    // function WorldChromosome()
    // ==> ZeroChromosome.js

// ============================= Browser initiation

var Chromosome = new WorldChromosome();
var World = new KingWorld(Chromosome);
var Industry = World.industry;
var Geo = World.land.geo;
var tt = Industry.Tester;

ccc([
    '===> Commands will serve you:',
    'World.GoodMorning()',
    "World.ConquerResource('content')",
    "Industry.Tester('life',1)",
    'Industry.Tester(9,1,1)',
    '# EOF // AE:'+wow.aer.length
]);

// ============================= Run

