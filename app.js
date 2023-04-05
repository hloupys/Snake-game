function AllComplite(){
var snake = [
	{ x: 10, y: 10},
	{ x: 11, y: 10},
];

function main()
{
	update();
	draw();
	food();

	setTimeout(() => {
		window.requestAnimationFrame(main);
	}, 250);
}

window.requestAnimationFrame(main);
var error = null;
function update()
{
	var temp = JSON.parse(JSON.stringify(snake));
	for(var i = 1;i < snake.length; i++){
		snake[i] = JSON.parse(JSON.stringify(temp[i-1]));
	}
	var k = keys()
	if(k==null)
	{
		k={x: 0, y: -1};
	}
	snake[0].x = snake[0].x + k.x;
	snake[0].y = snake[0].y + k.y;
	error=gameover();
	if(error)
	{
		alert("Game Over, You loose");
		window.location.reload();
	}
}

var a = null;
let previouskey = "Up";
window.addEventListener("keydown", (e) => 
	{
	switch (true)
		{
			case e.key=="ArrowUp" && previouskey!="Up" && previouskey!="Down":
					previouskey="Up"
				a = {x:0 ,y: -1};
				break;
			case e.key=="ArrowDown" && previouskey!="Up" && previouskey!="Down":
				previouskey="Down"
				a = {x:0 ,y: 1};
				break;
			case e.key=="ArrowLeft" && previouskey!="Left" && previouskey!="Right":
				previouskey="Left"
				a = {x:-1 ,y: 0};
				break;
			case e.key=="ArrowRight" && previouskey!="Left" && previouskey!="Right":
				previouskey="Right"
				a = {x:1 ,y: 0};
				break;
		}

	})
function keys()
{
	return a;
}

function draw(){
	var grid = document.getElementById("grids");
	grid.innerHTML = "";
	snake.forEach((seg) => {
		var div = document.createElement("div");
		div.style.gridRowStart = seg.y;
		div.style.gridColumnStart = seg.x;
		div.classList.add("snake");
		
		grid.appendChild(div);
	})
}

function drawfood(i)
{
	var grid = document.getElementById("grids");
	var div = document.createElement("div");
	div.style.gridRowStart = i.x;
	div.style.gridColumnStart = i.y;
	div.classList.add("apple");
	var elements = document.querySelector(".apple");
	if (elements != null)
	{ 
		elements.parentElement.removeChild(elements);
	}
	grid.appendChild(div);
}

var winc = null;
let initilposition = rendompos();
function food()
{
	drawfood(initilposition);

	if(snakeonfood(initilposition))
	{
		initilposition = rendompos();
		drawfood(initilposition)
		var temp = JSON.parse(JSON.stringify(snake[snake.length-1]))
		snake.push(temp);
		winc=WinCheck();
	}
}
function rendompos()
{
	var a = {};
	var x = Math.floor(Math.random()*19 + 1)
	var y = Math.floor(Math.random()*19 + 1)
	a.x = x;
	a.y = y;
	while(snakeonfood(a))
	{
		x = Math.floor(Math.random()*19 + 1)
		y = Math.floor(Math.random()*19 + 1)
		a.x = x;
		a.y = y;
	}
	return a;
}

function gameover()
{
	var headx = snake[0].x;
	var heady = snake[0].y;
	if(snake.length == 1)
	{
		if(headx < 1 || headx > 20 || heady < 1 || heady > 20)
		{
			return true;
		}
	}
	for(var i = 1; i<snake.length;i++)
	{
		if(snake[i].x == headx && snake[i].y == heady || headx < 1 || headx > 20 || heady < 1 || heady > 20)
		{
			return true;
		}
	}
	return false;
}
var win = 0;
function WinCheck()
{
	win=win+1;
	console.log(win);
	if(win == 20)
	{
		alert("Game Over, You win");
		window.location.reload();
	}
	return false;
}

function snakeonfood(i)
{
	var a = "";
	snake.some((seg)=>
	{
		if(seg.x == i.y && seg.y == i.x)
		{
			a = "yes";
		}
	});
	if(a=="yes"){
		return true;
	}
 	return false	
}
}