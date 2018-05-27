var IndustryTester = function(testname,testvalues) {
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
            '- contacts:', World.contacts,
            '- *'+World.name + '/' + Chromosome.name,
            'o Tester.ApplyChromosome o:o'
        ]);
        if ( World.name != Chromosome.name ) testpass = false;
        if ( !World.landmarks.index ) testpass = false;
        if ( !World.contacts.roof ) testpass = false;
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
    if (DoTest('prod',testname)) // ------------ Products
    {
        if (testvalues) {
            if(!World.isReady()) World.Welcome();
            World.city.EmptyStorage();
        }
        World.city
            .StoreProduct('test1')
            .StoreProduct('test2')
            .EmptyStorage()
            .StoreProduct('test1');
        ccc([
            '- *Has product:'+ World.city.HasProduct('test1'),
            '- *Dont Has product:'+ !World.city.HasProduct('test_not_registered'),
            '- City products:', World.city.products,
            'o Tester.Products o:o'
        ]);
        if ( !World.city.HasProduct('test1') ) testpass = false;
        if ( World.city.HasProduct('test_not_registered') ) testpass = false;
    }
    if (DoTest('life',testname)) // ------------ Life process
    {
        if (testvalues) {
            World
                .Welcome()
                .GoodMorning()
                .ConquerResource('content')
                .GoodMorning();
        }
        ccc([

            'o Tester.LifeProcess o:o'
        ]);
        if ( false ) testpass = false;
    }
    if (DoTest('alljobs',testname)) // ------------ All jobs
    {
        if (testvalues) {
            if(!World.isReady()) World.Welcome();
            cc('# Testing all jobs ....... .. .... ..............');
            for ( var t_alljob_job in World.jobs)
            {
                cc('! test new job '+t_alljob_job);
                World.YouHaveNewJob(t_alljob_job);
            }
            cc('# Testing all job complete .... .. .... ..............');
            for ( var t_alljob_cityjob in World.city.joblist)
            {
                cc('! test job complete '+t_alljob_job);
                World.city.joblist[t_alljob_cityjob].FinishHim();
            }
        }
        ccc([
            '- World.resources:', World.resources,
            '- City.joblist:', World.MrCity() ? World.city.joblist : 'no city',
            '- City.products:', World.MrCity() ? World.city.products : 'no city',
            'o Tester.Alljobs o:o'
        ]);
        if ( false ) testpass = false;
    }
    if (DoTest('call',testname)) // ------------ TEMPLATE
    {
        if (testvalues) {
            World.city.StoreProduct('idea');
            World.contacts.roof.trade_questions[0].answer();
            World.city.EmptyStorage();
            
            cc('# PartyTrade Test');
            World.industry.PartyTrade();
            World.city.StoreProduct('content');
            World.industry.PartyTrade();
            
        }
        ccc([

            'o Tester.contacts o:o'
        ]);
        if ( false ) testpass = false;
    }

    cc('AE size:'+wow.aer.length);
    cc(wow.aer);
    return 'Tester was '+testpass;
}