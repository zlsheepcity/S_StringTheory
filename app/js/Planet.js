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
    this.SupportUI = function(){
        cc('# Currect State ------------');
        cc('Wifi:'+this.world.wifi);
        cc('# ------------ No more current');
    };

    // tools

    this.Welcome = function() {
        cc('# Welcome Planet!');
        //this.show();
        this.WorldToHomeland();
        this.home.index.classList.add('is-unknown');
    }

    // operations

    this.WorldToHomeland = function() {
        var world = this.world;

        // specials

        this.insertMapico('index', 'buildings');
        this.insertMapico('kanban','buildings');
        this.insertMapico('market','buildings');
        this.insertMapico('seobot1','contacts');
        this.insertMapico('seobot2','contacts');


        // landmarks

        var landmark, home_landmark;
        for ( landmark in world.landmarks ) {
            home_landmark = this.insertMapico(landmark,'landmarks');
        }

        // resources

        var resource, home_resource;
        for ( resource in world.resources ) {
            home_resource = this.insertMapico(resource,'resources');
            if ( !world.resources[resource].map ) home_resource.classList.add('is-hidden');
        }

    };

    this.insertMapico = function(id,layer) {
        if (!id) return false;
        if (
            !layer
            || ['landmarks','resources','buildings','contacts'].indexOf(layer) < 0
        ) layer = 'landmarks';
        var mama = this.dom('mapico');
        var place = this.dom('mapico-'+layer);
        var html = document.createElement('figure');
        var html_img = document.createElement('img');

        html_img.alt = id;
        html_img.src = this.paths.mapico + id + '.svg';

        html.id = 'mapico--'+id;
        html.classList.add('mapico');
        html.classList.add(html.id);
        html.classList.add('from-'+layer);
        html.appendChild(html_img);

        mama.insertBefore(html, place);

        // update home

        cc('-- map updated with '+html.id);
        this.home[id] = this.dom(html.id,true);

        return this.home[id];
    };

    // functions

    this.dom = function(id,search_by_id) {
        if ( !search_by_id )
            return document.querySelector('.PlanetFor--'+id);
        else
            return document.querySelector('#'+id);
    };
    this.home = {};
    this.paths = {
        mapico: 'art/planet/',
    }
}


//console.log(document.querySelector('.mapibox'));
