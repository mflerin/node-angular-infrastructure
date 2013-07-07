//ref:  http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html

describe('Testing a controller', function() {
    var $scope = null;
    var ctrl = null;

    var userApiMock = {
        query: function (x){
            return [
                {name: 'Test User 1', age: 34, email: 'test@user1.com'},
                {name: 'Test User 2', age: 35, email: 'test@user2.com'}
            ];
        }
    };

    //you need to indicate your module in a test
    beforeEach(module('user'));

    beforeEach(inject(function($rootScope, $controller) {
        //create a scope object for us to use.
        $scope = $rootScope.$new();

        //now run that scope through the controller function,
        //injecting any services or other injectables we need.
        ctrl = $controller('UserListCtrl', {
            $scope: $scope,
            userApi: userApiMock,
            message:{}
        });
    }));

    it('should display a list of users', function() {

        $scope.users.length.should.equal(2);

    });

});