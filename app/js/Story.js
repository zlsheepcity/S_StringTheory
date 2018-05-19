// v2018.5.14

var Story;
Story = {
    Call: function(contact, world) {
        cc('- Story.Call '+contact+'...');
        var current_status =
            contact && world.contacts[contact]
            ? world.contacts[contact]
            : {};
        switch (contact) {

            case 'nothing':
            
                /* nothing */
                if (
                    true
                ) {
                    //nothing
                }
                /* */
            
            break;
            case 'kanban':
            
                /* grab content */
                if (
                    !world.city.hasResource('content')
                ) {
                    cc('-- Quest: grab content');
                }
                /* */
            
            break;
            case 'seobot1':

                /* content for seobot */
                if (
                    world.city.hasResource('content')
                    && world.contacts.seobot1.turn_of_last_visit != world.turn 
                ) {
                    cc('-- content for seobot, content/turn = 1 wifi');
                    world.contacts.seobot1.turn_of_last_visit = world.turn;
                    world.industry.ConnectWifi(1);
                }
                /* */
                
                
            break;
            case 'admin':

                /* html quiz */
                if ( world.city.hasResource('html_tag') )
                    cc('-- html for admin');
                /* */
                
            break;
            case 'scout':

                // html_tag resource
                if ( 
                    world.resources.html_tag.lvl < 1
                ) {
                    //cc('-- no html_tag resource');
                } 
                
            break;

        }
    },
    Play: function(){
        World.NextTurn();
    },
    isNonStop: false,
    Autoplay: function(){
        if ( ! this.isNonStop ) return false;
        switch ( World.turn ) {
            case 1:
                ccc(['Skip','Story.Autoplay.T'+World.turn]);
                this.Play();
                break;
            case 2:
                ccc(['Grab content','Story.Autoplay.T'+World.turn]);
                World.resources['content'].Grab();
                this.Play();
                break;
            default:
                ccc(['Autoplay finished','Story.Autoplay.T'+World.turn]);
                break;
        }
    },
    Tasks: {
        ContentForSeobot:
            function(world) {
                
            }
    }
};
