// в Chromosome содержатся данные для рождения нового мира
// хранится в файле chromosome.js
var Chromosome = new WorldChromosome();


// рождается новый мир World
var World = new KingWorld(Chromosome);
function KingWorld(chromosome) {
    this.chromosome = chromosome;
    this.name = 'newborn_world'; // имя - признак существования
    this.age = 0;                // возраст - признак видимости
}


// первый принц



/*

    this.ApplyChromosome = function() {
        this.name = this.chromosome.world.name;
        return this;
    };
    this.ApplyChromosome();

*/