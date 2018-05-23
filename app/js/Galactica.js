// v2018.5.21

var Galactica;
Galactica = {
    resources: [
        {
            name:'idea',
            jobs:{
                find_idea:
                    { min_lvl: 1,   max_lvl: false },
            },
        },
        {
            name:'content',
            jobs:{
                grow_content:
                    { min_lvl: 1,   max_lvl: false },
                grow_formatted_content:
                    { min_lvl: 2,   max_lvl: false },
            },
        },
        {
            name:'html_tag',
            jobs:{
                grow_html_tag:
                    { min_lvl: 1,   max_lvl: false },
            },
        },
        //{ name:'css_rule' },
    ],
    jobs: [
        {
            name:'find_idea',
            cost: { days:7 },
            finish:function(){
                cc('--- idea!');
                World.ResourceAdd('idea');
                return true;
            }
        },
        {
            name:'construct_content_farm',
            cost: { days:1 },
            finish:function(){
                cc('--- content farm constructed');
                World.ResourceUpdate('content',1);
                return true;
            }
        },
        {
            name:'grow_content',
            cost: { days:1 },
            finish:function(){
                cc('--- new content');
                World.ResourceAdd('content');
                return true;
            }
        },
        {
            name:'grow_formatted_content',
            cost: { days:1 },
            finish:function(){
                cc('--- new formatted content');
                World.ResourceAdd('content');
                return true;
            }
        },
        {
            name:'construct_html',
            cost: { days:1 },
            finish:function(){
                cc('--- html constructed');
                World.ResourceUpdate('html_tag',1);
                return true;
            }
        },
        {
            name:'grow_html_tag',
            cost: { days:1 },
            finish:function(){
                cc('--- new html_tag');
                World.ResourceAdd('html_tag');
                return true;
            }
        },
    ],
    landmarks: [
        { name:'index_valley' },
        { name:'content_fields' },
        { name:'router_lakes' },
        //{ name:'body_coast' },
        //{ name:'head_peak' },
        //{ name:'north_land' },
        { name:'header_mountains' },
        //{ name:'seobot_desert' },
        //{ name:'sty_land' },
        //{ name:'cascadia_land' },
        //{ name:'sheet_peak' },
        //{ name:'bold_mountains' },
        //{ name:'git_river' },
    ],
    contacts: [
        { name:'kanban', lvl:1 },
        { name:'roof', lvl:1, homeland:'index' },
        { name:'admin', lvl:1, homeland:'router_lakes' },        
        { name:'seobot1', lvl:1 },
    ],
    chromosome: {}
};
Galactica.chromosome = {
    
    name: 'KingWorld Galactica',
    turn: 0,
    wifi: 0,
    mission: {
        name:'Grab content',
        goals: {
            grab_content: function(){ return true; }
        },
    },
    
    landmarks:{
        index_valley:{map:true},
        content_fields:{map:true},
        router_lakes:{map:true},
        header_mountains:{map:true},
    },
    
    resources:{
        idea:{map:true,lvl:1},
        content:{map:false},
        html_tag:{map:false},
        css_rule:{map:false},
    },
    
    city:{
        name:'index',
        mission:{
            name:'get_all_resources',
            complete:false,
            is_reached:function(){
                var i, negative_answer = false;
                for ( i in World.city.mission.goals )
                    if ( !World.city.mission.goals[i].is_reached() ) negative_answer = true;
                return ! negative_answer;
            },
            goals:[
                {
                    name:'get_content',
                    is_reached:function(){
                        return World.city.hasResource('content');
                    },
                }
            ],
        },
        contacts:['seobot1'],
        kde: {
            name:'market',
            lvl:0,
            map:false,
        },
    },
};
