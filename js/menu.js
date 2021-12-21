function sizeGame() {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    mines.max = height.value * height.value;
    document.getElementById("heightDoc").innerHTML = "Размер поля: " + height.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}
function sizeMine() {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    document.getElementById("minesDoc").innerHTML = "Колличество мин: " + mines.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}
function sizeCell() {
    height = document.getElementById("height");
    mines = document.getElementById("mines");
    sizeCellDoc = document.getElementById("sizeCell");
    gameButtonDoc = document.getElementById("gameButton");
    document.getElementById("sizeDoc").innerHTML = "Размер ячейки в px: " + sizeCellDoc.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&mines=" + mines.value + "&size=" + sizeCellDoc.value;
}