/*
    City (World.city)
    — object of player property in the World

    KanbanBoard (City.center.kanban.Board)
    — tasks & qests control
*/

function KanbanBoard() {
    this.todo = [];
    this.sprint = [];
    this.closed = [];
    // actions
    this.setTodo = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'todo');
    };
    this.setSprint = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'sprint');
    };
    this.setClosed = function (name) {
    this.do_remove_from_memory(name);
    this.do_add_to_status(name,'closed');
    };
    // tools
    this.do_remove_from_memory = function(name) {
        if (!name) return false;
        this.do_remove_from_status(name,'todo');
        this.do_remove_from_status(name,'sprint');
        this.do_remove_from_status(name,'closed');
        return true;
    };
    this.do_remove_from_status = function(name,status) {
        if (!this[status]) return false;
        var i;
        for ( i = 0; i < this[status].length; i++ )
            if ( this[status] == name )
                this[status].splice(i,1);
        return this[status];
    };
    this.do_add_to_status = function(name,status) {
        if (!this[status]) return false;
        this[status].push(name);
        return this[status];
    };
};
function WorldCity(dna) {
    this.name = dna.name ? dna.name : 'index0';
    this.map = dna.map ? true : false ;
    this.age = 0;
    this.dna = dna;
    this.resources = []; // available resources
    this.products = [];
    this.gov = {name:'anarchy'};
    this.center = {
        roof: dna.roof ? dna.roof : {
            name:'index',
            lvl:1,
            map:true,
            joblist:{},
        },
        kanban: dna.kanban ? dna.kanban : {
            name:'kanban',
            lvl:1,
            map:true,
            mission: dna.mission ? dna.mission : {
                name:'becone_an_empire',
                goals:[],
            },
            Board: new KanbanBoard(),
        },
        rooter: dna.rooter ? dna.rooter : {
            name:'rooter',
            lvl:1,
            map: true,
            contacts: dna.contacts ? dna.contacts : ['seobot0']
        },
        kde: dna.kde ? dna.kde : {
            name:'market',
            lvl:1,
            map:true,
        }
    };


    // actions.job
    this.TakeJob = function(jobname) {
        if ( this.NoJob(jobname) ) 
            this.AddJobToList( Industry.GetJob(jobname) );
    };
    this.TakeThisJoblist = function(joblist) {
        var i;
        for ( i in joblist )
            if ( this.NoJob(joblist[i]) )
                this.AddJobToList( Industry.GetJob(joblist[i]) );
    };
    this.DoYourJob = function() {
        this.ClearResources();
        this.DoJobList();
    };
    this.AddJobToList = function(job){
        if( !job || !job.name ) return false;
        this.center.roof.joblist[job.name] = job;
        return true;
    };
    this.NoJob = function(id) {
        return ! this.CheckJob(id);
    };
    this.CheckJob = function(id) {
        if ( !id ) return false;
        if ( !this.center.roof.joblist[id] ) return false;
        if ( !this.center.roof.joblist[id].progress ) return false;
        return this.center.roof.joblist[id].progress;
    };
    this.DoJobList = function() { // 
        ccc([this.center.roof.joblist, 'City.DoJobList']);
        for ( var id in this.center.roof.joblist )
            this.DoJob(id);
    };
    this.DoJob = function(name){
        if (
            !this.center.roof.joblist[name]
            || !this.center.roof.joblist[name].progress
        ) return false;
        cc('... check payment for '+name);
        this.center.roof.joblist[name].progress--;
        if ( this.center.roof.joblist[name].progress < 1 ) {
            this.center.roof.joblist[name].finish();
            this.center.roof.joblist[name] = false;
        }
        cc('... do payment');
    };
    // actions products
    this.AddProducts = function(name) {
        this.products = Industry.make_array_summ(this.products, name);
    };
    this.ClearProducts = function(){
        this.products = [];
    };
    this.ResetProducts = function(name) {
        this.ClearProducts();
        this.AddProducts(name);
    }
    // actions resources
    this.AddResources = function(resource) {
        this.resources = Industry.make_array_summ(this.resources, resource);
    };
    this.ClearResources = function() {
        this.resources = [];
    };
    this.ResetResources = function(resource) {
        this.ClearResources();
        this.AddResources(resource);
    };
    this.hasResource = function(resource) {
        return this.resources && this.resources.indexOf(resource) > -1;
    };
    // other actions
    this.AddContacts = function(contacts) {
        this.center.rooter.contacts = Industry.make_array_summ(this.contacts, contacts);
    };
    // finish
    cc('# City was born '+this.name);
}
