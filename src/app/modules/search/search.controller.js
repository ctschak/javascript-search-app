spaApp.controller('searchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, SearchService, $q, $filter) {
    'use strict';
    $log.info('+ searchCtrl()');
    $scope.dashTest = 'TEST';
    $scope.limit = 7;
    /**
    * This is the search function is used to filter the output based on
    * user's input and limit the result to 10
    * Usage in search.tpl.html searchText input field
    * - uib-typeahead="fin as fin.name for fin in search($viewValue)"
    **/
    $scope.search = function(text) {
      $log.debug("Inside search = " + text);
      var deferred =  $q.defer();
      var payload = {'q': text};
      if (text !== '' && text !== undefined) {
        SearchService.searchFinTech(payload, function (data) {
          $log.debug("data" + JSON.stringify(data));
          var filteredProds = $filter('filter')(data.products, text);
          var limitToTop10 = $filter('limitTo')(filteredProds, $scope.limit);
          return deferred.resolve(limitToTop10);
        });
      }
      return deferred.promise;
    }

    /**
    * Alternative Approach is to use typeahead-popup-template-url.
    * This approach didn't met expected result. So fallback on older approach.
    * Need sometime to create a custom directive rather using angular bootstrap typeahead.
    * Changes in search.tpl.html:
    *  1) uib-typeahead="fin as selectSearchLabel(fin) for fin in search($viewValue)"
    *  2) typeahead-popup-template-url="app/modules/search/search-dropdown-bkup.html"
    **/
    $scope.selectSearchLabel = function(fintech) {
      if(_.isEmpty(fintech)) { return;}
      if(_.isUndefined(fintech.name) || fintech.name === '') {return '';}
      return fintech.name;
    }
});
