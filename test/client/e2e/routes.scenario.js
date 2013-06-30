var should = chai.should();

describe("E2E: Testing Routes", function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    it('should have a working users list route', function() {
        browser().navigateTo('#/users');
        expect(browser().location().path()).toBe("/users");
        expect(element('title').text()).toContain('User List');
    });

    it('should have a working edit users route', function() {
        browser().navigateTo('#/users/edit/10');
        expect(browser().location().path()).toBe("/users/edit/10");
        expect(element('title').text()).toContain('Edit Users');
    });

    it('should have a working create users route', function() {
        browser().navigateTo('#/users/create');
        expect(browser().location().path()).toBe("/users/create");
        expect(element('title').text()).toContain('Create User');
    });

});
