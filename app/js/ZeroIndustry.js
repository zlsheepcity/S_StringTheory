function WorldIndustry (world) {

    this.Welcome = function() {
        this.BuildCity(this.world.chromosome.city);
        cc('# Industry, welcome!');
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
    this.DailyJob = function(){
        if( !this.world.MrCity() ) return wow.ae('Industry.DailyJob:no city');
        this.world.city.DoYourJob();
        return this;
    }
    
    // ------------ Masters
    
    this.BuildCity = function(dna){
        if(dna==='AnyIfNot' && this.world.city && this.world.city.name) return false;
        this.world.city = new WorldCity(dna);
        this.world.MrCity().Welcome();
        return this;
    }
    this.GrabResources = function () {
        var joblist = [];
        for ( var resourcename in this.world.resources )
            joblist = wow.to_array(
                this.world.resources[resourcename].Grab(),
                joblist
            );
        cc();
        cc(joblist);
        this.ResourceDelivery({joblist:joblist});
        ccc([
            'Resources → Jobs', joblist, World.city.joblist,
            'o Industry.GrabResources'
        ]);
    }
    this.ResourceDelivery = function(package) {
        if ( package && package.joblist )
            for ( var all in package.joblist )
                this.ScheduleJob(package.joblist[all]);
        if ( package && package.job )
            this.ScheduleJob(package.job);
        return this;
    }

    // ------------ Processes

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
        // city - removed to Welcome process
        // this.BuildCity();
        // finish
        this.world.chromosome = dna;
        cc('--- New chromosome from '+dna.name);
        return this;
    }
    //XOXOXOX this.DailyJobProcess

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

    this.Tester = function(testname,testvalues) {
        var testpass = true;
        var DoTest = function(test,request){
            if (request==='all'||request===9) return true;
            return test === request;
        }
        if (DoTest('Nothing',testname)) // ------------ TEMPLATE
        {
            if (testvalues) {

            }
            ccc([

                'o Tester.Nothing o:o'
            ]);
            if ( false ) testpass = false;
        }
        if (DoTest('ApplyChromosome',testname)) // ------------ ApplyChromosome
        {
            if (testvalues) {
                Industry.ApplyChromosome(Chromosome);
            }
            ccc([
                '- World:', World,
                '- Chromosome:', Chromosome,
                '- *landmarks:', World.landmarks,
                '- jobs:', World.jobs,
                '- *'+World.name + '/' + Chromosome.name,
                'o Tester.ApplyChromosome o:o'
            ]);
            if ( World.name != Chromosome.name ) testpass = false;
            if ( !World.landmarks.index ) testpass = false;
        }
        if (DoTest('FinanceSystem',testname)) // ------------ Bank
        {
            var t_TestFinReport = true;
            if (testvalues) {
                Industry.BuildCity();
                World.ConnectWifi(9);
                t_TestFinReport = World.CheckPayment({w:9,s:1},'Tester') ? t_TestFinReport : false;
                t_TestFinReport = World.industry.DoPayment({w:5,s:0},'Tester') ? t_TestFinReport : false;                
                t_TestFinReport = World.CheckPayment({w:100500,s:0},'Tester') ? false : t_TestFinReport; 
                t_TestFinReport = World.industry.DoPayment({w:100500,s:0},'Tester') ? false : t_TestFinReport; 
                if ( !t_TestFinReport ) testpass = false;
            }
            ccc([
                '- W:'+ World.Wifi() + ' S:'+World.Sheep(),
                '- *CheckZeroPayment:' + World.CheckPayment({w:0,s:0},'Tester'),
                '- *CheckMinimalPayment'+World.Sheep()+':' + World.CheckPayment({w:0,s:1},'Tester'),
                '- '+(testvalues?'*TestFinReport is '+t_TestFinReport:'TestFinReport is off'),
                'o Tester.FinanceSystem o:o'
            ]);
            if ( !World.CheckPayment({w:0,s:0},'Tester') ) testpass = false;
            if ( !World.CheckPayment({w:0,s:1},'Tester') ) testpass = false;
        }
        if (DoTest('res',testname)) // ------------ Resources
        {
            if (testvalues) {
                Industry.BuildCity({name:'Tester.Resources'});
                World.resources.content.Update();
                Industry.GrabResources();
            }
            var t_grabresult = World.resources.idea.Grab();
            ccc([
                '- *Grab idea:', t_grabresult,
                '- Grab content:', World.resources.content.Grab(),
                '- World resources:', World.resources,
                '- City jobs:', World.MrCity() ? World.city.joblist : '--no city--',
                'o Tester.Resources o:o'
            ]);
            if ( !t_grabresult.length ) testpass = false;
        }
        if (DoTest('job',testname)) // ------------ Job
        {
            if (testvalues) {
                if(!World.isReady()) World.Welcome();
                Industry
                    .ScheduleJob('find_idea')
                    .ScheduleJob('find_genius_idea')
                    .ScheduleJob('grow_content');
                World.city
                    .DoJob('find_idea').DoJob('find_idea').DoJob('find_idea').DoJob('find_idea')
                    .DoJob('find_idea').DoJob('find_idea').DoJob('find_idea');
                Industry
                    .DailyJob()
                    .DailyJob()
                    .ScheduleJob('grow_content')
                    .DailyJob();
            }
            ccc([
                '- City:', World.city,
                '- Joblist', World.city.joblist,
                'o Tester.Jobs o:o'
            ]);
        }
        if (DoTest('Doma',testname)) // ------------ Doma
        {
            if (testvalues) {
                Geo.FindHome();
            }
            var t_HomeInspector = Geo.HomeInspector();
            ccc([
                '- *HomeInspector was '+t_HomeInspector,
                '- Doma is '+ Geo.Doma(),
                'o Tester.Doma o:o'
            ]);
            if ( !t_HomeInspector ) testpass = false;
        }


        cc('AE size:'+wow.aer.length);
        cc(wow.aer);
        return 'Tester was '+testpass;
    }

    // ------------ HQ
    
    this.world = world;
    
}
