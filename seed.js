const data = require("./data");
const productData = data.products;
const customerData = data.customers;


var product1 = {
    title: 'Book_001',
    price: 100,
	URL: 'http://www.rd.com/wp-content/uploads/sites/2/2016/03/01-10-unexpected-ways-clothes-affect-mood-power-tie.jpg'
}

var product2 = {
    title: 'Book_002',
    price: 200,
	URL: 'http://www.rd.com/wp-content/uploads/sites/2/2016/03/01-10-unexpected-ways-clothes-affect-mood-power-tie.jpg'
}



productData.addProduct(product1).then((info) => {
    console.log(info)
});

productData.addProduct(product2).then((info) => {
    console.log(info)
});