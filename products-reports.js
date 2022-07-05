async function topProductsByOrderCount() {
    let products = [];
    let productsOrders = await model.find().select(['products', 'date']);
    
    productsOrders.forEach(product => {
       let item =  products.find(item => item.products.toString() == product.products.toString());
       if (item) {
            let index = products.indexOf(item);
            products[index].count += 1;
       } else {
        products.push({
                product: product.products.toString(),
                date: product.date,
                count: 1
            });
       }
    });
    products.sort((a, b) => b.count - a.count);
    return products;
}

async function topProductsByTotalPrice() {
    let products = [];
    let productsOrders = await model.find().select(['products', 'date', 'total_price']);
    
    productsOrders.forEach(product => {
       let item =  products.find(item => item.products.toString() == product.products.toString());
       if (item) {
            let index = products.indexOf(item);
            products[index].total_price += total_price;
       } else {
        products.push({
                product: product.products.toString(),
                date: product.date,
                totalPrice: product.total_price
            });
       }
    });
    products.sort((a, b) => b.count - a.count);
    return products;
}

function topProductsInCustomYears(years) {
    let products = topProductsByOrderCount();
    let customProducts = [];
    products.forEach(element => {
        let item = years.find(item => item == element.date);
        if (item) {
            customProducts.push(element.products.toString());
        }
    });
    return customProducts;
}