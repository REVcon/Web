angular.module("RSSReaderApp").factory('DataService', function () {
    var groups = [];
    var feeds = [];
    var editFeed = {};

    return {
        saveToLocalStorage: function () {
            localStorage.setItem("RSSReaderAppGroups", angular.toJson(groups));
            localStorage.setItem("RSSReaderAppFeeds", angular.toJson(feeds));
        },

        getGroups: function () {
            return groups;
        },

        getFeeds: function (groupID) {
            var res = [];
            for (var i = 0; i < feeds.length; ++i) {
                if (feeds[i].groupID == groupID) {
                    res.push(feeds[i]);
                }
            }
            return res;
        },

        addGroup: function (name, marker) {
            var temp = {};
            temp.name = name;
            temp.markerType = marker;
            if (groups.length > 0) {
                temp.id = groups[groups.length - 1].id + 1;
            } else {
                temp.id = 1;
            }
            groups.push(temp);
            this.saveToLocalStorage();
        },

        removeGroup: function (group) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].id == group.id) {
                    groups.splice(i, 1);
                    this.saveToLocalStorage();
                    return;
                }
            }
        },

        addFeed: function (arg) {
            var temp = {};
            if (feeds.length > 0) {
                temp.id = feeds[feeds.length - 1].id + 1;
            } else {
                temp.id = 1;
            }
            temp.name = arg.name;
            temp.URL = arg.url;
            temp.news = [];
            temp.groupID = arg.groupID;
            feeds.push(temp);
            this.saveToLocalStorage();
        },

        removeFeed: function (feed) {
            for (var i = 0; i < feeds.length; i++) {
                if (feeds[i].id == feed.id) {
                    feeds.splice(i, 1);
                    this.saveToLocalStorage();
                    return;
                }
            }
        },

        editFeed: function (feed) {
            for (var i = 0; i < feeds.length; ++i) {
                if (feeds[i].id == editFeed.id) {
                    feeds[i].name = feed.name;
                    feeds[i].URL = feed.url;
                    feeds[i].groupID = feed.groupID;
                    this.saveToLocalStorage();
                    return;
                }
            }
        },

        setEditFeed: function (feed) {
            editFeed = feed;
        },

        getEditFeed: function () {
            return editFeed;
        },

        getFromLocalStorage: function () {
            var groupsAsStr = localStorage.getItem('RSSReaderAppGroups');
            var feedsAsStr = localStorage.getItem('RSSReaderAppFeeds');
            var tempGroups = angular.fromJson(groupsAsStr);
            var tempFeeds = angular.fromJson(feedsAsStr);
            if (tempGroups == null) {
                return;
            }
            groups = tempGroups;
            if (tempFeeds == null) {
                return;
            }
            feeds = tempFeeds;
        }
    };
});