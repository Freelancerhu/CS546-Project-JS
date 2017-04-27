const data = require("./data");
const productData = data.products;
const customerData = data.customers;


var product1 = {
    title: 'Book_001',
    price: 100
}

var product2 = {
    title: 'Book_002',
    price: 200
}



productData.addProduct(product1).then((info) => {
    console.log(info)
});

productData.addProduct(product2).then((info) => {
    console.log(info)
});