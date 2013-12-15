angular.module('controlsModule', [])
    .directive('savebutton', function () {
        return {
            restrict: 'E',
            scope:{eventHandler:'&ngClick',isDisabled:'=ngDisabled'},
            templateUrl: './views/directives/savebutton.html',
            link: function (scope, element, attrs) {

               scope.clicked = function(){
                   scope.isDisabled = true;
                   scope.eventHandler();
               }

            }
        }
    });

