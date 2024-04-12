spiralTraverse = (matrix,func=()=>{}) => {
const rowsCount = matrix.length;
const columnsCount = matrix[0].length;
if(matrix.some(row=>row.length!==columnsCount)) {
 throw new Error('Every row in the matrix must have the same length');
};
for(let k=0;k<=(Math.min(rowsCount, columnsCount)-1)/2;k++){
    const iLast = rowsCount - k - 1;
    const jLast = columnsCount - k - 1;

    for(let j=k; j<=jLast; j++) func(k,j);

    for(let i=k+1; i<=iLast; i++) func(i,jLast);

    if (iLast > k) for(let j=jLast-1; j>=k; j--) func(iLast,j);
    
    if (jLast > k) for(let i=iLast-1; i>k; i--) func(i,k);
}};
console.log('Spiral Traverse--------------');
((matrix) => spiralTraverse(matrix, (i, j)=>console.log(matrix[i][j])))([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
    [17,18,19,20]
]);
