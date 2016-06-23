angular.module("RSSReaderApp").factory('FeedService', function ($http, $filter) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        },

        getFeed: function (url) {
            this.parseFeed(url).then(function (res) {
                var news = res.data.responseData.feed.entries
                for (var i = 0; i < news.length; i++) {
                    var temp = news[i].publishedDate;
                    news[i].publishedDate = $filter('date')(new Date(temp), "dd.MM.y в h:mm").toString();
                }
                return news;
            });
        }
    }
});