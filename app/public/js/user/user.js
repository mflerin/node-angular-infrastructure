angular.module('user', ['ngResource', 'toastr'])

    .factory('userApi',function ($resource) {
        var resource = $resource('/api/:action/:id/:searchTerm', {action: 'user', id: '@_id'},
            {
                update: {method: 'PUT'}
            });

        return resource;
    }).controller('UserListCtrl',function ($scope, $location, userApi, message) {
        $scope.model = {
            message: 'Here are my users'
        };

        $scope.users = userApi.query();

        $scope.actions = {
            delete: function (user) {
                userApi.delete({id: user._id}, function () {
                    var index = $scope.users.indexOf(user);
                    if (index >= 0) {
                        $scope.users.splice(index, 1);
                        message.info('User ' + user.name + ' deleted');
                    }
                });
            },
            goToCreate: function () {
                $location.path('/users/create');
            },
            generateCharts: function () {
                $scope.chartData = _.map($scope.users, function (item) {
                    return {name: item.name, y: item.age}
                })
            }
        }
    }).
    controller('UserEditCtrl',function ($scope, $routeParams, $location, userApi, message) {
        var originalUser = {name: '', age: '', email: ''};
        $scope.model = {
            message: 'Edit Users'
        };

        var userId = $routeParams.id;

        $scope.user = userApi.get({id: userId});

        //Clear all form fields in the View
        $scope.cancel = function () {
            $scope.user = originalUser;
        };

        $scope.save = function (user) {
            userApi.update(user, function () {
                message.success('Success', 'User Updated.');
                $location.path('users');
            })
        };
    }).controller('UserCreateCtrl', function ($scope, $location, userApi, message) {
        var originalUser = {name: '', age: '', email: ''};
        var user = angular.copy(originalUser);

        $scope.user = user;

        //Clear all form fields in the View
        $scope.cancel = function () {
            $scope.user = originalUser;
        };

        //Add save method to the scope
        $scope.save = function (user) {
            userApi.save(user, function () {
                message.success('Success', 'New User Created.');
                $location.path('users');
            });
        };
    });