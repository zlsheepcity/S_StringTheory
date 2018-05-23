function WorldJob(dna) {
    this.name = dna && dna.name ? dna.name : 'prokastination';
    this.cost = {
        days:       dna && dna.cost && dna.cost.days ? dna.cost.days : 1,
        sheeps:     dna && dna.cost && dna.cost.sheeps ? dna.cost.sheeps : 0,
        wifi:       dna && dna.cost && dna.cost.wifi ? dna.cost.wifi : 0,
        resources:  dna && dna.cost && dna.cost.resources ? dna.cost.resources : false,
    };
    this.progress = this.cost.days;
    this.start = dna && dna.start ? dna.start : false ;
    this.finish = dna && dna.finish ? dna.finish : false ;
    this.dna = dna;
}
function WorldResource(dna) {
    this.name = dna && dna.name ? dna.name : 'content';
    this.lvl = dna && dna.lvl ? dna.lvl : 0;
    this.map = dna && dna.map ? true : false ;
    this.jobs = dna && dna.jobs ? dna.jobs : {
        grow_content: {
            min_lvl: 1,
            max_lvl: false,
        }
    };
    // actions
    this.Grab = function() {
        if (this.is_wild()) return false;
        return this.generate_joblist();
    };
    this.Update = function(max){
        if ( max && max <= this.lvl ) return false;
        this.lvl++;
        this.map = true;
        cc('resource updated: '+this.name+'.'+this.lvl);
        return this;
    }
    this.Destroy = function(){
        this.lvl = 0;
        return this;
    };
    this.Mapping = function(yes_or_no){
        this.map = yes_or_no ? true : false ;
        return this;
    };
    this.generate_joblist = function(){
        var id, joblist = [];
        for ( id in this.jobs )
            if (this.check_job(id))
                joblist.push(id);
        return joblist.length ? joblist : false ;
    };
    this.check_job = function(id) {
        if (!id) return false;
        if (!this.jobs[id]) return false;
        var job = this.jobs[id];
        if ( job.min_lvl && job.min_lvl>this.lvl ) return false;
        if ( job.max_lvl && job.max_lvl<this.lvl ) return false;
        return true;
    };
    this.is_wild = function() {
        return this.lvl ? false : true ;
    }
}
function WorldLandmark(dna) {
    this.name = dna.name ? dna.name : 'valley';
    this.lvl = dna.lvl ? dna.lvl : 0;
    this.map = dna.map ? true : false ;
}
function WorldContact(dna) {
    this.name = dna.name ? dna.name : 'seobot0';
    this.lvl = dna.lvl ? dna.lvl : 0;
    this.has_to_say = false;
    this.homeland = dna.homeland ? dna.homeland : this.name ;
    this.turn_of_last_visit = 0;
    this.quests = dna.quests ? dna.quests : {};
}
