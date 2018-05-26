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
    this.TakeJob = function(jobname){
        var job = this.world.jobs[jobname];
        this.world.city.TakeJob(job);
        return this;
    }
    this.DoDailyJob = function(){
        // XOXOXO
        return this;
    }
    
    // ------------ Masters
    
    this.BuildCity = function(dna){
        this.world.city = new WorldCity(dna);
        this.world.MrCity().Welcome();
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
    
    // ------------ Tester
    
    this.Tester = function(testname,testvalues) {
        var testpass = true;
        var DoTest = function(test,request){
            if (request==='all'||request===9) return true;
            return test === request;
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
        if (DoTest('Jobs',testname)) // ------------ Job
        {
            if (testvalues) {
                Industry.BuildCity();
                Industry.TakeJob('find_idea');
                Industry.TakeJob('find_genius_idea');
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
        
        cc('AE size:'+wow.aer.length);
        cc(wow.aer);
        return 'Tester was '+testpass;
    }

    // ------------ HQ
    
    this.world = world;
    
}
