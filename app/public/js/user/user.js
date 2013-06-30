angular.module('user', ['ngResource','toastr'])

.factory('userApi', function ($resource) {
    var resource = $resource('/api/:action/:id/:searchTerm', {action: 'user',id:'@_id'});
    return resource;
})

    .controller('UserListCtrl', function ($scope,userApi,message) {
        $scope.model = {
            message: 'Here are my users'
        }

      userApi.query(function(users){
           $scope.users = users;
       });

      $scope.actions ={
          delete: function(user){
              userApi.delete({id:user._id}, function(){
                  var index = $scope.users.indexOf(user);
                  if (index >= 0) {
                      $scope.users.splice(index, 1);
                      message.info('User '+ user.name+' deleted');
                  }
              });
          }
      }
    })

    .controller('UserEditCtrl', function ($scope) {
        $scope.model = {
            message: 'Edit Users'
        }
    })

    .controller('UserCreateCtrl', function ($scope) {
        $scope.model = {
            message: 'Create Users'
        }
    });