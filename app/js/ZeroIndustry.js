function WorldIndustry (world) {

    this.Welcome = function() {
        this.BuildCity();
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
    
    this.BuildCity = function(){
        var dna = this.world.chromosome.city;
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
        this.world.chromosome = dna;
        cc('--- New chromosome from '+dna.name);
        return this;
    }

    
    // ------------ Services
    
    this.Tester = function(testname,testvalues) {
        var testpass = true;
        var DoTest = function(test,request){
            if (request==='all'||request===9) return true;
            return test === request;
        }
        if (DoTest('Job',testname)) // ------------ Job
        {
            if (testvalues) {
                Industry.BuildCity();
                Industry.TakeJob('find_idea');
                Industry.TakeJob('find_genius_idea');
            }
            ccc([
                '- City/Freeze:', World.city,
                '- Jobs', World.city.joblist,
                'o Tester.Job o:o'
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
        return 'Tester was '+testpass;
    }

    // ------------ HQ
    
    this.world = world;
    
}
