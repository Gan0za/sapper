var height = document.getElementById('height');
var mines = document.getElementById('mines');
var sizeCell = document.getElementById('sizeCell');

height.oninput = function () {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    mines.max = height.value * height.value;
    document.getElementById("heightDoc").innerHTML = "Размер поля: " + height.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}
mines.oninput = function () {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    document.getElementById("minesDoc").innerHTML = "Колличество мин: " + mines.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}
sizeCell.oninput = function () {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    document.getElementById("sizeDoc").innerHTML = "Размер ячейки в px: " + sizeCellDoc.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}