async function topCustomersByOrderCount() {
    let customers = [];
    let customersOrders = await model.find().select(['customer', 'date']);
    
    customersOrders.forEach(order => {
       let item =  customers.find(item => item.customer.toString() == order.customer.toString());
       if (item) {
            let index = customers.indexOf(item);
            customers[index].count += 1;
       } else {
            customers.push({
                customer: order.customer.toString(),
                date: order.date,
                count: 1
            });
       }
    });
    customers.sort((a, b) => b.count - a.count);
    return customers;
}

function topCustomersInCustomYears(years) {
    let customers = topCustomersByOrderCount();
    let customCustomers = [];
    customers.forEach(element => {
        let item = years.find(item => item == element.date);
        if (item) {
            customCustomers.push(element.customer.toString());
        }
    });
    return customCustomers;
}

async function topCustomersByTotalPrice() {
    let customers = [];
    let customersOrders = await model.find().select(['customer', 'date', 'total_price']);
    
    customersOrders.forEach(order => {
       let item =  customers.find(item => item.customer.toString() == order.customer.toString());
       if (item) {
            let index = customers.indexOf(item);
            customers[index].total_price += total_price;
       } else {
            customers.push({
                customer: order.customer.toString(),
                date: order.date,
                totalPrice: order.total_price
            });
       }
    });
    customers.sort((a, b) => b.count - a.count);
    return customers;
}


