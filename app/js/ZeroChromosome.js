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
    this.contacts = [
        {
            name:'roof',
            lvl:1,
            trade_questions:[
                {
                    name:'choose_idea',
                    min_lvl:1, max_lvl:false,
                    answer: function(){
                        if ( World.city.HasProduct('idea') )
                            cc('# The Roof presents new idea XOXOXOX!');
                    }
                }
            ],
        },
        {
            name:'kanban',
            lvl:1,
        },
        {
            name:'seobot1',
            lvl:1,
            trade_questions:[
                {
                    name:'trade_wild_content',
                    min_lvl:1, max_lvl:false,
                    answer: function(){
                        if ( World.city.TradeProduct('content',{wifi:1}) )
                            cc('-- content for wifi, 1x1 [seobot1]');
                    }
                }
            ],
        },
    ],
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
