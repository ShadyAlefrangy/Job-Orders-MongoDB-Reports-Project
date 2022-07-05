const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	source: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "job_orders",
	},
	type: String,
	id: mongoose.Schema.Types.ObjectId,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	attributes: Object,
	date: {
		type: Date,
		default: Date.now(),
	},
});

const model = mongoose.model("activity", schema);

module.exports.schema = schema;
module.exports.model = model;
