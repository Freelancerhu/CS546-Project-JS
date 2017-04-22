//TODO: add funtion to add comments
const bcrypt = require("bcrypt-nodejs");
const mongoCollections = require("../config/mongoCollections");
const customers = mongoCollections.customers;
const uuid = require('node-uuid');

let exportMethods = {
	getUserById(id) {
		return customers().then((custCollection) => {
			return custCollection.findOne({_id: id }).then((customers) => {
				if (!customers) throw "Customer not found";
				return customers;
			});
		});
	},
	
	 getUserByEmail(email) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ email: email }).then((customers) => {
                if (!customers) throw "Customers not found";
                return customers;
            });
        });
    },

	addUser(requestBody){
	    var question;
        if(requestBody.securityQue == 2) {
            question = "Which is your favourite city?";
        }
        if(requestBody.securityQue == 1) {
            question = "What is your favourite colour?";
        }
		return customers().then((custCollection) => {
			let id = uuid();
			let newCustomers = {
                _id: id,
                email: requestBody.email,
                password: bcrypt.hashSync(requestBody.password),
				name: requestBody.name,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumb: requestBody.phoneNumb,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode,
                //imagePath: requestBody.image,
                security: question,
                answer: requestBody.securityAnswer,
				purchaseRecord: [],
				cart: []
            };
			return custCollection.findOne({ email: requestBody.email }).then((customers) => {
                if (customers) throw "Email already exists.";
                else {
                    return custCollection.insertOne(newCustomers)
					.then(() => {
                        return this.getUserById(id);
                    });
                }
            });
        }).catch((err) => {
			return Promise.reject(err);
		});
    },
	/*
	addUser(email, password, name){
		return customers().then((custCollection) => {
			let id = uuid();
			let newCustomers = {
                _id: id,
                email: email,
                password: password,
				name: name,
            };
			return custCollection.findOne({ email: email }).then((customers) => {
                if (customers) throw "Email already exists.";
                else {
                    return custCollection.insertOne(newCust)
					.then(() => {
                        return this.getUserById(id);
                    });
                }
            });
        }).catch((err) => {
			return Promise.reject(err);
		});
    },
	*/

	addPurchaseRecordToUser(userId, proId) {
		return customers().then((custCollection) => {
			custCollection.updateOne(
			{_id: userId},
			{
				$addToSet: {
					purchaseRecord: {
						_id: proId
					}
				}
			})
			}).then(() => {
					return this.getUserById(userId);
			}).catch((err) => {
			return Promise.reject(err);
		});
	},
	
	addCartToUser(userId, proId) {
		return customers().then((custCollection) => {
			custCollection.updateOne(
			{_id: userId},
			{
				$addToSet: {
					cart: {
						_id: proId
					}
				}
			})
			}).then(() => {
					return this.getUserById(userId);
			}).catch((err) => {
			return Promise.reject(err);
		});
	},
	
	updateUserDetails(requestBody) {
        return customers().then((custCollection) => {
            let updateUser = {
                password: bcrypt.hashSync(requestBody.password),
				name: requestBody.name,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumber: requestBody.phoneNumber,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode,
                security: requestBody.security,
                answer: requestBody.answer,
				purchaseRecord: [],
				cart: []
            }
            let update = {
                $set: updateUser
            };
            return custCollection.updateOne({ email: requestBody.email }, update).then(() => {
                return this.getUserByEmail(requestBody.email);
            });
        });
    },
	
	
	getUserByEmailPassport(email, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ email: email }).then((customers) => {
                if (!customers) return cb(null, null);;
                return cb(null, customers);;
            });
        });
    },


	getUserByIDPassport(id, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ _id: id }).then((customers) => {
                if (!customers) cb(new Error('customers ' + id + ' does not exist'));
                return cb(null, customers);
            });
        });
    },
	
	addUserPic(requestBody) {
        return customers().then((custCollection) => {
            let updateCust = {
                imagePath: requestBody.image
            }
			let updateCommand = {
                $set: updateCust
            }
            return custCollection.updateOne({ _id: requestBody.userid },updateCommand).then(() => {
                return this.getUserByID(requestBody.userid);
            });
        });
    }
	
}

module.exports = exportMethods;