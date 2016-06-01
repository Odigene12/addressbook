app.factory("contactStorage", function($q, $http, AuthFactory){
	var getContacts = function () {
		var contacts = [];
		// create a promise that gets the contacts from firebase
		return $q(function (resolve, reject){
					$http.get("https://oj-addressbook.firebaseio.com/contacts.json")
						.success(function(contactObject){
							var contactList = contactObject;
							// this is looping through array of objects that it got from firebase through the item0 and so on and extracting each object.
							Object.keys(contactList).forEach(function(key){
								// here, it is giving an "id" property to each item in that array and setting its key "item0 and so on" equal to the id.
								contactList[key].id=key;
								// pushing it into the empty array at the top "let items = []"
								contacts.push(contactList[key]);
						});
						resolve(contacts);
					})
					.error(function(error){
					reject(error);
					});
			});
	};


	var deleteContact = function(contactId) {
		return $q(function(resolve, reject){
			$http
				.delete("https://oj-addressbook.firebaseio.com/contacts/" + contactId + ".json")
				.success(function(objectFromFirebase){
					resolve(objectFromFirebase);
				});
		});
	};

	var postNewContact = function(newContact) {
		let user = AuthFactory.getUser();
		return $q(function(resolve, reject){
			$http.post("https://oj-addressbook.firebaseio.com/contacts.json",
				JSON.stringify({
					firstName: newContact.firstName, 
					lastName: newContact.lastName,
					phoneNumber: newContact.phoneNumber,
					email: newContact.email,
					website: newContact.website,
					uid: user.uid
				})
			)
			.success(function(objectFromFirebase) {
						// this is telling you that the promise is completed and ready to use the data
						resolve(objectFromFirebase);
					}
				);
		});
	};

	var getSingleContact = function (contactId){
		
		return $q(function(resolve, reject){
			$http.get("https://oj-addressbook.firebaseio.com/contacts/" + contactId + ".json")
				.success(function(itemObject){
					resolve(itemObject);
				})
			.error(function(error){
				reject(error);
				});
		});
	
	};

	var updateContact = function(contactId, newContact){
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject) {
            $http.put(
                "https://oj-addressbook.firebaseio.com/contacts/" + contactId + ".json",
                JSON.stringify({
                    firstName: newContact.firstName, 
					lastName: newContact.lastName,
					phoneNumber: newContact.phoneNumber,
					email: newContact.email,
					website: newContact.website,
					uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };


return {getContacts:getContacts, deleteContact:deleteContact, postNewContact:postNewContact,getSingleContact:getSingleContact, updateContact:updateContact};

});