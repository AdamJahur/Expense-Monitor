// *********************************************************************************
// food.JS - THIS FILE CREATES A MODEL OF THE TABLE
// *********************************************************************************

// Dependency

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 
// seqModel (lowercase) references my connection to the DB with sequelize model.
var seqModel = require("../config/connection.js");

// Creates a sequelTableModel model that matches up with DB
var foodTableModel = seqModel.define("foodtable", {


	id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},

	username: {
			type: Sequelize.STRING,
	},

	password: {
			type: Sequelize.STRING,
	},

	restaurant: {
			type: Sequelize.STRING,
	},

	description: {
			type: Sequelize.STRING,
	},

	whatmeal: {
			type: Sequelize.INTEGER,
	},

	cost: {
			type: Sequelize.DECIMAL(5,2),
	},

	date: {
			type: Sequelize.DATE
	},
},

{
	timestamps: false,
});

//Sync's with db
foodTableModel.sync();

// Makes the foodTableModel available for other files (will also create a table)
module.exports = foodTableModel;