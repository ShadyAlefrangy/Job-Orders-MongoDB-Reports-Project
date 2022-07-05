const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	job_number: {
		type: Number,
		required: true,
		unique: true,
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "customer",
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "product",
		},
	],
	status: String,
	order_status: String,
	process_status: String,
	quantity: {
		type: Number,
		default: 0,
	},
	unit_price: Number,
	total_price: Number,
	costing_sheet_number: String,
	estimation_cost: {
		matirial: Number,
		operation: Number,
		per_unit: Number,
		total: Number,
	},
	estimation_profit: {
		amount: Number,
		percentage: Number,
	},
	actual_cost: {
		matirial: Number,
		operation: Number,
		per_unit: Number,
		total: Number,
	},
	actual_profit: {
		amount: Number,
		percentage: Number,
	},
	promised_delivery_date: Date,
	actual_delivery_date: Date,
	actual_start_date: Date,
	deviation: Number,
	number_of_days: Number,
	files: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "file",
		},
	],
});

const model = mongoose.model("job_orders", schema);

module.exports.schema = schema;
module.exports.model = model;
