
describe("E2E: Creating a user", function () {

    beforeEach(function () {
        browser().navigateTo('#/users/create');
        expect(element('title').text()).toContain('Create User');
    });

    it('should be able to create a user', function () {
        input('user.name').enter('e2e test user');
        input('user.age').enter('34');
        input('user.email').enter('e2e@user.com');
        element(':button.btn-primary').click();

        expect(browser().location().path()).toBe("/users");

        expect(element('table tbody tr:first').html()).toContain('e2e test user');
        expect(element('table tbody tr:first').html()).toContain('34');
        expect(element('table tbody tr:first').html()).toContain('e2e@user.com');
    });

    it('should reset the user fields', function () {
        input('user.name').enter('e2e test user');
        input('user.age').enter('34');
        input('user.email').enter('e2e@user.com');
        element(':button.btn-warning').click();

        expect(browser().location().path()).toBe("/users/create");

        expect(input('user.name').val()).toBe('');
        expect(input('user.age').val()).toBe('');
        expect(input('user.email').val()).toBe('');

    });

    it('should not enable save button until form filled correctly', function () {
        input('user.name').enter('e2e test user');
        input('user.age').enter('34');
        input('user.email').enter('bad email address');

        expect(browser().location().path()).toBe("/users/create");
        expect(element(':button.btn-primary').attr('disabled')).toBe('disabled');

        input('user.email').enter('good@email.com');

        expect(element(':button.btn-primary').attr('disabled')).toBe(undefined);
    });

});