const table = document.querySelector('.table');
const tr = document.querySelector('.tr');
const td = document.querySelector('.td');
const btn = document.querySelector('.click');
let countClick = 0;
const COLORS = ['yellow', 'orange', 'red', 'green'];
const MATRIX = [];
const X = 'data-coordinate-x';
const Y = 'data-coordinate-y';

btn.addEventListener('click', clearTable);
table.addEventListener('click', (event) => {
    //console.log(event)
    if (event.target.dataset.table != 'td') {
        return;
    }
    const X = event.target.dataset.coordinateX;
    const Y = event.target.dataset.coordinateY;
    const currentIndexColor = COLORS.indexOf(MATRIX[+X][+Y]);
    MATRIX[+X][+Y] = getNextColor(COLORS, currentIndexColor);
    iterateCells(X, Y)
    draw();

});

function iterateCells(X, Y) {
    // console.log(MATRIX)
    console.log(X, Y)
    if (+X > 0) {
        let i = +X;

        while (i > 0) {
            MATRIX[i - 1][Y] = getNextColor(COLORS, COLORS.indexOf(MATRIX[i][Y]));
            // console.log(i - 1, Y)
            i--;
        }
    }
    if (+X < MATRIX.length) {
        i = +X;
        while (i + 1 < MATRIX.length) {
            console.log(i + 1, Y)

            MATRIX[i + 1][Y] = getNextColor(COLORS, COLORS.indexOf(MATRIX[i][Y]));
            //console.log(Y,i + 1)
            i++;
        }
    }
    if (+Y > 0) {
        let j = +Y;
        while (j > 0) {
            MATRIX[X][j - 1] = getNextColor(COLORS, COLORS.indexOf(MATRIX[X][j]));
            // console.log(X, j - 1)
            j--;
        }
    }
    if (+Y < MATRIX.length) {
        j = +Y;
        while (j + 1 < MATRIX.length) {
            MATRIX[X][j + 1] = getNextColor(COLORS, COLORS.indexOf(MATRIX[X][j]));
            // console.log(X, j + 1)
            j++;
        }
    }

}

function getNextColor(arr, currentIndex) {
    //console.log(arr, currentIndex)
    return arr[currentIndex === -1 || currentIndex + 1 >= arr.length ? 0 : currentIndex + 1];
}

function clearTable(event) {
    table.innerHTML = '';
    MATRIX.length = 0;
    generationMatrix(10, 10, table);

}

function draw() {
    MATRIX.forEach((tr, i) => {
        tr.forEach((td, j) => {
            //console.log(MATRIX)
            const cell = table.querySelector(`[${X}="${i}"][${Y}="${j}"]`);
            cell.className = '';
            cell.classList.add(td)
        })
    })
}

function generationMatrix(line, column, table) {
    for (let i = 0; i < line; i++) {
        let tr = document.createElement('div');
        tr.classList.add('tr');
        MATRIX[i] = [];
        for (let j = 0; j < column; j++) {
            let td = document.createElement('div');
            td.dataset.coordinateY = j;
            td.dataset.coordinateX = i;
            td.dataset.table = 'td';
            MATRIX[i].push('empty');
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
}
generationMatrix(10, 10, table);
//console.log(MATRIX);


