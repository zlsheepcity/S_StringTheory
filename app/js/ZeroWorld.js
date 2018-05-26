function KingWorld (chromosome) {

    this.Welcome = function() {
        cc('wwwwwwwwwwwwwwwwww World, Welcome! wwwwwwwwwwwwwwwwww');
        this.land.Welcome();
        this.industry.Welcome();
        cc('wwwwwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwwwwww');
        return this;
    }
    this.GoodMorning = function() {
        this.industry.GoodMorning();
        return this;
    }
    this.ProductDelivery = function(product) {
        this.industry.ProductDelivery(product);
        return this;
    }
    this.ConquerResource = function(resource) {
        this.industry.UpdateResource(resource,1);
        return this;
    }
    this.UpdateResource = function(resource,rule) {
        this.industry.UpdateResource(resource,rule);
        return this;
    }
    this.ConnectWifi = function(wifi) {
        this.industry.ConnectWifi(wifi);
        return this;
    }
    this.DoPayment = function(cost,official) {
        this.industry.DoPayment(cost,official);
        return this;
    }
    this.YouHaveNewJob = function(jobname) {
        this.industry.ScheduleJob(jobname);
        return this;
    }

    // ------------ Lords
    
    this.industry = new WorldIndustry(this);
    this.land = new WorldLandlord(this);
    this.city = false;
    this.MrCity = function(){ return this.city; };
    

    // ------------ Services
    
    this.isAlive = function() { return this.chromosome ? true : false }
    this.isReady = function() { return this.city ? true : false }
    this.Wifi = function() { return this.wifi }
    this.Sheep = function() { if (!this.sheep) this.sheep = 1; return this.sheep }
    this.CheckPayment = function(cost,official) {
        return this.industry.CheckPayment(cost,official); 
    }
    this.StatusReport = function() {
        var report = {
            Day: this.day,
            Wifi: this.Wifi(),
            AvailableResources: this.industry.ListOfConqueredResources(),
            CityJobs: this.MrCity() ? this.city.joblist : 'no-city',
            CityProducts: this.MrCity() ? this.city.products : 'no-city',
        };
        cc('o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o StatusReport o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o');
        for ( var report_print in report ) {
            cc('- '+report_print+':');
            cc(report[report_print]);
        }
        cc('o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o⋅o');
        return report;
    }

    // ------------ HQ
    
    this.name = 'KingWorld';
    this.day = 0;
    this.wifi = 0;
    this.sheep = 1;
    this.chromosome = false;
    
    this.landmarks = {};
    this.resources = {};
    this.jobs = {};
    
    // ============ KingWorld coronation ceremony ============
   
    this.industry.ApplyChromosome(chromosome);
    ccc([
        'name: '+this.name,
        'alive: '+this.isAlive(),
        'o New World was born == o =='
    ]);

}
