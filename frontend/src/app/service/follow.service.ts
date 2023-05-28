import {Injectable} from "@angular/core";
import {MemeticsClient} from "./memetics.client";

@Injectable()
export class FollowService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  follow(profile, profileToFollow) {
    const follow = {
      follower: profile,
      following: profileToFollow
    };
    return this.memeticsClient.followCreate(profile, follow);
  }

  isFollowing(profile, otherProfile) {
    if (!profile || !otherProfile) {
      return;
    }
    return profile.following.find(f => f.following.id === otherProfile.id);
  }

  unfollow(profile, follow) {
    return this.memeticsClient.followDelete(profile, follow);
  }

  // function follow(profile, profileToFollow) {
  //     const profileClone = cloneProfile(profile);
  //     const profileToFollowClone = cloneProfile(profileToFollow);
  //
  //     const follow = {
  //         follower: profileClone,
  //         following: profileToFollowClone
  //     };
  //     profile.following.push(follow);
  //
  //     return memeticsClient.profileUpdate(profile);
  // }

  // function cloneProfile(profile) {
  //     const profileClone = _.clone(profile);
  //     delete profileClone.following;
  //     delete profileClone.followers;
  //     return profileClone;
  // }

  // function unfollow(profile, profileToUnfollow) {
  //     profile.following = _.reject(profile.following, follow =>  follow.following.id === profileToUnfollow.id);
  //
  //      // profileToUnfollow.followers = _.reject(profile.followers, function(p){
  //     //     return p.follower.id === profile.id;
  //     // });
  //
  //     console.log("unfollow");
  //     console.log(profile);
  //
  //     return memeticsClient.profileUpdate(profile);
  // }
  //
  // function isFollowing(profile, otherProfile) {
  //     if(_.isUndefined(profile) || _.isUndefined(otherProfile)) {
  //         return;
  //     }
  //     return _.find(profile.following, p => p.following.id === otherProfile.id);
  // }
}
