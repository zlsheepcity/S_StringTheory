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
        { name:'admin', lvl:1, homeland:'router_lakes' },
        { name:'scout' },
        { name:'seobot1', lvl:1 },
    ],
    chromosome:
    {
        city:{
            name:'index',
            contacts:['seobot1']
        },
        resources:{
            content:{lvl:1,map:true},
            html_tag:{map:true},
        },
        landmarks:{
            index_valley:{map:true}
            content_fields:{map:true}
            router_lakes:{map:true}
        },
        turn: 0,
        name: 'Galactica.KingWorld'
    }
};
