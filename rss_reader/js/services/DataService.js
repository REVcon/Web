angular.module("RSSReaderApp").factory('DataService', function() {
	var groups = [];
    var editFeed = {};
    var curGroup = "";			
    return {
        saveToLocalStorage: function(){
            localStorage.setItem("RSSReaderApp", angular.toJson(groups));
        },

        getGroups: function() {
           return groups;
        },  

        addGroup: function(name, marker){
        	var temp = {};
	    	temp.groupName = name;
            temp.markerType = marker;
	    	temp.feeds = [];
	    	groups.push(temp);	
            this.saveToLocalStorage();    	
        },

        setCurGroup: function(name){
            curGroup = name;
        },

        removeGroup: function(name){
            for (var i = 0; i < groups.length; i++){
                if (groups[i].groupName == name){
                    groups.splice(i,1);
                    this.saveToLocalStorage();                 
                    return;
                } 
            }
        },

        addFeed: function(arg)
        {
        	var temp = {};
        	temp.name = arg.name;
        	temp.URL = arg.url;
        	var i;
        	for(i = 0; i < groups.length; i++){
        		if (groups[i].groupName == arg.group){
        			groups[i].feeds.push(temp);
                    this.saveToLocalStorage();        			
        			break;
        		}
        	}        	        	
        },

        removeFeed: function(group, name)
        {            
            for(var i = 0; i < groups.length; i++){
                if (groups[i].groupName == group){                    
                    for (var j = 0; j < groups[i].feeds.length; j++){
                        if (groups[i].feeds[j].name == name)
                        {
                            groups[i].feeds.splice(j,1);
                            this.saveToLocalStorage();
                            return;                            
                        }
                    }
                }
            } 

        },

        editFeed: function(feed)
        {           
            this.removeFeed(curGroup, editFeed.name);
            this.addFeed(feed);
            this.saveToLocalStorage();
        },

        setEditFeed: function(feed)
        {
            editFeed = feed;
        },

        getEditFeed: function()
        {
            return editFeed;
        },

        getFromLocalStorage: function()
        {
        	var dataAsStr = localStorage.getItem('RSSReaderApp');
        	var tempData = angular.fromJson(dataAsStr);
            if (tempData == null){
                return;
            }
            groups = tempData;
        }

    };
});