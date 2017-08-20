spaApp.service('SearchService', SearchService);

function SearchService($http, $cacheFactory) {
    return {
      searchFinTech: get,
    };
    function get(payload, successCallback) {
      var key = 'search_' + payload.q;
      if($cacheFactory.get(key) == undefined || $cacheFactory.get(key) == ''){
        $http.get('/data/products.json', {params: payload}).then(function(data){
          $cacheFactory(key).put('result', data.data);
          successCallback(data.data);
        });
      }else{
        successCallback($cacheFactory.get(key).get('result'));
      }
    }
}
