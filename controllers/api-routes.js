// ================================================================================
// ROUTER
// The below points the server to a series of "route" files.
// These routes give the server a "map" of how to respond when users visit or request data from various URLs. 
// ================================================================================
var path = require('path');
var moment = require('moment');
moment().format();

var sequelTableModel = require("../model/food.js");
//notify the server administrator that the html route is connected
console.log("api-routes connected");

function bubbleSort (one, two) {
	var length = one.length;
		for (var i = 0; i < length; i++){
			for ( var j = 0; j < (length - i - 1); j++) {
				if(one[j] < one[j + 1]){
					var tmp = one[j];
					one[j] = one[j + 1];
					one[j + 1] = tmp1;

					var tmp2 = two[j];
					two[j] = two[j + 1];
					two[j + 1] = tmp2;
				}
			}
		}
}

module.exports = function(app){

	app.post('/userdata', function (req, res) {

		sequelTableModel.findAll({
			attributes : ['id', 'password', 'username', 'restaurant', 'description', 'whatmeal', 'cost', 'data']
		})
		.then(function(foodTable){

			var sum = 0;
			var sumB = 0;
			var sumL = 0;
			var sumD = 0;
			var sumO = 0;

			var B = [];
			var L = [];
			var D = [];
			var O = [];

			var avgCostB = 0; //average cost of breakfast
			var avgCostL = 0; //average cost of Lunch
			var avgCostD = 0; //average cost of Dinner
			var avgCostO = 0; //average cost of Other

			var dateArrayB = [];
			var dateArrayL = [];
			var dateArrayD = [];
			var dateArrayO = [];


			var timeSpan = req.query.time; //length of time data (in days)
			var user = req.query.userName;

			//console.log("inside userdata route ... " + timeSpan + " " + user);

			var now = moment(); //get the current date
			var beginTime = now.clone().subtract(timeSpan, 'days'); //calculate the start of the data retraieval time period
			//console.log(now.format("MM/DD/YY") + " " + beginTime.format("MM/DD/YY")); //output the current and begin dates

			visitedRestaurants = ["dummy"];
			for (i = 0; i < timeSpan; i++){
				restCount[i] = 0;
			}
			//console.log(restCount);
			C = 0;
			//console.log("foodtable=",foodtable);
			// console.log("length=",foodtable.length);

			for (i = 0; i < foodtable.length; i++){ //parse entire mysql foodtable

				var entryDate = moment(foodtable[i].dataValues.date);

				if (foodtable[i].dateValues.username == user){ //only take table entries within time frame specified

					sum += foodtable[i].dataValues.cost; //sum of all costs
					//console.log('mealtype=',foodtable[i].dataValues.whatmeal)
					if (foodtable[i].dataValues.whatmeal === 1){ //whatmeal = 1 is breakfast
						//console.log('breakfast found');
						sumB += foodtable[i].dataValues.cost; //sum of all breakfasts
						B.push(foodtable[i].dataValues.cost); //array of all breakfasts
						dateArrayL.push(entryDate);
					}
					else if (foodtable[i].dataValues.whatmeal === 2){ //whatmeal = 2 is lunch
						//console.log('lunch found');
						sumL += foodtable[i].dataValues.cost; //sum of all lunches
						L.push(foodtable[i].dataValues.cost); //array of all lunches
						dateArrayL.push(entryDate);
					}
					else if(foodtable[i].dataValues.whatmeal === 3){ //whatmeal = 3 is dinner
						//console.log('dinner found');
						sumD += foodtable[i].dataValues.cost; //sum of all dinners
						D.push(foodtable[i].dataValues.cost); //array of all dinners
						dateArrayD.push(entryDate);
					}
					else if(foodtable[i].dataValues.whatmeal === 0){ //whatmeal = 0 is other
						//console.log("snack found");
						sumO += foodtable[i].dataValues.cost; //sum of all other meals
						O.push(foodtable[i].dataValues.cost); //array of all other meals
						dateArrayO.push(entryDate);
					}
					else {
						console.log("no meal found")
					}

					for (j = 0; j< visitedRestaurants.length; j++){
						//console.log("2");
						if (foodtable[i].dataValues.restaurant == visitedRestaurants[j]){
							//console.log("3");
							C++;
							restCount[j]++;
							break;
						}
					}

					if (C == 0) {
						visitedRestaurants.push(foodtable[i].dataValues.restaurant);
						restCount[visitedRestaurants.length - 1]++;
					}
						C = 0;
				}

			}

			avgCostB = sumB/B.length;
			avgCostL = sumL/L.length;
			avgCostD = sumD/D.length;
			avgCostO = sumO/O.length;

				
			var ind = visitedRestaurants.indexOf('dummy')
			if(ind >-1){
				visitedRestaurants.splice(ind,1);
			}


			for(i=0;i<timeSpan; i++){
				var ind2 = restCount.indexOf(0);
					if(ind2>-1){
					restCount.splice(ind2,1);
				}
			}

			// console.log(visitedRestaurants);
			// console.log(restCount);
				
			bubbleSort(restCount, visitedRestaurants);

			// console.log(visitedRestaurants);
			// console.log(restCount);
				
			//console.log(visitedRestaurants + " " + restCount);


			var userData = {
				avgCost : [avgCostO, avgCostB, avgCostL, avgCostD],
				sumTotal : [sumO, sumB, sumL, sumD],
				arrayMeals : [O, B, L, D],
				dateArrays : [dateArrayO,dateArrayB,dateArrayL,dateArrayD],
				userRestaurants : visitedRestaurants,
				userRestcount : restCount
				//userO : 1
				
			}
	//console.log (userData);

	//=================================================================================
	// Start getting aggregate data



		})
	})
}