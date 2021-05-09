window.addEventListener("load", Main_Spring, true);
function Main_Spring() {
	
    var canvas = spring_canvas;
    canvas.onselectstart = function () {return false;};     
    var ctx = canvas.getContext("2d");                      
    var w = canvas.width;                                   
    var h = canvas.height;                                  
	var maze = [
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		[ 3, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1 ],
		[ 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1 ],
		[ 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
		[ 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1 ],
		[ 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 4 ],
		[ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	]
	var position = {
		x: 0,
		y: 0
	};
	var deadlock = false;
	position.x = 1;
	position.y = 0;
	
    function control() {
        calculate();		
        draw();
        requestAnimationFrame(control);
		
    }
    
	control();
	
    function calculate() {                                 
		FindPathThroughtMaze(maze, position);
    }
	
	
    function draw() {

        ctx.clearRect(0, 0, w, h);
		
		for	(let x = 0; x < maze.length; x++) {
			for	(let y = 0; y < maze[x].length; y++) {
				ctx.beginPath();
				ctx.arc(y * 60 + 50, x * 60 + 50 , 15, 0, 2 * Math.PI, false);
				
				switch (maze[x][y]) {
				case 1: 
					ctx.strokeStyle = "#7394cb";
					ctx.fillStyle = 'red';
					break;
				case 2:
					ctx.strokeStyle = "#7394cb";
					ctx.fillStyle = 'green';
					break;
				case 3:
					ctx.strokeStyle = "#7394cb";
					ctx.fillStyle = 'blue';
					break;
  			    case 4:
					ctx.strokeStyle = "#7394cb";
					ctx.fillStyle = 'yellow';
					break;
	
				case 0:
					ctx.strokeStyle = "#7394cb";
					ctx.fillStyle = 'white';
					break;
				}
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.stroke();
				
				
				ctx.beginPath();
				ctx.arc(position.y * 60 + 50, position.x * 60 + 50 , 15, 0, 2 * Math.PI, false);
				ctx.lineWidth = 6;
				ctx.strokeStyle = "green";
				ctx.fillStyle = 'magenta';
				ctx.fill();
				ctx.stroke();	

			}
		}
    }

	function FindPathThroughtMaze(maze, position) {
		
		if (ThisIsTheExit(maze, position)) {
			return true;
		}
		
		if (!deadlock) maze[position.x][position.y] = 2; else maze[position.x][position.y] = 1;
		
		if (MoveLeft(maze, position)) {
			return true;
		}

		if (MoveDown(maze, position)) {
			return true;
		}

		if (MoveRight(maze, position)) {
			return true;
		}
		
		if (MoveUp(maze, position)) {
			return true;
		}
	
		thisIsDeadlock();

	}	


	function thisIsDeadlock() {
		deadlock = true;
	}


	function ThisIsTheExit(maze, position) {
		if (maze[position.x][position.y] == 4) return true; else return false;
	}
	
	function MoveLeft(maze, position) {
		if (position.x + 1 > maze.length) return false;
		if (maze[position.x + 1][position.y] == 1) return false;
		if (maze[position.x + 1][position.y] == 2 && !deadlock) return false;
		position.x++;
		deadlock = false;
		console.log("left");
		return true;
	}
	
	function MoveUp(maze, position) {
		if (position.y - 1 < 0) return false;
		if (maze[position.x][position.y - 1] == 1) return false;
		if (maze[position.x][position.y - 1] == 2 && !deadlock) return false;
		position.y--;
		deadlock = false;
		console.log("Up");
		return true;
	}
	
	function MoveDown(maze, position) {
		if (position.y + 1 > 12) return false;
		if (maze[position.x][position.y + 1] == 1) return false;
		if (maze[position.x][position.y + 1] == 2 && !deadlock) return false;
		position.y++;
		deadlock = false;
		console.log("Down");
		return true;
	}
	
	function MoveRight(maze, position) {
		if (position.x - 1 < 0) return false;
		if (maze[position.x - 1][position.y] == 1) return false;
		if (maze[position.x - 1][position.y] == 2 && !deadlock) return false;
		position.x--;
		deadlock = false;
		console.log("Right");
		return true;
	}
	
}