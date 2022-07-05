function checkDate(relatedDate, fromDate, toDate) {
    let d1 = fromDate.split("/");
    let d2 = toDate.split("/");
    var c = relatedDate.split("/");

    let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    let check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check > from && check < to);
}

function dailySales(relatedDate) {
    let orders = await model.find().select(['products', 'date', 'actual_delivery_date', 'actual_start_date', 'total_price', 'promised_delivery_date']);
    let totalMoneyForRelatedDate = 0;
    orders.forEach(element => {
        const deliveryDate = element.actual_delivery_date || promised_delivery_date;
        const startDate = element.actual_start_date || element.date;
        const isDateInInterval = checkDate(relatedDate, startDate, deliveryDate);
        if (isDateInInterval) {
            const diffTime = Math.abs(deliveryDate - element.actual_start_date);
            const totalMoney = element.total_price / diffTime;
            totalMoneyForRelatedDate += totalMoney;
        }
    });
    return totalMoneyForRelatedDate;
}

function calculateTotalMoneyBetweenTwoDates(startDate, endDate) {
    let sum = 0;
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        sum += dailySales(d);
    }
    return sum;
}









