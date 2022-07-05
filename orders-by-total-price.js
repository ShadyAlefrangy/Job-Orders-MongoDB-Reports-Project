function checkDate(relatedDate, fromDate, toDate) {
    let d1 = fromDate.split("/");
    let d2 = toDate.split("/");
    var c = relatedDate.split("/");

    let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    let check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check > from && check < to);
}

// Total price
// total
// today orders
// this week
// this month
// this year

const { model } = require("./job-order");

// total count
async function ordersTotalPrice() {
    let orders = await model.find();
    let totalPrice = 0;
    orders.forEach(order => {
        totalPrice += order.total_price;
    });
    return totalPrice;
}
// today orders
async function dailyOrdersTotalPrice(dateOfDay) {
    let orders = await model.find({date: dateOfDay});
    let totalPrice = 0;
    orders.forEach(order => {
        totalPrice += order.total_price;
    });
    return totalPrice;
}

// this month
async function monthlyOrdersTotalPrice(month) {
    let orders = await model.find();
    let totalPricePerMonth = 0;

    orders.forEach(order => {
        if ((order.date.getMonth() + 1) == month) {
            totalPricePerMonth += order.total_price;
        }
    });

    return totalPricePerMonth;
}

// this year
async function yearlyOrdersTotalPrice(year) {
    let orders = await model.find();
    let totalPricePerYear = 0;

    orders.forEach(order => {
        if ((order.date.getFullYear()) == year) {
            totalPricePerYear += order.total_price;
        }
    });

    return totalPricePerYear;
}

// this week
async function weeklyOrdersTotalPrice(startDate, endDate) {
    let orders = await model.find();
    let totalPricePerWeek = 0;

    orders.forEach(order => {
        let checkDateInThisWeek = checkDate(order.date, startDate, endDate);
        if (checkDateInThisWeek) {
            totalPricePerWeek += order.total_price;
        }
    });

    return totalPricePerWeek;
}
