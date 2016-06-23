angular.module("RSSReaderApp").directive('itemInfo', function() {
  return {
    restrict: 'E',
    scope: {
    	info: '='
    },
    templateUrl: 'js/directives/itemInfo/itemInfo.html',
    
    link: function(scope, element, attrs) {
      scope.buttonText = "Читать описание",
      scope.isOpen = false,
      scope.isWatched = false;
      scope.content = scope.info.content;

      scope.download = function() {
        if (scope.isOpen){
          element.toggleClass('btn-active');
          scope.isOpen = false;
          scope.buttonText = "Читать описание"          
        }else{
          scope.isWatched = true;
          scope.isOpen = true;
          scope.buttonText = "Скрыть"
        }
      }
    }
  };
});