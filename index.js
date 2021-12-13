let matrix_int = new Array(); //исходногенерируемый массив с палатками
let matrix_step = new Array(); // Запись шагов игрока
var height = 5; //Высота поля начиная от 0 включительно
var width = 5;
var number_mines = 1; //Количество мин
var cell_size = 70; // размер клоток в px

var matrix_doc = document.getElementById('matrix');
var status_play = -1; // 0 игра началась (старт), 1 игра закончилась (Вы выиграли или проиграли);
var status_activity = -1; // 0 обычный ход, 1 предположение где мина;
var start_step = 0; // 0 первыйх ход
var progress_bar_game = number_mines;

start()

function matrixInit() {
    for (var i = 0; i <= height; i++) {
        matrix_int.push([]);
        matrix_step.push([]);
        for (var j = 0; j <= width; j++) {
            matrix_int[i].push(0);
            matrix_step[i].push(0);
        }
    }
}

function initCSS() {
	matrix_doc.style.width = ((cell_size + 2) * width) + 'px';
    matrix_doc.style.height = ((cell_size + 2) * height) + 'px';
	var cellClass = document.getElementsByClassName('cell');
    for (let i = 0; i < cellClass.length; i++) {
        cellClass[i].style.width = cell_size + 'px';
        cellClass[i].style.height = cell_size + 'px';
		cellClass[i].style.fontSize = cell_size * 0.6 + 'pt';
    }
	var cell_stepClass = document.getElementsByClassName('cell_step');
    for (let i = 0; i < cell_stepClass.length; i++) {
        cell_stepClass[i].style.width = cell_size + 'px';
        cell_stepClass[i].style.height = cell_size + 'px';
		cell_stepClass[i].style.fontSize = cell_size * 0.6 + 'pt';
    }
	var cbutton_gameClass = document.getElementsByClassName('button_game');
    for (let i = 0; i < cbutton_gameClass.length; i++) {
        cbutton_gameClass[i].style.width = cell_size + 'px';
        cbutton_gameClass[i].style.height = cell_size + 'px';
		cbutton_gameClass[i].style.fontSize = cell_size * 0.6 + 'pt';
    }
	document.getElementById('progress_bar_game').style.width = (cell_size * 2 )+ 'px';
    document.getElementById('progress_bar_game').style.height = cell_size + 'px';
	document.getElementById('progress_bar_game').style.fontSize = cell_size * 0.6 + 'pt';
}

function display(){
	matrix_doc.innerHTML = "";
	display_bar_game();
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if ( matrix_step[i][j] == '*' ) {
				if ( matrix_int[i][j] == 0)
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + "/" + j + '"></div>';
				else
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + "/" + j + '">' + matrix_int[i][j] + '</div>';
			} else if ( matrix_step[i][j] == '?' )
					matrix_doc.innerHTML += '<div class="cell" id="' + i + "/" + j + '">?</div>';		
			else
				matrix_doc.innerHTML += '<div class="cell" id="' + i + "/" + j + '"></div>';
		}
	}
	initCSS();
}

function display_loss(){
	matrix_doc.innerHTML = "";
	display_bar_game();
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if ( matrix_int[i][j] == '*') {
				matrix_doc.innerHTML += '<div class="cell" id="' + i + "/" + j + '">' + matrix_int[i][j] + '</div>';
			} else
				matrix_doc.innerHTML += '<div class="cell_step" id="' + i + "/" + j + '"></div>';
		}
	}
	initCSS();
}

function display_finish(){
	matrix_doc.innerHTML = ""
	document.getElementById('progress_bar_game').innerHTML = 0;
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if ( matrix_step[i][j] == '*' ) {
				if ( matrix_int[i][j] == 0)
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + "/" + j + '"></div>';
				else
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + "/" + j + '">' + matrix_int[i][j] + '</div>';
			} else
				matrix_doc.innerHTML += '<div class="cell" id="' + i + "/" + j + '">' + matrix_int[i][j] + '</div>';
		}
	}
	initCSS();
}

function display_baner(str_baner){
	banerDoc = document.getElementById('baner');
	banerDoc.innerHTML = str_baner;
	banerDoc.style.width = cell_size * 3 + "px";
	banerDoc.style.height = cell_size * 1.4 + "px";
	banerDoc.style.fontSize = cell_size * 0.5 + "px";
	banerDoc.style.top = ((parseInt(matrix_doc.style.height) / 2) + parseInt(banerDoc.style.height)) * (-1) + "px";
    banerDoc.style.left = ((parseInt(matrix_doc.style.width) / 2) - (parseInt(banerDoc.style.width) / 2)) + "px";
	banerDoc.style.visibility = "visible";
}

function display_bar_game(){
	var flag = 0;
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if ( matrix_step[i][j] == '?' )
				flag++;
		}
	}
	progress_bar_game = number_mines - flag;
	document.getElementById('progress_bar_game').innerHTML = progress_bar_game;
}

function fill(i, j) {
	i = parseInt(i); j = parseInt(j);
	if ( matrix_step[i][j] != '*' ) {
		matrix_step[i][j] = '*';
		if ( matrix_int[i][j] == 0 ) {
			if ( (i-1) >= 0 && (i-1) < width && (j-1) >= 0 && (j-1) < height) {
				fill((i-1), (j-1));
			}
			if ( (i-1) >= 0 && (i-1) < width && (j) >= 0 && (j) < height) {
				fill((i-1), j);
			} 
			if ( (i-1) >= 0 && (i-1) < width && (j+1) >= 0 && (j+1) < height) {
				fill((i-1), (j+1));
			} 
			if ( i >= 0 && i < width && (j-1) >= 0 && (j-1) < height) {
				fill(i, (j-1));
			}
			if ( i >= 0 && i < width && (j+1) >= 0 && (j+1) < height) {
				fill(i, (j+1));
			} 
			if ( (i+1) >= 0 && (i+1) < width && (j-1) >= 0 && (j-1) < height) {
				fill((i+1), (j-1));
			} 
			if ( (i+1) >= 0 && (i+1) < width && j >= 0 && j < height) {
				fill((i+1), j);
			} 
			if ( (i+1) >= 0 && (i+1) < width && (j+1) >= 0 && (j+1) < height) {
				fill((i+1), (j+1));
			} 
		}
	}
}

function rand() {
	var i = 0;
	do {
		var a = Math.floor(Math.random() * height);
		var b = Math.floor(Math.random() * width);
		if (matrix_int[a][b] != '*') {
			matrix_int[a][b] = '*';
			i++;
		}
	} while (i < number_mines)
}

function counting(){
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if (matrix_int[i][j] != '*'){				
				flag = 0;
				try {
					if (matrix_int[i-1][j-1] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i-1][j] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i-1][j+1] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i][j-1] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i][j+1] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i+1][j-1] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i+1][j] == '*')
						flag++;
				} catch(e) {}
				try {
					if (matrix_int[i+1][j+1] == '*')
						flag++;
				} catch(e) {}
				matrix_int[i][j] = flag;
			}
		}
	}
}

function check() {
	var flag = 0;
	for( var i = 0; i < height; i++ ) {
		for( var j = 0; j < width; j++ ) {
			if ( matrix_step[i][j] == '*' )
				flag++;
		}
	}
	return(flag);
}

function start() {
	matrixInit();
	status_play = 0;
	status_activity = 0;
	start_step = 0;
	progress_bar_game = number_mines;
	rand();
	counting();
	display();
	console.log(matrix_int);
	document.getElementById('baner').style.visibility = "hidden";
	document.getElementById('mina').innerHTML = "?";
}

matrix_doc.onclick = function(event) {
	if (status_play == 0) {
		var a = event.target.id;
		a.toString();
		a = a.split('/');
		if (status_activity == 0) {
			if (matrix_int[ a[0] ][ a[1] ] == '*') {
				if ( start_step == 0 ) {
					location.reload();
				} else {
					status_play = 1;
					display_baner("Вы проиграли!");
					display_loss();
				}
			} 
			else if (matrix_int[a[0]][a[1]] == 0) {
				start_step = 1;
				fill(a[0], a[1]);
				display();
				if (check() == (width * height) - number_mines) {
					status_play = 1;
					display_baner("Вы выиграли!");
					display_finish();
				}
			}
			else {
				start_step = 1;
				matrix_step[a[0]][a[1]] = '*';
				display();
				if (check() == (width * height) - number_mines) {
					status_play = 1;
					display_baner("Вы выиграли!");
					display_finish();
				}
			}
		} 
		else {
			if (matrix_step[a[0]][a[1]] == '?') {
				matrix_step[a[0]][a[1]] = 0;
				progress_bar_game += 1;
			}
			else if (matrix_step[a[0]][a[1]] == 0) {
				matrix_step[a[0]][a[1]] = '?';
				progress_bar_game -= 1;
			}
			display();
		}
	}
}

mina.onclick = function() {
	if (status_activity == 0) {
		status_activity = 1;
		document.getElementById('mina').innerHTML = "*";
	} else if (status_activity == 1) {
		status_activity = 0;
		document.getElementById('mina').innerHTML = "?";
	}
}

matrix_doc.oncontextmenu = function(event) {
	if (status_play == 0) {
		var a = event.target.id;
		a.toString();
		a = a.split('/');
		if (matrix_step[a[0]][a[1]] == '?') {
			matrix_step[a[0]][a[1]] = 0;
			progress_bar_game += 1;
		}
		else if (matrix_step[a[0]][a[1]] == 0) {
			matrix_step[a[0]][a[1]] = '?';
			progress_bar_game -= 1;
		}
		display();
		return false;
	}
}

reload.onclick = function() {
	location.reload();
}






























