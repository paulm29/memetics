fdescribe("profileService", function () {
    var profileService, session;

    beforeEach(module("memetics"));
    beforeEach(inject(function (_profileService_, _session_) {
        profileService = _profileService_;
        session = _session_;
    }));
    beforeEach(function() {
        session.user = {
            "username": "user@email.com",
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "enabled": true,
            "id": 1,
            "email": "drmobutu@gmail.com",
            "nickname": "nickname",
            "country": "country",
            "firstName": "First name",
            "lastName": "Last name",
            "city": "city",
            "state": "state",
            "webSite": "website",
            "modifiedDate": 1488280409000,
            "createdDate": 1485180000000,
            "role": "ROLE_ADMIN",
            "socialMediaSignin": "TWITTER",
            "version": 0,
            "followers": [],
            "following": [],
            "userId": "user@email.com"
        };
    });

    it("should be Twitter account", function () {
        session.user.socialMediaSignin = "TWITTER";

        expect(profileService.isTwitterAccount()).toBe(true);
    });

    it("should NOT be Twitter account", function () {
        session.user.socialMediaSignin = "";

        expect(profileService.isTwitterAccount()).toBe(false);
    });

    it("should be Facebook account", function () {
        session.user.socialMediaSignin = "FACEBOOK";

        expect(profileService.isFacebookAccount()).toBe(true);
    });

    it("should NOT be Facebook account", function () {
        session.user.socialMediaSignin = "";

        expect(profileService.isFacebookAccount()).toBe(false);
    });

    it("should be Form account", function () {
        session.user.socialMediaSignin = "";

        expect(profileService.isStandardAccount()).toBe(true);
    });

    it("should NOT be standard account", function () {
        session.user.socialMediaSignin = "TWITTER";

        expect(profileService.isStandardAccount()).toBe(false);
    });
});
