const { model } = require("./job-order");

async function orderCountForEachStatus() {
    let orders = await model.find();
    let material_preparation, material_received, under_progress, under_delivery, delivered, completed = 0;
    orders.forEach(order => {
        let job_order_status = order.order_status;
        switch (job_order_status) {
            case "material_preparation":
                material_preparation++;
                break;
            case "material_received":
                material_received++;
                break;
            case "under_progress":
                under_progress++;
                break;
            case "under_delivery":
                under_delivery++;
                break;
            case "delivered":
                material_preparation++;
                break;
            case "completed":
                completed++;
                break;
        }
    });

    let status = {
        "material_preparation": material_preparation,
        "material_received": material_received,
        "under_progress": under_progress,
        "under_delivery": under_delivery,
        "delivered": delivered,
        "completed": completed
    };
    return status;
}

// "job_order_status": {
//     "material_preparation": "Material preparation",
//     "material_received": "Material received",
//     "under_progress": "Under progress",
//     "under_delivery": "Under delivery",
//     "delivered": "Delivered",
//     "completed": "Completed",
// },