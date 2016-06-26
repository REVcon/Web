angular.module("RSSReaderApp").controller('ModalInstanceController', function ($scope, $uibModalInstance, DataService) {

    $scope.groups = DataService.getGroups();
    $scope.invalidName = false;
    $scope.invalidUrl = false;

    $scope.ok = function () {
        $scope.invalidName = !!($scope.feedName == "" || $scope.feedName == undefined);
        $scope.invalidUrl = !!($scope.feedURL == "" || $scope.feedURL == undefined);
        if (!$scope.invalidName && !$scope.invalidUrl) {
            var temp = {};
            temp.name = $scope.feedName;
            temp.url = $scope.feedURL;
            temp.groupID = $scope.selectedGroup;
            $uibModalInstance.close(temp);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {
        $scope.editFeed = DataService.getEditFeed();
        if ($scope.editFeed != undefined) {
            $scope.title = "Редактирование ленты";
            $scope.feedName = $scope.editFeed.name;
            $scope.feedURL = $scope.editFeed.URL;
            $scope.btnText = "Редактировать";
        }
        else {
            $scope.title = "Добавление новой ленты";
            $scope.btnText = "Добавить";
        }

    };
    $scope.init();
});