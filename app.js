/*
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
*/


const data = require("./data");
const customers = data.customers;

let cust = {
	            'email': "a",
                'password': 1,
				'name': "a",
                'firstName': "a",
                'lastName': "a",
                'gender': 1,
                'phoneNumb': 1,
                'address': "a",
                'city': "a",
                'state': 1,
                'zipCode': 1,
                'answer': "a",
				'securityQue': 1
}


customers.addUser(cust).then((user) => {
	console.log(user);
});