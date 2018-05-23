# Description of products

resource → job
job + cost → product
cost = wifi/sheep/days/dependencies

# World



# Description of daily process

// job planning

Industry.GatherResources()
    World.resources
    Industry.IsResourceAdopted(id)
    WorldResource.Grab()
    Industry.make_array_summ(a,b)
    City.TakeThisJoblist(joblist)


    --- City.ResetResources(name)

// job execution

Industry.DoDailyJob()
    City.DoJobList()
        City.DoJob(id)

// job results

## Industry

GatherResources()
IsResourceAdopted(id)

## City

ResetResources(name)
ClearResources()
AddResources()

City.products
AddProducts()
ClearProducts()

## World

World.resources
World.jobs


### WorldResource

Grab()
Update()
Destroy()
Mapping(truefalse)

### WorldJob

finish()


jobs: [
    {
        name:'grow_content',
        cost: { days:1 },
        finish:function(){cc('-- new content');City.AddResources('content');}
    },
],