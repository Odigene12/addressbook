var app = angular.module("AddressBook", ["ngRoute"])
	.constant("firebaseURL","https://oj-addressbook.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
})

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
	when('/contacts/:contactId', {
		templateUrl: 'partials/contacts-details.html',
		controller: 'ViewContactCtrl'
	}).

	when('/contacts/:contactId/edit', {
		templateUrl: 'partials/contact-new.html',
		controller: 'EditContactCtrl'
	}).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
    }).
      when('/logout', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
	}).
	otherwise('/contacts/all');
});

// this function is assigning the link to my Firebase url to a variable that will be used to decide whether or not the user is authorized on the Firebase account to make changes.
app.run(($location) => {
	let contactRef = new Firebase("https://oj-addressbook.firebaseio.com/");

// This says that when authentication takes place, if the data that is entered in does not match the data within firebase that is authorized, then send the user back to the login screen to try again.
	contactRef.onAuth(authData => {
		if(!authData){
			$location.path("/login")
		}
	})
})