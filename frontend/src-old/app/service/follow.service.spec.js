fdescribe("followService", function () {
    var followService, session;

    beforeEach(module("memetics"));
    beforeEach(inject(function (_followService_, _session_) {
        followService = _followService_;
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

    it("should be following", function () {

    });

    // it("should be following", function () {
    //     var profileToFollow = {id: 2};
    //     var profile = {id: 1, following: [{follower: profile, following: profileToFollow}] };
    //
    //     expect(followService.isFollowing(profile, profileToFollow)).toBe(true);
    // });
    //
    // it("should NOT be following", function () {
    //     var profile = {id: 1, following: [] };
    //     var profileToFollow = {id: 2};
    //
    //     expect(followService.isFollowing(profile, profileToFollow)).toBe(false);
    // });
    //
    // it("should follow", function () {
    //     var profile = {id: 1, following: [] };
    //     var profileToFollow = {id: 2};
    //
    //     followService.follow(profile, profileToFollow);
    //
    //     expect(followService.isFollowing(profile, profileToFollow)).toBe(true);
    // });
    //
    // it("should unfollow", function () {
    //     var profileToFollow = {id: 2};
    //     var profile = {id: 1, following: [{follower: {id:1}, following: profileToFollow}] };
    //
    //     followService.unfollow(profile, profileToFollow);
    //
    //     expect(followService.isFollowing(profile, profileToFollow)).toBe(false);
    // });
});
