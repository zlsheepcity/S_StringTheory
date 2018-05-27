function WorldIndustry (world) {

    this.Welcome = function() {
        this.world.MrCity().Welcome();
        cc('# Industry, welcome!');
        return this;
    }
    this.GoodMorning = function () {
        this.world.day++;
        cc('============ Good Morning! Day:'+this.world.day+' ============');
        this.MorningRoutineProcess();
        cc('=============================================');
        this.world.StatusReport();
        // Finish
        // XOXOXOX innitiative
        return this;
    }
    this.ApplyChromosome = function(chromosome) {
        this.ApplyChromosomeProcess(chromosome);
        return this;
    }
    this.ScheduleJob = function(jobname){
        if( !this.world.MrCity() ) return wow.ae('Industry.TakeJob:no city');
        var job = this.world.jobs[jobname];
        this.world.city.TakeJob(job);
        return this;
    }

    
    // ------------ Masters
    
    this.BuildCity = function(dna){
        if(dna==='AnyIfNot' && this.world.city && this.world.city.name) return false;
        this.world.city = new WorldCity(dna);
        return this;
    }
    this.GrabResources = function () {
        var joblist = [];
        cc('# Begin Resource Grabbing...');
        for ( var resourcename in this.world.resources )
            joblist = wow.to_array(
                this.world.resources[resourcename].Grab(),
                joblist
            );
        this.ResourceDelivery({joblist:joblist});
        ccc([
            'Resources → Jobs', joblist, World.city.joblist,
            'o Industry.GrabResources'
        ]);
        return this;
    }
    this.ResourceDelivery = function(package) {
        if ( package && package.joblist )
            for ( var all in package.joblist )
                this.ScheduleJob(package.joblist[all]);
        if ( package && package.job )
            this.ScheduleJob(package.job);
        return this;
    }
    this.ProductDelivery = function(product) {
        if(!product) return this;
        if(!this.world.MrCity()) {wow.ae('ProductDelivery:no city');return this}
        this.world.city.StoreProduct(product);
        return this;
    }

    // ------------ Processes

    this.MorningRoutineProcess = function() {
        if( !this.world.isAlive() || !this.world.isReady() ) {
            cc('--- MorningRoutineProcess is broken!');
            wow.ae('MorningRoutineProcess:no city');
            return this;
        }
        // Breakfast
        this.GrabResources();
        // Dinner
        this.DailyJob();
        // Party
        this.PartyTrade();
        // XOXOXOX geo party
        return this;
    }
    this.ApplyChromosomeProcess = function(dna) {
        if (!dna) {wow.ae('ApplyChromosomeProcess:empty dna',dna);return this;}
        var i;
        // gene
        if (dna.name)
            this.world.name = dna.name;
        // landmarks
        for ( i in dna.landmarks )
            this.world.land.NewBorn(dna.landmarks[i]);
        // resources
        for ( i in dna.resources )
            this.RegisterResourceSource(dna.resources[i]);
        // jobs
        for ( i in dna.jobs )
            this.world.jobs[dna.jobs[i].name] = dna.jobs[i];
            // jobs without registration? ewh...
        // city
             this.BuildCity();
        // contacts
        for ( i in dna.contacts )
            this.ContactRegistration(dna.contacts[i]);
        // finish
        this.world.chromosome = dna;
        cc('--- New chromosome from '+dna.name);
        return this;
    }
    this.DailyJob = function(){
        if( !this.world.MrCity() ) return wow.ae('Industry.DailyJob:no city');
        this.world.city
            .EmptyStorage()
            .DoYourJob();
        return this;
    }

    // ------------ Services

    this.CheckPayment = function(cost,official) { 
        if (this.world.city)
            return this.world.city.CheckPayment(cost,official);
        // else
        cc('- Bank closed');
        if ( official != 'Tester' )
            wow.ae('Industry.CheckPayment:Someone try closed bank',{cost:cost,official:official});
        return false;
    }
    this.DoPayment = function(cost,official) { 
        if (this.world.city)
            return this.world.city.DoPayment(cost,official);
        // else
        cc('- Bank closed');
        if ( official != 'Tester' )
            wow.ae('Industry.DoPayment:Someone try closed bank',{cost:cost,official:official});
        return false;
    }
    this.ConnectWifi = function(wifi) {
        if (this.world.city)
            return this.world.city.ConnectWifi(wifi);
        // else
        cc('- Bank closed');
        wow.ae('Industry.ConnectWifi:Someone try closed bank',wifi);
        return false;
    }
    this.ListOfConqueredResources = function() {
        var list = [];
        for ( var id in this.world.resources )
            if ( !this.world.resources[id].isWild() )
                list.push(id);
        return list;
    }

    // ------------ Contacts

    this.ContactRegistration = function(dna) {
        this.world.contacts[dna.name] = new NetworkContact(dna);
        return this;
    }
    this.PartyTrade = function(){
        cc('# Trades are open. Calling contacts...');
        for ( var id in this.world.contacts )
            this.world.contacts[id].TradeCall();
        cc('# ________ trades are closed ________');
        return this;
    }

    // ------------ Resources

    this.RegisterResourceSource = function(dna) {
        if (!dna||!dna.name)
            return wow.ae('RegisterResourceSource:ne dna',dna);
        if ( this.world.resources[dna.name] && this.world.resources[dna.name].name )
            return wow.ae('RegisterResourceSource:no dublicates!',dna);
        this.world.resources[dna.name] = new WorldResource(dna);
        cc('--- Resource registered '+dna.name);
        return this;
    }
    this.UpdateResource = function(resourcename,limit) {
        if(!resourcename || !this.world.resources[resourcename])
            return wow.ae('Industry.UpdateResource:no',resourcename);
        this.world.resources[resourcename].Update(limit);
        return this;
    }

    // ------------ Tester

    this.Tester = IndustryTester;

    // ------------ HQ
    
    this.world = world;
    
}
