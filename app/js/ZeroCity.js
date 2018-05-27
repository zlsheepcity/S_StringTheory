function WorldCity(dna) {
    
    this.name = dna && dna.name ? dna.name : 'Index City';
    this.homeplace = dna && dna.homeplace ? dna.homeplace : 'index';
    this.joblist = {};
    this.products = [];
    
    this.Welcome = function() {
        cc('# City, welcome!');
        return this;
    }

    // ------------ ProductCenter

    this.StoreProduct = function(product) {
        this.products.push(product)
        return this;
    }
    this.EmptyStorage = function() {
        this.products = [];
        return this;
    }
    this.HasProduct = function(product) {
        var result =
            product
            && this.products
            && this.products.length
            && this.products.indexOf(product) >= 0
            ? true
            : false
            ;
        return result;
    }

    // ------------ TradeCenter

    this.TradeProduct = function(product,price) {
        if( !this.HasProduct(product) ) {
            cc('--- No trade for '+product);
            return false;
        }
        var wifi = price && price.wifi ? price.wifi : 0 ;
        return this.ConnectWifi(wifi,{reason:'TradeProduct',product:product});
    }

    // ------------ JobCenter

    this.DoYourJob = function() {
        for ( var jobname in this.joblist )
            this.DoJob(jobname);
        return this;
    }
    this.TakeJob = function(job) {
        if (!job || !job.name) return wow.ae('City.TakeJob: not a {job}',job);
        if ( this.joblist[job.name] && this.joblist[job.name].Report() ) {
            cc('--- Already in progress '+job.name);
            return this;
        }
        this.joblist[job.name] = new WorldJob(job);
        return this;
    }
    this.DoJob = function(jobname) {
        if (!this.ConfirmJobname(jobname) ) return this;
        var payment = this.DoPayment(
            this.joblist[jobname].cost,
            {reason:'CityJob',jobname:jobname}
        );
        if (!payment && !payment.confirmed) return this;
        // Start working
        var progress = this.joblist[jobname].UpdateProgress();
        if (progress==='complete') this.RemoveJob(jobname);
        return this;
    }
    this.RemoveJob = function(jobname) {
        if ( this.joblist[jobname] ) this.joblist[jobname] = false;
        return this;
    }
    this.ConfirmJobname = function(jobname) {
        if(!jobname) return false;
        if(!this.joblist[jobname]) return false;
        if(!this.joblist[jobname].Report()) return false;
        return true;
    }

    // ------------ Bank
    
    this.CheckPayment = function(dwsr_cost,official) {
        var answer = true;
        // dwsr_cost.d always true
        if ( dwsr_cost.w && dwsr_cost.w*1 > World.Wifi(this.name)*1 ) answer = false;
        if ( dwsr_cost.s && dwsr_cost.s*1 > World.Sheep(this.name)*1 ) answer = false;
        // dwsr_cost.r is ignored
        // official bourocracy is ignored
        return answer;
    }
    this.DoPayment = function(dwsr_cost,official) {
        if (!this.CheckPayment(dwsr_cost,official)) return false;
        var bank_backup = {
            w:World.Wifi(this.name),
            s:World.Sheep(this.name),
        };
        // bank operations
        if ( dwsr_cost.w && dwsr_cost.w > 0 ) World.wifi = World.wifi - 1*dwsr_cost.w;
        if ( dwsr_cost.s && dwsr_cost.s > 0 ) World.sheep = World.sheep - 1*dwsr_cost.s;
        // bank report
        var bank_report = [
            dwsr_cost, official, '- bank nackup:', bank_backup,
            'DoPayment.report'
        ];
        return {confirmed:true,dwsr_cost:dwsr_cost,official:official};
    }
    this.ConnectWifi = function(wifi,official) {
        if (!wifi || wifi < 1) return false;
        // bank operations
        World.wifi = World.wifi + 1*wifi;
        // bank report - no reports for connections
        return true;
    }
    
    
    // ------------ Born process
    
    cc('--- New City '+this.name);
}
