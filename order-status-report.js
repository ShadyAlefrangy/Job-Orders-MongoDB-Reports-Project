const { model } = require("./activity");

function orderStatusReport() {
    let orders = await model.find().select(['products', 'date', 'actual_delivery_date', 'actual_start_date', 'total_price', 'promised_delivery_date']);
    // let activities = await model.find().populate({path: 'job_orders', select: 'date'});
    let status = [];
    orders.forEach(order => {
        let activities = await model.find({source: order._id});
        let status1 = 0;
        let status2 = 0;
        let status3 = 0;
        let status4 = 0;
        let status5 = 0;
        

        let item = activities.find(item => item.attributes.to == "material_received");
        status1 += Math.ceil((Math.abs(item.date - order.date)) / (1000 * 60 * 60 * 24));

        let item2 = activities.find(item => item.attributes.to == "under_progress");
        status2 += Math.ceil((Math.abs(item2.date - item.date)) / (1000 * 60 * 60 * 24));

        let item3 = activities.find(item => item.attributes.to == "under_delivery");
        status3 += Math.ceil((Math.abs(item3.date - item2.date)) / (1000 * 60 * 60 * 24));

        let item4 = activities.find(item => item.attributes.to == "delivered");
        status4 += Math.ceil((Math.abs(item4.date - item3.date)) / (1000 * 60 * 60 * 24));

        let item5 = activities.find(item => item.attributes.to == "completed");
        status5 += Math.ceil((Math.abs(item5.date - item4.date)) / (1000 * 60 * 60 * 24));

        status.push({
            jobOrderId: order._id,
            status1: status1,
            status2: status2,
            status3: status3,
            status3: status4,
            status3: status5,
            totalDays: status1 + status2 + status3 + status4 + status5
        });
    });
}

// "job_order_status": {
//     "material_preparation": "Material preparation",
//     "material_received": "Material received",
//     "under_progress": "Under progress",
//     "under_delivery": "Under delivery",
//     "delivered": "Delivered",
//     "completed": "Completed",
// },