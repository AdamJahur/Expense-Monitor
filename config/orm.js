var connection = require('./connection');
//notify server administrator that the orm is connected
console.log("orm connected");

var orm = {
	getUserAverageCostsByMealType : function(req, callback) {

		connection.query('SELECT cost FROM food WHERE mealtype = ? AND username = ?', [req.body.username] function(err, costs) {

			if(err) throw err;

			var sum = 0;

			for (i = 0; i < costs.length; i++){

				sum = sum + costs[i];

			}

			var IndividualUserAvgCost = sum/costs.length;

			callback(IndividualUserAvgCost);

		});

	},

	getAllUsersAverageCostsByMealType : function(req, callback) {

		connection.query('SELECT cost FROM food WHERE mealtype = ?', [req.body.mealtype] function(err, costs) {

			if(err) throw err;

			var sum = 0;

			for (i = 0; i < costs.length; i++) {

				sum = sum + costs[i];
			}

			var allUserAvgCost = sum/costs.length;

			callback(allUserAvgCost);

		});

	},

};


module.exports = orm;

