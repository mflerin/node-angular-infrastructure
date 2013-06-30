describe('Test runner', function () {
    var should = chai.should();
    it('should execute this test in the browser',function(){
        browser().navigateTo('/index.html#/users');
        var that = this;
        this.should.equal(that);
    });
});