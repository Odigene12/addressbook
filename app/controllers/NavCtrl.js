app.controller("NavCtrl", function($scope){
	$scope.navBar = [
	{
		name:"Contacts",
		url:'#/contacts/all'
	},
	{
		name:"New Contact",
		url:'#/contacts/new'
	}	

	];
});