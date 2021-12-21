var height = document.getElementById('height');
var mines = document.getElementById('mines');
var sizeCell = document.getElementById('sizeCell');
var gameButtonDoc = document.getElementById("gameButton");

height.oninput = function () {
    mines.max = height.value * height.value;
    document.getElementById("heightDoc").innerHTML = "Размер поля: " + height.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCell.value;
}
mines.oninput = function () {
    document.getElementById("minesDoc").innerHTML = "Колличество мин: " + mines.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCell.value;
}
sizeCell.oninput = function () {
    document.getElementById("sizeDoc").innerHTML = "Размер ячейки в px: " + sizeCell.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCell.value;
}