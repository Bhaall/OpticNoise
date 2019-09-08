'use strict';
angular.module('onAdmin.filters', [])
.filter('timestampDateFormat', function timestampDateFormat($filter){
	return function(text){
		var tempdate = new Date(text.replace(/-/g,"/"));
		return $filter('date')(tempdate, "MMM dd yyyy");
	}
})
.filter('timestampDateTimeFormat', function timestampDateTimeFormat($filter){
	return function(text){
		var tempdate = new Date(text.replace(/-/g,"/"));
		return $filter('date')(tempdate, "MMM dd yyyy @ h:mm a");
	}
})
.filter('utcdate', ['$filter','$locale', function($filter, $locale){
  return function (input, format) {
      if (!angular.isDefined(format)) {
        format = $locale['DATETIME_FORMATS']['medium'];
      }

      var date = new Date(input);
      var d = new Date()
      var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      return $filter('date')(_utc, format)
  };

 }]);
