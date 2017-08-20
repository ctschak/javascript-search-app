/**
*
* This is the Angularjs Application file.
* We are initiating routing, modules & load extenal configurations files.
* Date : August 19th, 2017
* Author : Chakravarthy Ravichandran (surathy2003@gmail.com)
*
**/

'use strict';

var spaApp = angular.module('spaApp', [
	'ui.router',
	'ngMaterial',
	'ui.bootstrap',
	'ngMessages',
	'lodash'
]);

spaApp.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('search', {
		url: '/',
		data: {
			roles: []
		},
		views: {
			'header': {
				templateUrl: 'app/common/header.html'
			},
			'search': {
				templateUrl: 'app/modules/search/search.tpl.html',
				controller: 'searchCtrl'
			},
		},
	});

	//Re-directs
	$urlRouterProvider.otherwise(function ($injector, $location) {
		var $state = $injector.get('$state');
		$state.go('search');
	});

});

//To avoid default '#!' prefix in legacy browser in HTML5 mode
spaApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

/**
* The run phase of the "spaApp" could be useful for any initialization procedure.
**/
spaApp.run(function ($log, $http, $rootScope, $state, $urlRouter, $location, $window) { // Inject Service to load data
	$log.debug('spaApp.run');
	//Adding references to $state and $stateParams to the $rootScope
	//so that we can access them from any scope within your applications
	$rootScope.$state = $state;
	//https://github.com/angular-ui/ui-router/wiki
	$rootScope.$on('$stateChangeSuccess', function (event, next) {
			$log.debug("stateChangeSuccess scope");
			$state.go('search');
		});
});
