function checkDate(relatedDate, fromDate, toDate) {
    let d1 = fromDate.split("/");
    let d2 = toDate.split("/");
    var c = relatedDate.split("/");

    let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    let check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check > from && check < to);
}
// job orders
// Orders count
// total count
// today orders
// this week
// this month
// this year

const { model } = require("./job-order");

// total count
function orderCount() {
    return model.count();
}
// today orders
async function dailyOrdersCount(dateOfDay) {
    let orders = await model.find({date: dateOfDay});
    return orders.length;
}

// this month
async function monthlyOrdersCount(month) {
    let orders = await model.find();
    let ordersPerMonth = 0;

    orders.forEach(order => {
        if ((order.date.getMonth() + 1) == month) {
            ordersPerMonth++;
        }
    });

    return ordersPerMonth;
}

// this year
async function yearlyOrdersCount(year) {
    let orders = await model.find();
    let ordersPerYear = 0;

    orders.forEach(order => {
        if ((order.date.getFullYear()) == year) {
            ordersPerYear++;
        }
    });

    return ordersPerYear;
}

// this week
async function weeklyOrdersCount(startDate, endDate) {
    let orders = await model.find();
    let ordersPerWeek = 0;

    orders.forEach(order => {
        let checkDateInThisWeek = checkDate(order.date, startDate, endDate);
        if (checkDateInThisWeek) {
            ordersPerWeek++;
        }
    });

    return ordersPerWeek;
}
