// � Chromosome ���������� ������ ��� �������� ������ ����
// �������� � ����� chromosome.js
var Chromosome = new WorldChromosome();


// ��������� ����� ��� World
var World = new KingWorld(Chromosome);
function KingWorld(chromosome) {
    this.chromosome = chromosome;
    this.name = 'newborn_world'; // ��� - ������� �������������
    this.age = 0;                // ������� - ������� ���������
}


// ������ �����



/*

    this.ApplyChromosome = function() {
        this.name = this.chromosome.world.name;
        return this;
    };
    this.ApplyChromosome();

*/