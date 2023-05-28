package au.com.memetics.service;

import au.com.memetics.dao.ProfileDaoCustom;
import au.com.memetics.dao.UserRepository;
import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import au.com.memetics.entity.ProfileStats;
import au.com.memetics.mapping.ProfileMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.Objects.nonNull;

@Service
@Primary
@Slf4j
public class ProfileServiceImpl implements UserDetailsService, ProfileService {
    private final UserRepository userRepository;
    @Autowired
    private ProfileDaoCustom profileDao;
    @Autowired
    private FollowService followService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private MemeService memeService;
    @Autowired
    private VoteService voteService;

    @Autowired
    public ProfileServiceImpl(final UserRepository userRepository, final FollowService followService) {
        this.userRepository = userRepository;
        this.followService = followService;
    }

    public Profile getProfileFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Profile) authentication.getPrincipal();
    }

    @Override
    public Profile get(final long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public Profile getByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Profile getByNickname(final String nickname) {
        return userRepository.findByNickname(nickname);
    }

    public List<Profile> search(final ProfileSearchCriteria criteria) {
        return profileDao.findBy(criteria);
    }

    public ProfileStats getStats(final long profileId) {
        ProfileStats stats = new ProfileStats();

        stats.setFollowers(followService.getFollowersCountForProfile(profileId));
        stats.setFollowing(followService.getFollowingCountForProfile(profileId));
        stats.setMemesCreated(memeService.getMemeCountForProfile(profileId));
        stats.setCommentsMine(commentService.getCommentsCountForProfile(profileId));
        stats.setMemesLikedByMe(voteService.getNumberOfMemesIveLiked(profileId));
        stats.setMemesByMeLikedByOthers(voteService.getNumberOfLikesForAllMyMemes(profileId));

        return stats;
    }

    @Override
    @Transactional
    public Profile create(final Profile profile) {
//        processFollows(profile);
        return userRepository.save(profile);
    }

    @Override
    @Transactional
    public Profile update(final ProfileDTO dto) {
        Profile processed = ProfileMapper.INSTANCE.toEntity(dto);
        return userRepository.save(processed);
    }

//    private Profile processFollows(final ProfileDTO dto) {
//        Profile entity =
//


//        if (!isEmpty(profile.getFollowers())) {
//            Set<Follow> followers = profile.getFollowers().stream().map(follow -> {
//                if (follow.getId() == null) {
//                    Follow newFollow = new Follow();
//                    newFollow.setFollower(follow.getFollower());
//                    newFollow.setFollowing(follow.getFollowing());
//                    return newFollow;
//                }
//                return followService.get(follow.getId());
//            }).collect(toSet());
//
//            profile.getFollowers().clear();
//            profile.getFollowers().addAll(followers);
//        } else {
//            profile.getFollowers().clear();
//        }
//
//        if (!isEmpty(profile.getFollowing())) {
//            Set<Follow> following = profile.getFollowing().stream().map(follow -> {
//                if (follow.getId() == null) {
//                    Follow newFollow = new Follow();
//                    newFollow.setFollower(follow.getFollower());
//                    newFollow.setFollowing(follow.getFollowing());
//                    return newFollow;
//                }
//                return followService.get(follow.getId());
//            }).collect(toSet());
//
//            profile.getFollowing().clear();
//            profile.getFollowing().addAll(following);
//        } else {
//            profile.getFollowing().clear();
//        }

//        return entity;
//    }

    @Override
    public void delete(final long id) {
        userRepository.deleteById(id);
    }

    /**
     * Loads the user information.
     *
     * @param username The username of the requested user.
     * @return The information of the user.
     * @throws UsernameNotFoundException Thrown if no user is found with the given username.
     */
    @Override
    public Profile loadUserByUsername(final String username) throws UsernameNotFoundException {
        Profile profile = userRepository.findByEmail(username);
        if (profile == null) {
            throw new UsernameNotFoundException("No profile found with username: " + username);
        }

        log.debug("Returning profile details: {}", profile);

        return profile;
    }

    public boolean emailCheck(String email) {
        return nonNull(userRepository.findByEmail(email));
    }

    public boolean nicknameCheck(String nickname) {
        return nonNull(userRepository.findByNickname(nickname));
    }


}
