let unit_matrix = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
];
let my_matrix = [...unit_matrix];
for (let i in unit_matrix) {
    my_matrix[i] = [...unit_matrix[i]];
}
my_matrix[1][1] = 0;
console.log(unit_matrix);
console.log(my_matrix);

