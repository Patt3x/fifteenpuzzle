var y = 0;
var z = 0;
var column = new Array();
var row = new Array();
var moves = 0;

window.onload = function()
{	
	var left = "300px";
	var top = "300px";
	var puzz = $$('div#puzzlearea div');
	var shake = $("shufflebutton");	
	
	puzzleDraw(puzz);
	shake.addEventListener("click",function(){shuffle();},false);

	var options = new Array();//array for blocks with valid moves
	var opt = 0;//option randomly generated
	var prev;

	shuffle();

	function shuffle()
	{
		for(var j = 0; j < 500; j++)
		{
			for(var i = 0; i < puzz.length; i++)
			{
				if((puzz[i].style.top === top && Math.abs(parseInt(puzz[i].style.left) - parseInt(left)) === 100) || (puzz[i].style.left === left && Math.abs(parseInt(puzz[i].style.top) - parseInt(top)) === 100))
				{
					options.push(i);//store the current valid block position in array
					puzz[i].style.backgroundImage = "url('background.jpg')";		
				}
			}
			prev = opt;
			do
			{
				opt = options[Math.floor((Math.random()*options.length)+0)];
			}while(prev == opt);

			move(puzz[opt]);
			moves++;
			($$("h1"))[0].innerHTML = "CSE 190 M Fifteen Puzzle";
			($$("h1"))[0].style.backgroundColor = 'white';
			($$("h1"))[0].style.color = 'black';

		}
	}

	function move(buzz) 
	{
		var templeft = left;
		var temptop = top;

		if((buzz.style.top === top && Math.abs(parseInt(buzz.style.left) - parseInt(left)) === 100) || (buzz.style.left === left && Math.abs(parseInt(buzz.style.top) - parseInt(top)) === 100))
		{
			left = buzz.style.left;
			top = buzz.style.top;

			buzz.style.left = templeft;
			buzz.style.top = temptop;
		}

		if(win() && moves > 3)
		{
			($$("h1"))[0].innerHTML = "CONGRATULATIONS! You've solved it!";
			($$("h1"))[0].style.backgroundColor = 'red';
			($$("h1"))[0].style.color = 'white';
			winDraw(puzz);
		}
	}

	function over(puzz)
	{
			if((puzz.style.top === top && Math.abs(parseInt(puzz.style.left) - parseInt(left)) === 100) || (puzz.style.left === left && Math.abs(parseInt(puzz.style.top) - parseInt(top)) === 100))
			{
				puzz.addClassName('movablepiece');
			}
	}

	function leave(puzz)
	{
		if(!(puzz.style.top === top && Math.abs(parseInt(puzz.style.left) - parseInt(left)) === 100) || !(puzz.style.left === left && Math.abs(parseInt(puzz.style.top) - parseInt(top)) === 100))
			{
				puzz.removeClassName('movablepiece');
			}
	}

	function puzzleDraw(puzz)
	{
		for(var i = 0; i < puzz.length; i++)
		{
			(function()
			{
				var pos = i;
				puzz[i].addEventListener("click",function(){move(puzz[pos]);},false);
				puzz[i].addEventListener("mouseover",function(){over(puzz[pos]);},false);
				puzz[i].addEventListener("mouseleave",function(){leave(puzz[pos]);},false);
			}());

			puzz[i].addClassName('puzzlepiece');

			puzz[i].style.backgroundPosition = ""+(y*100*-1)+"px "+(z*100*-1) + "px";
			puzz[i].style.left = ""+(y*100) + "px";
			column.push(puzz[i].style.left);
			puzz[i].style.top = "" + (z*100) + "px";
			row.push(puzz[i].style.top);

			y++;
			if(y > 3)
			{
				z++;
				y = 0;
			}
		}
	}

	function winDraw(puzz)
	{
		for(var i = 0; i < puzz.length; i++)
		{
			puzz[i].style.backgroundImage = "url('http://tinyurl.com/pmuagb7')";
		}
	}

	function win()
	{
		for(var i = 0; i < puzz.length; i++){
			if(puzz[i].style.left != column[i] || puzz[i].style.top != row[i])
			{
				return false;
			}
		}
		return true;
	}
}