var matrix_int = [
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0]];

var matrix_step = [
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0]];

var matrix_doc = document.getElementById('matrix');

var status_play = -1; // 0 игра началась (старт), 1 игра закончилась (Вы выиграли или проиграли);

var status_activity = -1; // 0 обычный ход, 1 предположение где мина;

var start_step = 0; // 0 первыйх ход

var progress_bar_game = 10;

start()

function display(){
	matrix_doc.innerHTML = ""
	//document.getElementById('progress_bar_game').innerHTML = progress_bar_game;
	display_bar_game();
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
			if ( matrix_step[i][j] == '*' ) {
				if ( matrix_int[i][j] == 0)
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + j + '"></div>';
				else
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + j + '">' + matrix_int[i][j] + '</div>';
			} else if ( matrix_step[i][j] == '?' )
					matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '">?</div>';		
			else
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '"></div>';
		}
	}
}

function display_loss(){
	matrix_doc.innerHTML = ""
	//document.getElementById('progress_bar_game').innerHTML = progress_bar_game;
	display_bar_game();
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
			if ( matrix_int[i][j] == '*') {
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '">' + matrix_int[i][j] + '</div>';
			} else
				matrix_doc.innerHTML += '<div class="cell_step" id="' + i + j + '"></div>';
		}
	}
}

function display_finish(){
	matrix_doc.innerHTML = ""
	document.getElementById('progress_bar_game').innerHTML = 0;
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
			if ( matrix_step[i][j] == '*' ) {
				if ( matrix_int[i][j] == 0)
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + j + '"></div>';
				else
					matrix_doc.innerHTML += '<div class="cell_step" id="' + i + j + '">' + matrix_int[i][j] + '</div>';
			} else
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '">' + matrix_int[i][j] + '</div>';
		}
	}
}

function display_baner(str_baner){
	document.getElementById('baner').innerHTML = str_baner;
	document.getElementById('baner').style.visibility = "visible";
}

function display_bar_game(){
	var flag = 0;
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
			if ( matrix_step[i][j] == '?' )
				flag++;
		}
	}
	progress_bar_game = 10 - flag;
	document.getElementById('progress_bar_game').innerHTML = progress_bar_game;
}

function fill(i, j) {
	i = parseInt(i); j = parseInt(j);
	if ( matrix_step[i][j] != '*' ) {
		matrix_step[i][j] = '*';
		if ( matrix_int[i][j] == 0 ) {
			if ( (i-1) >= 0 && (i-1) < 9 && (j-1) >= 0 && (j-1) < 9) {
				fill((i-1), (j-1));
			}
			if ( (i-1) >= 0 && (i-1) < 9 && (j) >= 0 && (j) < 9) {
				fill((i-1), j);
			} 
			if ( (i-1) >= 0 && (i-1) < 9 && (j+1) >= 0 && (j+1) < 9) {
				fill((i-1), (j+1));
			} 
			if ( i >= 0 && i < 9 && (j-1) >= 0 && (j-1) < 9) {
				fill(i, (j-1));
			}
			if ( i >= 0 && i < 9 && (j+1) >= 0 && (j+1) < 9) {
				fill(i, (j+1));
			} 
			if ( (i+1) >= 0 && (i+1) < 9 && (j-1) >= 0 && (j-1) < 9) {
				fill((i+1), (j-1));
			} 
			if ( (i+1) >= 0 && (i+1) < 9 && j >= 0 && j < 9) {
				fill((i+1), j);
			} 
			if ( (i+1) >= 0 && (i+1) < 9 && (j+1) >= 0 && (j+1) < 9) {
				fill((i+1), (j+1));
			} 
		}
	}
}

function rand() {
	var i = 0;
	do {
		var a = Math.floor(Math.random() * 9);
		var b = Math.floor(Math.random() * 9);
		if (matrix_int[a][b] != '*') {
			matrix_int[a][b] = '*';
			i++;
		}
	} while (i < 10)
}

function counting(){
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
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
	for( var i = 0; i < 9; i++ ) {
		for( var j = 0; j < 9; j++ ) {
			if ( matrix_step[i][j] == '*' )
				flag++;
		}
	}
	return(flag);
}

function start() {
	matrix_int = [
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0]];
	matrix_step = [
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0]];
	status_play = 0;
	status_activity = 0;
	start_step = 0;
	progress_bar_game = 10;
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
		if (status_activity == 0) {
			if (matrix_int[ a[0] ][ a[1] ] == '*') {
				if ( start_step == 0 ) {
					start();
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
				if (check() == 71) {
					status_play = 1;
					display_baner("Вы выиграли!");
					display_finish();
				}
			}
			else {
				start_step = 1;
				matrix_step[a[0]][a[1]] = '*';
				display();
				if (check() == 71) {
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

reload.onclick = function() {
	start();
}






























