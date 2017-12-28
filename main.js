//Player have only hints to know which shelf he is in help:quotes

//
function Player(p_name,p_age)
{
	this.name = p_name;
	this.age = p_age;
	this.energy = 100;//2d array for position
	this.correct_ans=0;
	this.decrement_time = function()
	{
		this.energy--
	}
}
class Area
{
	constructor(area_id,name,message,North_can,South_can,West_can,East_can)
	{
		this.area_id = area_id
		this.name = name
		this.message = message
		
		//the user can move ...?
		this.North_can = North_can
		this.South_can = South_can
		this.West_can = West_can
		this.East_can = East_can
		
		this.need_to_buy = false
		this.bought_chosen = false
	}
	
	add_item(item_ref)
	{
		this.Items_on_shelf.push(item_ref)
	}
	
}


function generate_random()
{
	var count_r1 = 0 ;
    var RandomArray = new Array(0,1,2,3,4,5,6,7);
	var ques_arr = new Array();
	
	for (count_r = 0 ; count_r1 < 3 ; count_r++)
	{
		
		var random = Math.floor(Math.random() * 7)  +1  ;
		console.log("generated" +random)
		
		if (random == RandomArray[random]) 
		{
			ques_arr.push(random)
			delete RandomArray[random]
			count_r1 = count_r+1
		}
	}
	console.log(ques_arr[0])
	console.log(ques_arr[1])
	console.log(ques_arr[2])
	
	return ques_arr
}

	//Setting areas
	var Area_arr = new Array(3)
	for (i=0;i<3;i++)
	{
		Area_arr[i] = new Array(3)
	}

	Area_arr[1][0] = new Area(0,"Entrance","Welcome to ...THE.. supermarket",true,false,true,true)
	Area_arr[1][0].bought_chosen = true
	
	Area_arr[0][0] = new Area(1,"Chocolates","Tasty,Yummy,Fluffy,Nutty\nStuff yourself with tasty and yummy,\ndessert that's so fluffy and nutty!",true,false,false,true)
	Area_arr[0][1] = new Area(2,"Alcoholic drinks","Ho!Ho!Ho! To the bottle I go \nTo heal my heart and drown my woe\nRain may fall,and wind may blow\nAnd many miles be still to go\nBut under a tall tree will I lie",true,true,false,true)
	Area_arr[0][2] = new Area(3,"Shampoo","You need me every morning and when you come home.",false,true,false,false)
	Area_arr[1][1] = new Area(4,"Books","Yadyreve uoy etirw on em",false,true,true,true)
	Area_arr[2][0] = new Area(5,"Pie","3.14",true,false,true,false)
	Area_arr[2][1] = new Area(6,"T-Shirt","I'm all the time glued on you",true,true,true,false)
	Area_arr[2][2] = new Area(7,"Water","I am life",false,true,false,false)
	
	var ques_num_arr
	
	//player variables
	var my_player
	var x_coord
	var y_coord
	
	
function new_game()
{
	
	alert("Welcome to the supermarket of death game.")
	my_player = new Player(prompt("Please enter your name."), prompt("Enter your age"))
	
	if (my_player.age == parseInt(my_player.age))
	{
		my_player.age = parseInt(my_player.age)
	}
	alert(typeof(my_player.age))
	
	if (typeof(my_player.age) != "number" )
	{
		var num_ok = false
		while (num_ok==false)
		{
			my_player.age= prompt("Incorrect.\nPlease enter a NUMBER for your age:")
			if (my_player.age == parseInt(my_player.age))
			{
				my_player.age = parseInt(my_player.age)
			}
			if (typeof(my_player.age) == "number")
			{
				num_ok = true
			}
		}
		
	}
	if (my_player.age>=18) //checking if player is adult
	{
		alert("The game begins!")
		start_game()
	}
	else
	{
		alert("Bad luck!\nYou are too young to play this game.\nCome back when you are older.")
	}
}
function start_game() 
{
	//player coordinates
	x_coord = 1
	y_coord = 0
	
	ques_num_arr = generate_random() //assigning 3 random nums to the array
	alert(ques_num_arr[1])
	alert("You just entered in a special supermarket.\nWhy is it so special?...\nBecause...")
	alert("There is no light inside")
	alert("In fact, you are in a death game where some clues will be given to you at the beginning\nand you need to buy all the items in the list\nin order to escape from the area.")
	alert("IMPORTANT INFO\nyou need to remember precisely these items:\n"+display_main_tasks(ques_num_arr));
	
	
	set_need_to_buy(ques_num_arr)
	mov_or_buy()
}

function display_main_tasks(ques_num_arr2)
{
	var tasks=""
	for (count_c1 = 0 ; count_c1<ques_num_arr2.length ; count_c1++)
	{
		switch (ques_num_arr2[count_c1])
		{
			case 1:
			tasks+= Area_arr[0][0].name
			break;
			
			case 2:
			tasks+= Area_arr[0][1].name
			break;
			
			case 3:
			tasks+= Area_arr[0][2].name
			break;
			
			case 4:
			tasks+= Area_arr[1][1].name
			break;
			
			case 5:
			tasks+= Area_arr[2][0].name
			break;
			
			case 6:
			tasks+= Area_arr[2][1].name
			break;
			
			case 7:
			tasks+= Area_arr[2][2].name
			break;
			
		}
		tasks+="\n"
	}
	return tasks
}

function mov_or_buy()
{
	console.log("entered movorbuy")
	var msg_move_prompt = Area_arr[x_coord][y_coord].message
	if (Area_arr[x_coord][y_coord].bought_chosen == true)
	{
		console.log("moving player")
		move_player()
	}
	else if (Area_arr[x_coord][y_coord].bought_chosen == false)
	{
		buy_()
	}
}

function buy_()
{
	var msg_move_prompt = Area_arr[x_coord][y_coord].message
	msg_move_prompt+= "\nBuy the item? Y/N"
	var true_answer
	switch (Area_arr[x_coord][y_coord].need_to_buy)
	{
		case true:
		true_answer = "Y"
		break;
		case false:
		true_answer = "N"
	}
	var answer_buy = prompt(msg_move_prompt)
	
	if (answer_buy==true_answer)	//comparing the correct answer with the one from the user
	{
		alert("Correct answer")
		Area_arr[x_coord][y_coord].bought_chosen = true
		var finish_game = increment_ans()
		if (finish_game == false)
		{
			mov_or_buy()
		}
		
	}
	else{	
		alert("You failed! This was :"+Area_arr[x_coord][y_coord].name + "\nYou are now left alone until your last breath.")
		game_over()
		
	}
	
}

function increment_ans()  //Incrementing answer or check if all the task has been completed
{
	if (my_player.correct_ans == 3)
	{
		alert("SUCCESS. You are FREE!!!!!!")
		return true;
	}
	else 
	{
		my_player.correct_ans++
		return false;
	}
}

function game_over()
{
	alert("GAME OVER!!!!")
}


function move_player()
{	
	var msg_move_prompt = Area_arr[x_coord][y_coord].message
	msg_move_prompt += "\n\nYou can head:\n"
	
	var N_can = false
	var S_can= false
	var E_can= false
	var W_can= false
	
	
	if (Area_arr[x_coord][y_coord].North_can == true)
	{
		N_can = true
		msg_move_prompt+="N\n"
	}
	if (Area_arr[x_coord][y_coord].South_can == true)
	{
		S_can = true
		msg_move_prompt+="S\n"
	}
	if (Area_arr[x_coord][y_coord].East_can == true)
	{
		E_can = true
		msg_move_prompt+="E\n"
	}
	if (Area_arr[x_coord][y_coord].West_can == true)
	{
		W_can = true
		msg_move_prompt+="W\n"
	}
	
	var choice_direction
	var direction_ok = false
	
	while (direction_ok==false)
	{
		choice_direction = prompt(msg_move_prompt)
		
		switch (choice_direction)
		{
			case "N":
			if (N_can==true)
			{
				y_coord++
				console.log("North selected")
				direction_ok = true
			}
			else
			{
				alert("Sorry. You cannot head North")
			}
			break;
			
			case "S":
			if (S_can==true)
			{
				y_coord--
				direction_ok = true
			}
			else
			{
				alert("Sorry. You cannot head South")
			}
			break;
			
			case "E":
			if (E_can==true)
			{
				x_coord++
				direction_ok = true
			}
			else
			{
				alert("Sorry. You cannot head East")
			}
			break;
			
			case "W":
			if (W_can==true)
			{
				x_coord--
				direction_ok = true
			}
			else
			{
				alert("Sorry. You cannot head West")
			}
			break;
			
			
		}
	}
	console.log("re  calling movorbuy function from move function")
	mov_or_buy()
	
}


function choice_to_buy()
{
	var answer = prompt()
}

function set_need_to_buy(ques_num_arr2)
{
	for (count_c = 0 ; count_c<ques_num_arr2.length ; count_c++)
	{
		switch (ques_num_arr2[count_c])
		{
			case 1:
			Area_arr[0][0].need_to_buy = true
			break;
			
			case 2:
			Area_arr[0][1].need_to_buy = true
			break;
			
			case 3:
			Area_arr[0][2].need_to_buy = true
			break;
			
			case 4:
			Area_arr[1][1].need_to_buy = true
			break;
			
			case 5:
			Area_arr[2][0].need_to_buy = true
			break;
			
			case 6:
			Area_arr[2][1].need_to_buy = true
			break;
			
			case 7:
			Area_arr[2][2].need_to_buy = true
			break;
			
		}
	}
}

new_game()