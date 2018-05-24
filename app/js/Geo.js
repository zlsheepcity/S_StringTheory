/*
    Geo, PrinceGeography
    display world, catch events
    v2018.5.24

    GeoMapico
    map icon

    Tectonics, lord

    StatusManager, HQ
*/
function GeoMapico(dna){
    if(!dna||!dna.name) {
        World.ae({msg:'GeoMapico: dna net',proof:dna});
        return false;
    }
    this.name = dna && dna.name ? dna.name : 'mapico';
}
function PrinceGeography(world) {
    this.world = world;
    this.paths_for = {
        mapico: 'art/planet/',
    }


    // -------------------------------------------- export

    this.Map = function(target) {
        if (!target) this.Tectonics();
        return this;
    }

    // -------------------------------------------- home lord

    this.dom = {};
    this.NewHome = function() {
        this.dom = {
            geo:$('.WorldGeo'),
            map:$('.WorldMap'),
            continents:{},
        };
        if ( !this.HomeInspection() )
            World.ae({msg:'DOM?',proof:this.dom});
        return this.dom;
    }
    this.HomeInspection = function(){
        var inspection =
            this.dom
            && this.dom.geo
            && this.dom.map
            ? true : false ;
        return inspection;
    }

    // -------------------------------------------- display lord

    this.Tectonics = function() {
        this.TectonicBornContinents();
        this.TectonicMoveContinents();
    }
    this.TectonicBornContinents = function() {
        var status = this.StatusManager('Tectonics');
        // preprocess
        if (!status.doma) this.NewHome();
        // process
        var continent, continents;
        continents = this.Relief();
        this.dom.continents = continents;
        for ( continent in continents ) {
            this.ContintentBornProcess(continents[continent]);
        }
    }
    this.TectonicMoveContinents = function() {
        // UPDATE
    }
    this.ContintentBornProcess = function(relief) {
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
            .appendTo(html_info);
        html_info
            .addClass('mapico_info')
            .appendTo(html);
        html
            .addClass('mapico')
            .addClass('mapico--'+name)
            .attr('data-name',name)
            .attr('id',id);

        this.dom.map.append(html);
        this.dom.continents[name] = html;
        return html;
    }

    // -------------------------------------------- HQ

    this.Relief = function() {
        var GeoDescription = this.world.GeoDescription();
        return GeoDescription.relief;
    }
    this.StatusManager = function(topic) {
        if (topic=='Tectonics') return {
            continental: !this.hasContinents(),
            doma: this.hasDom(),
        }
        World.ae({msg:'Geo.StatusManager: topic unknown',proof:topic});
        return false;
    }
    this.hasContinents = function() { return true }
    this.hasDom = function() { return this.HomeInspection() }
    this.hasWorld = function() { return this.world && this.world.name }


}

// --------------------------- GeoWorld

function GeoWorld() {
    this.geo = new PrinceGeography(this);
    this.GeoDescription = function() {
        var description = {};
        description.relief = {
            index: {name:'index',map:true,contact:true},
            kanban: {name:'kanban',map:true,contact:true},
            index_valley: {name:'index_valley',map:true,contact:true},
        }
        return description;
    }
    // HQ
    this.aer = [];
    this.ae = function(ae) {this.aer.push(ae)};
}
var World = new GeoWorld();
var Geo = World.geo;
