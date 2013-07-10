describe('User Edit Controller', function () {
    var $scope = null
        , $routeParams
        , location
        , ctrl = null
        , testUser = {_id: 1, name: 'Test User 1', age: 34, email: 'test@user1.com'};

    var userApiMock = {
        get: function () { return testUser; },
        update:function(id,callback){callback()}
    };

    beforeEach(module('user'));

    beforeEach(inject(function ($rootScope, $controller, $routeParams, $location) {
        $scope = $rootScope.$new();
        $routeParams.id = testUser._id;
        location = $location;

        spyOn(userApiMock, 'get').andCallThrough();

        ctrl = $controller('UserEditCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            $location: $location,
            userApi: userApiMock,
            message: {success: function () { }}
        });
    }));

    it('should bind user with id from query string', function () {
        expect(userApiMock.get.mostRecentCall.args[0]).toMatch({id: testUser._id});
        $scope.user.name.should.equal(testUser.name);
        $scope.user._id.should.equal(testUser._id);
    });

    it('should clear all user fields on reset', function () {
        $scope.cancel();
        $scope.user.name.should.equal('');
        $scope.user.age.should.equal('');
        $scope.user.email.should.equal('');
    });

    it('should update changes to the user and return to the user page', function () {

        $scope.user = 'updated';
        spyOn(userApiMock,'update').andCallThrough();
        spyOn(location,'path');

        $scope.save($scope.user);

        expect(userApiMock.update.mostRecentCall.args[0]).toMatch($scope.user);
        expect(location.path.mostRecentCall.args[0]).toMatch('users');
    });

});
