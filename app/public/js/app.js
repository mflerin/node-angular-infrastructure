// Declare module with top level dependencies to be injected
 angular.module('app', ['ngResource', 'user'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/userList.html',
                controller: 'UserListCtrl',
                title: 'User List'})
            .when('/users', {
                templateUrl: '/views/userList.html',
                controller: 'UserListCtrl',
                title: 'User List'
            }).when('/users/edit/:id', {
                templateUrl: '/views/userEdit.html',
                controller: 'UserEditCtrl',
                title: 'Edit Users'
            }).when('/users/create', {
                templateUrl: '/views/userEdit.html',
                controller: 'UserCreateCtrl',
                title: 'Create User'
            })
    })
    .run([ '$location', '$rootScope', function ($location, $rootScope) {

        $rootScope.title = 'Javascript Everywhere';

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current && current.$$route.title != undefined) {
                $rootScope.title = current.$$route.title;
            }
        });

    }]);

