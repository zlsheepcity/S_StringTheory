function WorldChromosome() {
    this.name = 'Index World';
    this.landmarks =  [
        { name:'index' },
        { name:'kanban' },
        { name:'content' },
        { name:'index_valley' },
        { name:'content_fields' },
        { name:'router_lakes' },
        { name:'header_mountains' },
    ];
    this.resources = [
        {
            name:'idea',
            lvl:1,
            homeland:'index',
            production:[
                { job:'find_idea', min_lvl:1,max_lvl:false },
                { job:'find_genius_idea', min_lvl:1,max_lvl:false },
            ],
        },
        {
            name:'content',
            lvl:0,
            production:[
                { job:'grow_content', min_lvl:1,max_lvl:false },
            ],
        },
    ];
    this.jobs = [
        {
            name:'find_idea',
            cost: { d:7, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new idea!');
                World.ProductDelivery('idea', {job:'find_idea'});
                return true;
            }
        },
        {
            name:'find_genius_idea',
            cost: { d:31, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new genius idea!');
                World.ProductDelivery('genius_idea', {job:'find_genius_idea'});
                return true;
            }
        },
        {
            name:'construct_content_farm',
            cost: { d:1, w:0, s:1, r:0 },
            finish:function(){
                cc('--- job done - content farm constructed');
                World.ConquerResource('content');
                return true;
            }
        },
        {
            name:'grow_content',
            cost: { d:1, w:0, s:0, r:0 },
            finish:function(){
                cc('--- job done - new content');
                World.ProductDelivery('content', {job:'grow_content'});
                return true;
            }
        },
    ];
    this.city = {
        name:'index'
    };
}
