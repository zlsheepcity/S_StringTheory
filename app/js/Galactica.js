// v2018.5.14

var Galactica;
Galactica = {
    resources: [
        { name:'content' },
        { name:'html_tag' }
    ],
    landmarks: [
        { name:'voronsnest' }
    ],
    contacts: [
        { name:'admin', lvl:1, homeland:'voronsnest' },
        { name:'scout' },
        { name:'seobot1', lvl:1 }
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
            voronsnest:{map:true}
        },
        turn: 0,
        name: 'Galactica.KingWorld'
    }
};
