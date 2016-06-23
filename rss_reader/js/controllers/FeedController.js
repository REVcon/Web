angular.module("RSSReaderApp").controller("FeedController", ['$scope', '$filter', '$uibModal', '$window', 'FeedService', 'DataService',
    function ($scope, $filter, $uibModal, $window, Feed, Data) {
        $scope.groups = Data.getGroups();
        $scope.markerType = "marker-red";
        $scope.curGroupName = "";
        $scope.Loading = false;
        $scope.invalidGroupName = false;

        $scope.selectGroup = function (item) {
            $scope.selectedGroup = item;
        };

        $scope.isActiveGroup = function (item) {
            return $scope.selectedGroup === item;
        };

        $scope.selectFeed = function (item) {
            $scope.selectedFeed = item;
        };

        $scope.isActiveFeed = function (item) {
            return $scope.selectedFeed === item;
        };

        $scope.addGroup = function (event) {
            if (event.which == 13) {
                if ($scope.groupName == "" || $scope.groupName == undefined) {
                    $scope.invalidGroupName = true;
                } else {
                    $scope.invalidGroupName = false;
                }
                if (!$scope.invalidGroupName) {
                    Data.addGroup($scope.groupName, $scope.markerType);
                    $scope.groupName = "";
                    $scope.groups = Data.getGroups();
                }
            }
        };

        $scope.loadFeed = function (url) {
            $scope.Loading = true;
            Feed.parseFeed(url).then(function (res) {
                var news = res.data.responseData.feed.entries
                for (var i = 0; i < news.length; i++) {
                    var temp = news[i].publishedDate;
                    news[i].publishedDate = $filter('date')(new Date(temp), "dd.MM.y в H:MM").toString();
                    console.log(new Date(temp).toString());
                }
                $scope.news = news.slice();
                $scope.Loading = false;
            });
        };

        $scope.changeGroup = function (groupName) {
            $scope.curGroupName = groupName;
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].groupName == groupName) {
                    $scope.feeds = $scope.groups[i].feeds;
                    return;
                }
            }
        };

        $scope.removeGroup = function (group) {
            if (group.feeds.length > 0) {
                $window.alert("Ошибка: нельзя удалить непустую группу");
                return;
            }
            Data.removeGroup(group.groupName);
        };

        $scope.retrieveFromLocalStorage = function () {
            Data.getFromLocalStorage();
            $scope.groups = Data.getGroups();
        };

        $scope.addFeed = function () {
            if ($scope.groups.length == 0) {
                $window.alert("Ошибка: сперва добавьте хотя бы одну группу");
                return;
            }
            Data.setEditFeed(undefined);
            $scope.newFeedPopUp();
        }

        $scope.removeFeed = function (name) {
            Data.removeFeed($scope.curGroupName, name);
        };

        $scope.editFeed = function (feed) {
            Data.setCurGroup($scope.curGroupName);
            Data.setEditFeed(feed);
            $scope.editFeedPopUp();
        };

        $scope.editFeedPopUp = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'js/directives/popup/popup.html',
                controller: 'ModalInstanceController',
                size: size
            });

            modalInstance.result.then(function (rec) {
                Data.editFeed(rec);
            }, function () {

            });
        };

        $scope.newFeedPopUp = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'js/directives/popup/popup.html',
                controller: 'ModalInstanceController',
                size: size
            });

            modalInstance.result.then(function (rec) {
                Data.addFeed(rec);
            }, function () {

            });
        };

        $scope.saveToLocalStorage = function () {
            Data.saveToLocalStorage();
        };

        //$window.onbeforeunload = $scope.saveToLocalStorage();
        //$scope.$on("onbeforeunload", $scope.saveToLocalStorage());


    }]);


function mockDataToLocalStorage() {
    var groups = [{
        groupName: "Программирование",
        markerType: "marker-red",
        feeds: [{name: "Hacker News", URL: 'http://news.ycombinator.com/rss'}, {
            name: "Habrahabr",
            URL: 'http://habrahabr.ru/rss'
        }]
    },
        {
            groupName: "Новости",
            markerType: "marker-green",
            feeds: [{name: "CNN", URL: 'http://rss.cnn.com/rss/cnn_topstories.rss'}, {
                name: "Mashable",
                URL: "http://feeds2.feedburner.com/Mashable"
            }]
        }];
    localStorage.setItem("RSSReaderApp", angular.toJson(groups));
}

//mockDataToLocalStorage();