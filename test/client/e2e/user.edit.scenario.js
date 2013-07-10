
describe("E2E: Edit a user", function () {

    beforeEach(function () {
        browser().navigateTo('#/users/create');
        expect(element('title').text()).toContain('Create User');
        input('user.name').enter('to be deleted');
        input('user.age').enter('34');
        input('user.email').enter('e2e@user.com');
        element(':button.btn-primary').click();

        expect(browser().location().path()).toBe("/users");
    });

    it('should be to update a user', function () {
        expect(element('table tbody tr:first').html()).toContain('to be deleted');
        element('table tbody td:nth-child(2):first a').click();
        expect(element('title').text()).toContain('Edit User');

        input('user.name').enter('to be updated');
        element(':button.btn-primary').click();

        expect(browser().location().path()).toBe("/users");
        expect(element('table tbody tr:first').html()).toContain('to be updated');
    });
});
