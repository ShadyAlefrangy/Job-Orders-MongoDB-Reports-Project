async function topCustomersByOrderCount(year) {
    let customers = [];
    let customersOrders = await model.find().select(['customer', 'date']);
    let customOrdersPerYears = [];

    customersOrders.forEach(order => {
        if (order.date.getFullYear() == year) {
            customOrdersPerYears.push(order);
        } 
    });
    
    customOrdersPerYears.forEach(order => {
       let item =  customers.find(item => item.customer.toString() == order.customer.toString());
       if (item) {
            let index = customers.indexOf(item);
            customers[index].count += 1;
       } else {
            customers.push({
                customer: order.customer.toString(),
                name: order.customer.name,
                date: order.date,
                count: 1
            });
       }
    });
    customers.sort((a, b) => b.count - a.count);
    return customers;
}

async function topCustomersByTotalPrice(year) {
    let customers = [];
    let customersOrders = await model.find().select(['customer', 'date', 'total_price']);
    let customOrdersPerYears = [];

    customersOrders.forEach(order => {
        if (order.date.getFullYear() == year) {
            customOrdersPerYears.push(order);
        } 
    });
    
    customOrdersPerYears.forEach(order => {
       let item =  customers.find(item => item.customer.toString() == order.customer.toString());
       if (item) {
            let index = customers.indexOf(item);
            customers[index].total_price += order.total_price;
       } else {
            customers.push({
                customer: order.customer.toString(),
                name: order.customer.name,
                date: order.date,
                total_price: order.total_price
            });
       }
    });
    customers.sort((a, b) => b.count - a.count);
    return customers;
}

function getLimitedCustomers(limit, skip) {
    let customers = topCustomersByOrderCount();
    let limitedCustomers = [];
    for (let i = limit * (skip-1); i < limit*skip; i++) {
        limitedCustomers.push(customers[i]);
    }
    return limitedCustomers;
}
