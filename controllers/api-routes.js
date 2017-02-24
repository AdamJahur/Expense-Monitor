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



		})
	})
}