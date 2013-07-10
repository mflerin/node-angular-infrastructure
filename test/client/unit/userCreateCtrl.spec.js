describe('User Create Controller', function () {
    var $scope = null
        , location
        , ctrl = null
        , testUser = {_id: 1, name: 'Test User 1', age: 34, email: 'test@user1.com'};

    var userApiMock = {
        save:function(id,callback){callback()}
    };

    beforeEach(module('user'));

    beforeEach(inject(function ($rootScope, $controller, $location) {
        $scope = $rootScope.$new();
        location = $location;

        ctrl = $controller('UserCreateCtrl', {
            $scope: $scope,
            $location: $location,
            userApi: userApiMock,
            message: {success: function () { }}
        });
    }));

    it('should start with empty user to populate', function () {
        $scope.user.name.should.equal('');
        $scope.user.age.should.equal('');
        $scope.user.email.should.equal('');
    });

    it('should clear all user fields on reset', function () {
        $scope.user = testUser;

        $scope.cancel();

        $scope.user.name.should.equal('');
        $scope.user.age.should.equal('');
        $scope.user.email.should.equal('');
    });

    it('should create a new user when we save and return to the user list page', function () {

        $scope.user.name = 'new user';
        $scope.user.age = 34;
        $scope.user.email = 'new@user.com';

        spyOn(userApiMock,'save').andCallThrough();
        spyOn(location,'path');

        $scope.save($scope.user);

        expect(userApiMock.save.mostRecentCall.args[0]).toMatch($scope.user);
        expect(location.path.mostRecentCall.args[0]).toMatch('users');
    });

});
