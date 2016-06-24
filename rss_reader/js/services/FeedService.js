angular.module("RSSReaderApp").factory('FeedService', function ($http) {
    var googleApiUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';
    return {
        parseFeed: function (url) {
            return $http.jsonp(googleApiUrl + encodeURIComponent(url));
        }
    }
});