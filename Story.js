// v2018.5.14

var Story;
Story = {
    Call: function(contact, world) {
        cc('Calling '+contact+'...');
        var current_status =
            contact && world.contacts[contact]
            ? world.contacts[contact]
            : {};
        switch (contact) {

            case 'seobot1':

                // content for seobot
                if (
                    world.city.hasResource('content')
                    && world.contacts.seobot1.turn_of_last_visit != world.turn 
                ) {
                    cc('-- content for seobot, content/turn = 1 wifi');
                    world.contacts.seobot1.turn_of_last_visit = world.turn;
                    world.industry.ConnectWifi(1);
                }
                break;

            case 'admin':

                // html quiz
                if ( world.city.hasResource('html_tag') )
                    cc('-- html for admin');
                break;
                
            case 'scout':

                // html_tag resource
                if ( 
                    world.resources.html_tag.lvl < 1
                ) {
                    cc('-- html_tag resource');
                } 
                break;

        }
    },
    Play: function(){
        World.NextTurn();
    },
    isNonStop: true,
    Autoplay: function(){
        if ( ! this.isNonStop ) return false;
        switch ( World.turn ) {
            case 1:
                ccc(['Skip','DO_autoplay.T'+World.turn]);
                this.Play();
                break;
            case 2:
                ccc(['Grab html_tag','DO_autoplay.T'+World.turn]);
                World.resources['html_tag'].Grab();
                this.Play();
                break;
            default:
                ccc(['Autoplay finished','DO_autoplay.T'+World.turn]);
                break;
        }
    },
    Tasks: {
        ContentForSeobot:
            function(world) {
                
            }
    }
};
