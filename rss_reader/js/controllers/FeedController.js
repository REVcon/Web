angular.module("RSSReaderApp").controller("FeedController", ['$scope', '$filter', '$uibModal', '$window', 'FeedService', 'DataService',
    function ($scope, $filter, $uibModal, $window, Feed, Data) {
        $scope.groups = [];
        $scope.markerType = "marker-red";
        $scope.loading = false;
        $scope.invalidGroupName = false;
        $scope.filterText = "";

        $scope.init = function () {
            Data.getFromLocalStorage();
            $scope.groups = Data.getGroups();
            if ($scope.groups.length != 0) {
                $scope.onGroupClick($scope.groups[0]);
            }
        };

        $scope.isActiveGroup = function (item) {
            return $scope.selectedGroup === item;
        };

        $scope.isActiveFeed = function (item) {
            return $scope.selectedFeed === item;
        };

        $scope.onFeedClick = function (feed) {
            $scope.selectedFeed = feed.name;
            $scope.loading = true;
            Feed.parseFeed(feed.URL).then(function (res) {
                var news = res.data.responseData.feed.entries;
                for (var i = 0; i < news.length; i++) {
                    var temp = news[i].publishedDate;
                    news[i].publishedDate = $filter('date')(new Date(temp), "dd.MM.y в H:MM").toString();
                    news[i].isWatched = false;
                }
                if (feed.news != []) {
                    for (var k = 0; k < feed.news.length; ++k) {
                        for (var j = 0; j < news.length; ++j) {
                            if (news[j].title == feed.news[k].title) {
                                news[j].isWatched = feed.news[k].isWatched;
                                break;
                            }
                        }
                    }
                }
                feed.news = news;
                $scope.news = feed.news;
                $scope.loading = false;
            }, function () {
                $scope.news = feed.news;
                $scope.loading = false;
                $window.alert("Ошибка: не удалось получить список новостей");
            });
        };

        $scope.getFeedsNumber = function (id) {
            return Data.getFeeds(id).length;
        };

        $scope.onGroupClick = function (group) {
            $scope.selectedGroup = group.id;
            $scope.feeds = Data.getFeeds(group.id);
        };

        $scope.addGroup = function (event) {
            if (event.which == 13) {
                $scope.invalidGroupName = !!($scope.groupName == "" || $scope.groupName == undefined);
                if (!$scope.invalidGroupName) {
                    Data.addGroup($scope.groupName, $scope.markerType);
                    $scope.groupName = "";
                    $scope.groups = Data.getGroups();
                }
            }
        };

        $scope.removeGroup = function ($event, group) {
            $event.stopPropagation();
            if ($scope.getFeedsNumber(group.id) > 0) {
                $window.alert("Ошибка: нельзя удалить непустую группу");
                return;
            }
            Data.removeGroup(group);
        };

        $scope.addFeed = function () {
            if ($scope.groups.length == 0) {
                $window.alert("Ошибка: сперва добавьте хотя бы одну группу");
                return;
            }
            Data.setEditFeed(undefined);
            $scope.newFeedPopup();
        };

        $scope.removeFeed = function ($event, feed) {
            $event.stopPropagation();
            Data.removeFeed(feed);
            $scope.news = [];
            $scope.feeds = Data.getFeeds(feed.groupID);
        };

        $scope.editFeed = function ($event, feed) {
            $event.stopPropagation();
            Data.setEditFeed(feed);
            $scope.editFeedPopup();
        };

        $scope.editFeedPopup = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'js/directives/popup/popup.html',
                controller: 'ModalInstanceController',
                size: size
            });
            modalInstance.result.then(function (rec) {
                Data.editFeed(rec);
                $scope.feeds = Data.getFeeds($scope.selectedGroup);
            }, function () {
            });
        };

        $scope.newFeedPopup = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'js/directives/popup/popup.html',
                controller: 'ModalInstanceController',
                size: size
            });
            modalInstance.result.then(function (rec) {
                Data.addFeed(rec);
                $scope.feeds = Data.getFeeds($scope.selectedGroup);
            }, function () {
            });
        };

        $scope.saveToLocalStorage = function () {
            Data.saveToLocalStorage();
        };

        $scope.getFaviconUrl = function (url) {
            var domain;
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            }
            else {
                domain = url.split('/')[0];
            }
            domain = domain.split(':')[0];
            if (!domain.indexOf("rss.")) {
                domain = domain.substring(4);
            }
            return 'http://' + domain + '/favicon.ico';
        };

        $scope.changeMarkerColor = function (color) {
            switch (color) {
                case 'red':
                    $scope.markerType = "marker-red";
                    break;
                case 'orange':
                    $scope.markerType = "marker-orange";
                    break;
                case 'yellow':
                    $scope.markerType = "marker-yellow";
                    break;
                case 'green':
                    $scope.markerType = "marker-green";
                    break;
                case 'blue':
                    $scope.markerType = "marker-blue";
                    break;
                case 'cyan':
                    $scope.markerType = "marker-cyan";
                    break;
                case 'purple':
                    $scope.markerType = "marker-purple";
                    break;
                default:
                    break;
            }
        };

        $scope.searchInContent = function () {
            return function (item) {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = item.content;
                tmp.innerHTML += item.title;
                var text = tmp.textContent.toLowerCase();
                return (text.indexOf($scope.filterText.toLowerCase()) != -1);
            };
        };

        $scope.truncateUrl = function (url) {
            if (url.length > 30) {
                return url.substr(0, 30) + "...";
            }
            return url;
        };

        $window.addEventListener('beforeunload', $scope.saveToLocalStorage);
        $scope.init();

    }]);