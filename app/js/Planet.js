/*
    Planet / lvl 2
    - DOM & DOM events

    Mapico
    - Display icon
 */


function PlanetaryMapico(name) {
    this.name = name ? name : 'mapico';
    this.layer = false;
    this.dom = false;
    this.DomAction = function(dom_event){
        var name, dna;
        //dna = {name:dom_event.currentTarget.id};
        //name = Planet.RecognizeMapico(dna);
        name = dom_event.currentTarget.getAttribute('data-name');
        Planet.ShowFocusByMapico(name); // default action
    };
    this.ConstructDom = function(state) {
        var layer = this.layer ? this.layer : 'landmarks';
        var cssname = 'mapico--'+this.name;
        var name = this.name;

        // dom

        var dom_mama = Planet.Doma('mapico');
        var dom_place = Planet.Doma('mapico-'+layer);
        var html = document.createElement('figure');
        var html_marker = document.createElement('figcaption');
        var html_img = document.querySelector('#MapicoLoader > svg#'+name);
        var action_trigger;
        if (html_img) {
            action_trigger = html_img ? html_img.querySelectorAll('path') : false;
            if (action_trigger)
                action_trigger.forEach(function(el){
                    el.setAttribute('data-name', name);
                });
        }
        else {
            html_img = document.createElement('img');
            html_img.alt = this.name;
            html_img.src = Planet.paths.mapico + name + '.svg';
            html_img.setAttribute('data-name', name);
            action_trigger = html_img;
        }

        // img

        html_img.classList.add('mapico_img');

        // figcaption

        //html_marker.classList.add('mapico_marker');
        //html_marker.addEventListener('click', this.DomAction);

        // figure

        html.id = name;
        html.setAttribute('data-name', name);
        html.classList.add('mapico');
        html.classList.add(cssname);
        html.appendChild(html_img);
        html.appendChild(html_marker);

        // events
        var DomAction = this.DomAction;
        if (action_trigger.forEach)
            action_trigger.forEach(function(el){
                el.addEventListener('click', DomAction);
            });
        else
            action_trigger.addEventListener('click', DomAction);


        // state

        html.classList.add('from-'+layer);
        html.classList.add('is-hidden');

        // parents

        dom_mama.insertBefore(html, dom_place);

        // official

        this.dom = html;
        return this.dom;
    };
    this.DecorateDom = function(decoration) {
        if (!decoration) return false;
        this.Show(decoration.visibility ? false : 'hidden');
        this.Smile(decoration.smiling ? false : 'stop');
    };
    this.ShowFocus = function(){
        //ccc([this.name,this,'Mapico.ShowFocus()']);
        // QUICK FOCUS -------------------
        var message = '';
        var positive = function(){return true} ;
        var negative = function(){return false} ;
        message += '<b>'+this.name+'</b><br>';
        message += this.layer;
        Planet.Messenger.alert({
            unsafeMessage: message,
            callback: function (value) {
                if (value) positive();
                else negative();
            }
        });
        // end of QUICK FOCUS ------------
    };
    this.Smile = function(stop){
        Planet.ClassService(
            this.dom,
            'is-smiling',
            stop=='stop'?'cure':'inject'
        );
        return true;
    };
    this.Show = function(maybe_hide){
        Planet.ClassService(
            this.dom,
            'is-hidden',
            maybe_hide?'inject':'cure'
        );
        return true;
    };
    this.Hide = function(){
        return this.Show('hidden');
    }
}
function PrincePlanet(world) {

    this.paths = {
        mapico: 'art/planet/',
    }

    // -------------------------------------------- export

    this.Welcome = function() {
        cc('# Welcome Planet!');
        cc(this);
        cc('> Planet.BornLife');
        this.BornLife();
        this.ReviewMap();
        return this;
    };
    this.Party = function(reason) {
        ccc(['reason:',reason,'# Planet.Party!']);
        var world = this.world;
        // check contacts
        var contact;
        for ( contact in world.contacts )
            this.AskToSmile(contact);
        // finish
        this.ReviewMap();
        return this;
    };
    this.ReviewMap = function() {
        cc('> Planet.ReviewMap');
        var world = this.world;
        var home = this.home.mapico;
        // landmarks
        for ( name in world.landmarks )
            home[name].DecorateDom({
                visibility:world.landmarks[name].map
            });
        // resources
        for ( name in world.resources )
            home[name].DecorateDom({
                visibility:world.resources[name].map
            });
        // buildings
        home['index'].DecorateDom({visibility:true});
        home['kanban'].DecorateDom({visibility:true});
        home['seobot1'].DecorateDom({visibility:true});
        home['seobot2'].DecorateDom({visibility:true});
        return this;
    };
    this.SupportUI = function(){
        var world = this.world;
        ccc([
            'Turn:'+world.turn +', Wifi:'+world.wifi,
            City.center.kanban.Board,
            'City resources:',
            City.resources,
            'City jobs:',
            City.center.roof.joblist,
            'Planet.SupportUI'
        ]);
        return this;
    };
    this.VisitLandmark = function(name) {
        cc('XOXOX.VisitLandmark');
        return this;
    }

    // -------------------------------------------- HQ

    // born process

    this.world = world;

    this.BornLife = function() {
        var world = this.world;
        this.BornMapicoFamily(world);
        return this;
    };
    this.BornMapicoFamily = function(world) {
        // clear place
        this.home.mapico = {};
        var name;
        // landmarks
        for ( name in world.landmarks )
            this.GiveHomeForMapico({name:name,layer:'landmarks'});
        // resources
        for ( name in world.resources )
            this.GiveHomeForMapico({name:name,layer:'resources'});
        // buildings
        this.GiveHomeForMapico({name:'index',layer:'buildings'});
        this.GiveHomeForMapico({name:'kanban',layer:'buildings'});
        this.GiveHomeForMapico({name:'seobot1',layer:'buildings'});
        this.GiveHomeForMapico({name:'seobot2',layer:'buildings'});
        return this;
    };


    // home model

    this.home = {
        mapico:{},
    };
    this.dom = function(name,params) {
        return document.querySelector('.PlanetFor--'+name);
    };
    this.Doma = function(name,params) {
        return document.querySelector('.PlanetFor--'+name);
    };

    // mapico family

    this.GiveHomeForMapico = function(dna) {
        var mapico = new PlanetaryMapico(dna.name);
        if( dna.layer ) mapico.layer = dna.layer;
        this.GiveDomeForMapico(mapico);
        this.home.mapico[mapico.name] = mapico;
        return this.home.mapico[mapico.name];
    };
    this.GiveDomeForMapico = function(mapico) {
        mapico.ConstructDom();
        return mapico.dom;
    };
    this.RecognizeMapico = function(dna) {
        var name = false;
        if ( dna && dna.dom_target ) {
            name = dna.dom_target.id;
        }
        if ( dna && dna.dom_event ) {
            name = dna.dom_event.currentTarget.id;
        }
        if ( dna && dna.name ) {
            name = dna.name;
        }
        if ( name && !this.home.mapico[name] ) name = false;
        return name;
    };
    this.ShowFocusByMapico = function(name) {
        if (!this.RecognizeMapico({name:name})) return false;
        this.home.mapico[name].ShowFocus();
    };

    // contacts

    this.AskToSmile = function(name) {
        var world = this.world;
        var contact = world.contacts[name];
        if ( contact && contact.homeland )
            this.home.mapico[contact.homeland].Smile( contact.has_to_say ? 'smile' : 'stop');
    };
    this.Dialog = function(dialog) {
        var contact = dialog.name;
        var topic = dialog.topic;
        var message = '';
        var positive = dialog.positive ? dialog.positive : function(){return true} ;
        var negative = dialog.negative ? dialog.negative : function(){return false} ;

        // topic = say
        message += '<b>'+contact+'</b><br>';
        message += dialog.msg;
        this.Messenger.alert({
            unsafeMessage: message,
            callback: function (value) {
                if (value) positive();
                else negative();
            }
        });
    };

    // messenger

    this.Messenger = vex.dialog;
    this.Messenger.defaultOptions.className = 'vex-theme-flat-attack';

    // services

    this.ClassService = function(patient,classname,action){
        if (!patient && !classname) return false;
        if (!action) action = 'inject'; // inject/cure/change
        switch(action){
            case 'cure':
                patient.classList.remove(classname);
                break;
            case 'change':
                break;
            case 'inject':
            default:
                patient.classList.add(classname);
                break;
        };
    };
    this.ChildService = function(){};
    this.SearchService = function(classname){
        return document.querySelector('.'+classname);
    };

    /* ************* */
    /* * STONE AGE * */
    /* ************* */

    /*
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
    */

    cc('New city was born - '+this.name);
    cc(this);
}
