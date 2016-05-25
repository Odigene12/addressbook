var app = angular.module("AddressBook", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.
	when('/contacts/all', {
		templateUrl: 'partials/contacts-all.html',
		controller: 'AllContactsCtrl'
	}).
	when('/contacts/new', {
		templateUrl: 'partials/contacts-new.html',
		controller: 'NewContactCtrl'
	}).
	otherwise('/contacts/all');
})