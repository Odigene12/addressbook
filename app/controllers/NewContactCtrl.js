app.controller("NewContactCtrl", function($scope, $location, contactStorage){
	$scope.title = "New Contact";
	$scope.submitButtonText = "Add Contact";

	$scope.newTask = {
		firstName: "",
		lastName:"",
		phoneNumber:  "",
		email: "",
		website: ""
};
	// this is the function that calls on the factory again that contains the function postNewContact that needs the information from $scope.newTask in order to post the new information for the contact to firebase and in turn on the DOM.
	$scope.addNewContact = function () {
		contactStorage.postNewContact($scope.newTask) 
			.then(function successCallback(response){
					// here, the function is telling the DOM to go back to this url when finished.
					$location.url("/contacts/all");
				});
		};
});