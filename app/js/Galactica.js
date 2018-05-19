// v2018.5.14

var Galactica;
Galactica = {
    resources: [
        { name:'content' },
        { name:'html_tag' },
        { name:'css_rule' },
    ],
    landmarks: [
        { name:'index_valley' },
        { name:'content_fields' },
        { name:'router_lakes' },
        { name:'body_coast' },
        { name:'head_peak' },
        { name:'north_land' },
        { name:'header_mountains' },
        { name:'seobot_desert' },
        { name:'sty_land' },
        { name:'cascadia_land' },
        { name:'sheet_peak' },
        { name:'bold_mountains' },
        { name:'git_river' },
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
        content:{map:false},
        html_tag:{map:false},
        css_rule:{map:false},
    },
    
    city:{
        name:'index',
        contacts:['seobot1'],
        kde: {
            name:'market',
            lvl:0,
            map:false,
        },
    },
};
