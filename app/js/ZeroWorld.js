function KingWorld (chromosome) {

    this.Welcome = function() {
        this.land.Welcome();
        this.industry.Welcome();
        cc('# World, welcome!');
        return this;
    }
    this.ProductDelivery = function(id) {
        cc('XOXOX ProductDelvery');
        return this;
    }
    this.ResourceUpdate = function(resource,rule) {
        cc('XOXOX ResourceUpdate');
        return this;
    }
    
    // ------------ Lords
    
    this.industry = new WorldIndustry(this);
    this.land = new WorldLandlord(this);
    this.city = false;
    this.MrCity = function(){ return this.city; };
    

    // ------------ Services
    
    this.isAlive = function() { return this.chromosome ? true : false }
    
    // ------------ HQ
    
    this.name = 'KingWorld';
    this.chromosome = false;
    
    this.landmarks = {};
    this.jobs = {};
    
    // ============ KingWorld coronation ceremony ============
   
    this.industry.ApplyChromosome(chromosome);
    ccc([
        'name: '+this.name,
        'alive: '+this.isAlive(),
        'o New World was born == o =='
    ]);

}
