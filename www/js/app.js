angular.module('weatherApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: '/search',
      controller: 'SearchCtrl',
      templateUrl: 'views/search/search.html'
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsCtrl',
      templateUrl: 'views/settings/settings.html'
    });

  $urlRouterProvider.otherwise('search');
})

.factory('Settings', function(){
  var settings = {
    units: 'us',
    days: 8
  };

  return settings;
})

.factory('Locations', function(){
  var Locations = {
    data : [{
      city: 'Chicago, IL, USA',
      lat: 41.8781136,
      lng: -87.6297982
    }],

    getIndex: function(item) {
      var index = -1;
      angular.forEach(Locations.data, function(location, i){
        if(item.lat == location.lat && item.lng == location.lng) {
          index = i;
        }
      })

      return index;
    },

    toggle: function(item) {
      var index = Locations.getIndex(item);
      if(index >= 0){
        Locations.data.splice(index, 1);
      }
      else {
        Locations.data.push(item);        
      }
    },

    primary: function(item) {
      var index = Locations.getIndex(item);
      if(index >= 0) {
        Locations.data.splice(index, 1);
        Locations.data.splice(0, 0, item);
      }
      else
      {
        Locations.data.unshift(item);
      }
    }
  }

  return Locations;
})

.controller('LeftMenuCtrl', function($scope, Locations){
  $scope.locations = Locations.data;
});