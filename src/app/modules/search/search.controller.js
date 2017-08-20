spaApp.controller('searchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, SearchService, $q, $filter) {
    'use strict';
    $log.info('+ searchCtrl()');
    $scope.dashTest = 'TEST';
    $scope.search = function(text) {
      $log.debug("Inside search = " + text);
      var deferred =  $q.defer();
      var payload = {'q': text};
      if (text !== '' && text !== undefined) {
        SearchService.searchFinTech(payload, function (data) {
          $log.info("data" + JSON.stringify(data));
          var filteredProds = $filter('filter')(data.products, text);
          return deferred.resolve(filteredProds);
        });
      }
      return deferred.promise;
    }
});
