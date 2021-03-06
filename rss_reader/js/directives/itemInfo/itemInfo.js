angular.module("RSSReaderApp").directive('itemInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'js/directives/itemInfo/itemInfo.html',
        link: function (scope, element, attrs) {
            scope.buttonText = "Читать описание";
            scope.isOpen = false;
            scope.content = scope.info.content;

            scope.showContent = function () {
                if (scope.isOpen) {
                    element.toggleClass('btn-active');
                    scope.isOpen = false;
                    scope.buttonText = "Читать описание"
                } else {
                    scope.info.isWatched = true;
                    scope.isOpen = true;
                    scope.buttonText = "Скрыть"
                }
            }
        }
    };
});