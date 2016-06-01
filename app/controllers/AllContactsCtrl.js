app.controller("AllContactsCtrl", function($scope, $http, $location, contactStorage){
	$scope.contacts = [];

	//this is where the contactStorage factory is called since it has a function that gets the contacts from Firebase ("getContacts") then I want to set the empty array ("$scope.contacts") equal to the object array that was just received from Firebase ("contactList").
	contactStorage.getContacts().then(function(contactList){
		$scope.contacts = contactList;	
	});

	// this function makes it to where you can delete the specified item off of the DOM by using the delete function that was created in the factory.
	$scope.contactByeBye = function(contactId) {
		console.log("delete button clicked");
		console.log(contactId);
		// this is where the factory is called then the function that does what is needed (which is deleting in this case).
		contactStorage.deleteContact(contactId).then(function(response){
			// here the contacts are extracted again from firebase and updated with the new list that does not include the contact that was deleted.
			contactStorage.getContacts().then(function(contactList){
				$scope.contacts = contactList;
			});
		});
			};
});