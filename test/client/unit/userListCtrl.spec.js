//ref:  http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html

describe('User List Controller', function () {
    var $scope = null,
    ctrl = null,
    testUsers = [
        {_id: 1, name: 'Test User 1', age: 34, email: 'test@user1.com'},
        {_id: 2, name: 'Test User 2', age: 35, email: 'test@user2.com'}
    ];

    var userApiMock = {
        query: function (x) { return     testUsers; },
        delete: function (id, callback) { callback(); }
    };

    //you need to indicate your module in a test
    beforeEach(module('user'));

    beforeEach(inject(function ($rootScope, $controller) {
        //create a scope object for us to use.
        $scope = $rootScope.$new();

        //now run that scope through the controller function,
        //injecting any services or other injectables we need.
        ctrl = $controller('UserListCtrl', {
            $scope: $scope,
            userApi: userApiMock,
            message: {info:function(){}}
        });
    }));

    it('should display a list of users', function () {
        $scope.users.length.should.equal(2);
    });

    it('should be able to delete a user and display message', function () {

        spyOn(userApiMock, 'delete').andCallThrough();
        $scope.actions.delete(testUsers[0]);

        expect(userApiMock.delete.mostRecentCall.args[0]).toMatch({id: testUsers[0]._id});
        $scope.users.length.should.equal(1);
        $scope.users[0]._id.should.equal(2);
    });

});