angular.module('user', ['ngResource', 'toastr'])

    .factory('userApi',function ($resource) {
        var resource = $resource('/api/:action/:id/:searchTerm', {action: 'user', id: '@_id'},
                                { update: {method: 'PUT'}
            });

        return resource;
    }).controller('UserListCtrl',function ($scope, $location, userApi, message) {

    }).controller('UserEditCtrl',function ($scope, $routeParams, $location, userApi, message) {

    }).controller('UserCreateCtrl', function ($scope, $location, userApi, message) {

    });