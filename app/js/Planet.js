function PrincePlanet(world) {
    this.world = world;
    this.Welcome = function() {
        cc('# Welcome Planet!');
        cc(this);
        this.WorldToHomeland();
        //this.show();
    };
    this.Party = function(event) {
        var world = this.world;
        
        // Check contacts
        
        var contact;
        for ( contact in world.contacts ) this.UpdateContact(contact);
        
        ccc(['Party!', 'Planet.Party']);
    };
    this.show = function(options){
        cc('# Its Show Time ------------');
        this.landmarks();
        this.city();
        this.resources();
        
        cc('# ------------ Show Ends');
    };
    this.landmarks = function() {
        var world = this.world;
        var id;
        for ( id in world.landmarks )
            if (world.landmarks[id].map)
                this.Show_Mapico(world.landmarks[id].name);
        ccc([world.landmarks,'Planet.landmarks']);
    };
    this.city = function() {
        var world = this.world;
        var i, buildings = world.city.center;
        for (i in buildings) 
            if (buildings[i].map)
                this.Show_Mapico(buildings[i].name);
        ccc(['Buildings:',buildings,'Planet.city']);
    };
    this.resources = function() {
        ccc([this.world.resources,'Planet.resources']);
    };
    this.SupportUI = function(){
        var world = this.world;
        ccc([
            'Currect State',
            'Turn:'+world.turn,
            'Wifi:'+world.wifi,
            world.city.center.kanban.Board,
            'Planet.SupportUI']);
    };

    // operations

    this.UpdateContact = function(name) {
        var world = this.world;
        var contact = this.world.contacts[name];
        if ( contact && contact.has_to_say ) 
            this.Show_MarkerForMapico(contact.homeland);
        if ( contact && !contact.has_to_say )
            this.Hide_MarkerForMapico(contact.homeland);
    };
    
    this.WorldToHomeland = function() {
        var world = this.world;

        // specials

        this.insertMapico('index', 'buildings');
        this.insertMapico('kanban','buildings');
        var market = this.insertMapico('market','buildings');
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
            //if ( !world.resources[resource].map ) home_resource.classList.add('is-hidden');
        }

    };
    
    this.CallMapico = function(dom_event) {
        
        // Call operator gather values from Planet, then make call to Industry
        
        // # Check
        
        var initiator_marker = dom_event.target
        var initiator = initiator_marker.parentElement;
        ccc([dom_event, initiator, 'Planet.CallMapico:'+dom_event.type]);
        if( !initiator || !initiator_marker.matches('.is-active') ) {
            cc('-- fake joke');
            return false;
        }

        // # Gather values

        var name = initiator.title;
        if (!name) name = 'anonimous';
        
        // # Make call
        
        cc('-- call:'+name);
        Industry.PlanetCall({name:name});
        
    };
    this.Show_Mapico = function(id) {
        var mapico = this.checkMapico(id);
        if (!mapico) return false;
        mapico.classList.remove('is-hidden');
        return true;
    }
    this.Hide_Mapico = function(id) {
        var mapico = this.checkMapico(id);
        if (!mapico) return false;
        mapico.classList.add('is-hidden');
        return true;
    }
    this.Show_MarkerForMapico = function(id) {
        var mapico = this.checkMapico(id);
        if (!mapico) return false;
        var marker = mapico.querySelector('.mapico_marker');
        marker.classList.add('is-active');
        return true;
    }
    this.Hide_MarkerForMapico = function(id) {
        var mapico = this.checkMapico(id);
        if (!mapico) return false;
        var marker = mapico.querySelector('.mapico_marker');
        marker.classList.remove('is-active');
        return true;
    }
    this.mapicoClicker = function(dom_event) {
        var mapico = Planet.getMapicoFromEvent(dom_event);
        if ( !mapico || !mapico.isActive ) return false;
        Planet.ExplainDetailsForMapico(mapico.name);
    };
    this.ExplainDetailsForMapico = function(id){
        this.Messenger.alert({
            unsafeMessage: '<b>Mapico Info:</b> '+id,
            callback: function (value) {
                if (value) {
                    console.log('Successfully destroyed the planet.')
                } else {
                    console.log('Chicken.')
                }
            }
        });
    };
    this.getMapicoFromEvent = function(dom_event) {
        var target = dom_event.currentTarget;
        if (!target) return false;
        var mapico = {};
        mapico.name = target.title;
        mapico.isActive = target.matches('.is-hidden') ? false : true ;
        return mapico;
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
        var html_marker = document.createElement('figcaption');

        html_img.alt = id;
        html_img.src = this.paths.mapico + id + '.svg';
        html_img.classList.add('mapico_img');

        html_marker.classList.add('mapico_marker');
        html_marker.addEventListener('click', Planet.CallMapico);

        html.id = 'mapico--'+id;
        html.title = id;
        html.classList.add('mapico');
        html.classList.add(html.id);
        html.classList.add('from-'+layer);
        html.classList.add('is-hidden');
        html.appendChild(html_img);
        html.appendChild(html_marker);
        html.addEventListener('click', Planet.mapicoClicker);

        mama.insertBefore(html, place);
        

        // update home

        // cc('-- map updated with '+html.id);
        this.home[id] = this.dom(html.id,true);

        return this.home[id];
    };
    this.activateMapico = function(id, deactivate) {
        if (!id) return false;
        var mapico = this.home[id];
        if (!mapico) return false;
        var marker = mapico.querySelector('.mapico_marker');
        if (deactivate)
            marker.classList.remove('is-active');
            // marker.classList.remove('animated','infinite','bounce');
        else
            marker.classList.add('is-active');
            // marker.classList.add('animated','infinite','bounce');
    };
    this.checkMapico = function(id) {
        var mapico = this.home[id]
        if ( id && mapico ) return mapico;
        ccc(['Who is it?',id,this.home,'Planet.checkMapico']);
        return false;
    };
    
    this.PrepareDialog = function(id,dialog){
        var world = this.world;
        var contact = world.contacts[id];
        this.Hide_MarkerForMapico(contact.homeland);
        this.Messenger.alert({
            //message: dialog.msg,
            unsafeMessage: '<b>'+contact.name+':</b> '+dialog.msg,
            callback: function (value) {
                world.planet.Show_MarkerForMapico(contact.homeland);
                if (value) {
                    console.log('Successfully destroyed the planet.')
                } else {
                    console.log('Chicken.')
                }
            }
        });
        ccc([id,dialog,'Planet.PrepareDialog']);
    };
    this.Messenger = vex.dialog;
    this.Messenger.defaultOptions.className = 'vex-theme-flat-attack';
    
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
