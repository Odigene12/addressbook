app.controller(function($scope, $routeParams, contactStorage){

$scope.contacts = [];
$scope.selectedContact = {};



//this is where the contactStorage factory is called since it has a function that gets the contacts from Firebase ("getContacts") then I want to set the empty array ("$scope.contacts") equal to the object array that was just received from Firebase ("contactList").
	contactStorage.getContacts().then(function(contactList){
		$scope.contacts = contactList;


				// Remember .filter is an array method that returns an array.
			$scope.selectedContact = $scope.contacts.filter(function(contact){
				// here the filter is comparing the id of the item to the id of the url to see if they equal or match.
				return contact.id === $routeParams.contactId;
			})[0];
		});	
	});