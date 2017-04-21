//TODO: add funtion to add selling products
const bcrypt = require("bcrypt-nodejs");
const mongoCollections = require("../config/mongoCollections");
const sellers = mongoCollections.sellers;
const uuid = require('node-uuid');

let exportMethods = {
	getSellerById(id) {
		return sellers().then((sellersCollection) => {
			return sellersCollection.findOne({_id: id }).then((sellers) => {
				if (!sellers) throw "Sellers not found";
				return sellers;
			});
		});
	},
	
	 getSellerByEmail(email) {
        return sellers().then((sellersCollection) => {
            return sellersCollection.findOne({ email: email }).then((sellers) => {
                if (!sellers) throw "Sellers not found";
                return sellers;
            });
        });
    },
	
	addSeller(requestBody) =>{
	    var question;
        if(requestBody.securityQue == 2) {
            question = "Which is your favourite city?";
        }
        if(requestBody.securityQue == 1) {
            question = "What is your favourite colour?";
        }
		return sellers().then((sellersCollection) => {
			let id = uuid();
			let newSellers = {
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
                imagePath: requestBody.image,
                security: question,
                answer: requestBody.securityAnswer,
				selling: []
            };
			return sellersCollection.findOne({ email: requestBody.email }).then((sellers) => {
                if (sellers) throw "Email already exists.";
                else {
                    return sellersCollection.insertOne(newSellers)
					.then(() => {
                        return this.getSellerById(id);
                    });
                }
            });
        }).catch((err) => {
			return Promise.reject(err);
		});
    },
	
	
	updateSellerDetails(requestBody) {
        return sellers().then((sellersCollection) => {
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
				selling: []
            }
            let update = {
                $set: updateUser
            };
            return sellersCollection.updateOne({ email: requestBody.email }, update).then(() => {
                return this.getSellerByEmail(requestBody.email);
            });
        }).catch((err) => {
			return Promise.reject(err);
		});
    },
	
	addSellingToSeller(sellerId, proId) {
		return sellers().then((sellersCollection) => {
			sellersCollection.updateOne(
			{_id: sellerId},
			{
				$addToSet: {
					selling: {
						_id: proId
					}
				}
			})
			}).then(() => {
					return this.getSellerById(sellerId);
			}).catch((err) => {
			return Promise.reject(err);
		});
	},
	
	
	
	getSellerByEmailPassport(email, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ email: email }).then((customers) => {
                if (!customers) return cb(null, null);;
                return cb(null, customers);;
            });
        });
    },

	getSellerByIDPassport(id, cb) {
        return customers().then((custCollection) => {
            return custCollection.findOne({ _id: id }).then((customers) => {
                if (!customers) cb(new Error('customers ' + id + ' does not exist'));
                return cb(null, customers);
            });
        });
    },
	
	 addSellerPic(requestBody) {
        return sellers().then((sellersCollection) => {
            let updateSeller = {
                imagePath: requestBody.image
            }
            return sellersCollection.updateOne({ _id: requestBody.userid }, $set: updateSeller).then(() => {
                return this.getSellerById(requestBody.userid);
            });
        });
    }
	
	
}

module.exports = exportedMethods;