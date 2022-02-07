var cells = new Array(rows);

for (let x = 0; x < rows; x++) {
    cells[x] = new Array(cellsPerRow);
}

window.onload = function() {
    initalizeDisplay();
    writeSentence(sentence1);
}

function initalizeDisplay() {
    cursor.style.height = input.offsetHeight/rows + "px";
    cursor.style.width = input.offsetWidth/cellsPerRow + "px";
    for (let y = 0; y < rows; y++) {
        let newRow = document.createElement("div");
        let newRowP = document.createElement("p");
        newRow.classList.add("row");
        newRowP.classList.add("row-p");
        newRow.appendChild(newRowP);
        for (let x = 0; x < cellsPerRow; x++) {
            let newCharacter = document.createElement("span");
            newCharacter.classList.add("character");
            newCharacter.style.width = input.offsetWidth/cellsPerRow + "%";
            newRowP.appendChild(newCharacter);
            cells[y][x] = newCharacter;
        }
        input.appendChild(newRow);
    }
}

function writeSentence(sentence) {
    let counter = 0;
    let split = sentence.split('');
    for (let y = 0; y < cells.length; y++) {
        let str = "";
        for (let x = 0; x < cells[y].length; x++) {
            if (split[counter] === undefined) {
                return;
            }
            cells[y][x].innerText = split[counter];
            counter++;
        }
    }
}