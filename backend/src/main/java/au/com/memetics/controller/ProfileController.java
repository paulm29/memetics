package au.com.memetics.controller;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.*;
import au.com.memetics.mapping.OldMapper;
import au.com.memetics.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Tag(name = "profiles", description = "Manage profiles")
@RestController
@RequestMapping("/rest/profiles")
@Slf4j
public class ProfileController {
    private final ProfileService profileService;
    private final StatsService statsService;
    private final FollowService followService;
    private final QueueService queueService;
    private final ScheduleService scheduleService;
    private final HashtagFavouriteService hashtagFavouriteService;
    private final CommentService commentService;

    @Autowired
    public ProfileController(final ProfileService profileService, StatsService statsService, FollowService followService, QueueService queueService, ScheduleService scheduleService, HashtagFavouriteService hashtagFavouriteService, OldMapper oldMapper, CommentService commentService) {
        this.profileService = profileService;
        this.statsService = statsService;
        this.followService = followService;
        this.queueService = queueService;
        this.scheduleService = scheduleService;
        this.hashtagFavouriteService = hashtagFavouriteService;
        this.commentService = commentService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get profile by id")
    public Profile get(final @PathVariable("id") long id) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return profile;
    }

    @GetMapping("/comments")
    @Operation(summary = "Get all comments for all memes (memeId ignored). Optional filter on profile.")
    public List<Comment> getAllComments(@RequestParam(value = "profileId", required = false) Long profileId) {
        return commentService.getAll(profileId);
    }

    @GetMapping
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Get all profiles. Admin only.")
    public List<Profile> getAll(@ModelAttribute ProfileSearchCriteria profileSearchCriteria) {
        return profileService.search(profileSearchCriteria);
    }

    @GetMapping("/nickname/{nickname}")
    @Operation(summary = "Get profile by nickname")
    public Profile getByNickname(final @PathVariable("nickname") String nickname) {
        Profile profile = profileService.getByNickname(nickname);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return profile;
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get profile by email")
    public Profile getByEmail(final @PathVariable("email") String email) {
        Profile profile = profileService.getByEmail(email);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return profile;
    }

    @PostMapping
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Create profile. Admin only.")
    @ResponseStatus(CREATED)
    public Profile create(@RequestBody Profile profile) {
        return profileService.create(profile);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@securityService.canAccess(#id)")
    @Operation(summary = "Update profile")
    public Profile update(final @PathVariable("id") long id, @RequestBody ProfileDTO profile) {
        verifyProfileExists(id);
        return profileService.update(profile);
    }

    @DeleteMapping("/{id}")
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Delete profile. Admin only.")
    @ResponseStatus(NO_CONTENT)
    public void deleteProfile(final @PathVariable("id") long id) {
        verifyProfileExists(id);
        profileService.delete(id);
    }

    @GetMapping("/{id}/stats")
    @Operation(summary = "Get profile by id")
    public ProfileStats getStats(final @PathVariable("id") long id) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }

        return profileService.getStats(profile.getId());
    }

    @GetMapping("/{id}/stats-retweets")
    @Operation(summary = "Get retweet stats by profile id")
    public StatsRetweets getStatsRetweets(final @PathVariable("id") long id, @ModelAttribute TweetSearchCriteria criteria) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return statsService.getRetweets(criteria);
    }

    @PostMapping("/{id}/stats-retweets-publish")
    @ResponseStatus(CREATED)
    public Long publishRetweets(final @PathVariable("id") long id, @RequestBody TweetPost tweetPost) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return statsService.publishRetweets(tweetPost);
    }

    @GetMapping("/{id}/stats-retweets-embed")
    @Operation(summary = "Get retweet stats by profile id")
    public StatsRetweets getStatsRetweetsAsEmbed(final @PathVariable("id") long id, @RequestParam("startDate") String startDate) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return statsService.getRetweetsEmbed(startDate);
    }

    @GetMapping("/{id}/stats-tweets")
    @Operation(summary = "Get retweet stats by profile id")
    public StatsTweets getStatsTweets(final @PathVariable("id") long id, @RequestParam("startDate") String startDate, @RequestParam("maxRetweets") Integer maxRetweets, @RequestParam("maxLikes") Integer maxLikes) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return statsService.getTweets(startDate, maxRetweets, maxLikes);
    }

    @GetMapping("/{profileId}/stats-tweets-memetics")
    @Operation(summary = "Get tweets by profile id")
    public List<TweetInfo> getTweets(final @PathVariable("profileId") long id) {
        Profile profile = profileService.get(id);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return statsService.getTweetInfos(id);
    }

    @PostMapping("/{profileId}/follows")
    @Operation(summary = "Create follow")
    @ResponseStatus(CREATED)
    public Follow create(@PathVariable("profileId") long profileId, @RequestBody Follow follow) {
        return followService.create(follow);
    }

    @DeleteMapping("/{profileId}/follows/{followId}")
    @Operation(summary = "Delete follow")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable("profileId") long profileId, @PathVariable("followId") long followId) {
        followService.delete(followId);
    }

    @PostMapping("/{profileId}/hashtag-favourites")
    @Operation(summary = "Create hashtag favourite.")
    @ResponseStatus(CREATED)
    public HashtagFavourite createHashtagFavourite(@PathVariable("profileId") long profileId, @RequestBody HashtagFavourite hashtagFavourite) {
        return hashtagFavouriteService.createHashtagFavourite(hashtagFavourite);
    }

    @DeleteMapping("/{profileId}/hashtag-favourites/{hashtagFavouriteId}")
    @Operation(summary = "Delete hashtag favourite.")
    @ResponseStatus(NO_CONTENT)
    public void deleteHashtagFavourite(@PathVariable("profileId") long profileId, @PathVariable("hashtagFavouriteId") long hashtagFavouriteId) {
        hashtagFavouriteService.deleteHashtagFavourite(hashtagFavouriteId);
    }

    @GetMapping("{profileId}/schedule")
    @Operation(summary = "Get schedule for a profile")
    public Schedule getSchedule(@PathVariable("profileId") long profileId) {
        Schedule schedule = scheduleService.findByProfileId(profileId);
        if (isNull(schedule)) {
            throw new NotFoundException();
        }
        return schedule;
    }

    @PostMapping("{profileId}/schedule")
    @Operation(summary = "Create schedule")
    @ResponseStatus(CREATED)
    public Schedule createSchedule(@PathVariable("profileId") long profileId, @RequestBody Schedule schedule) {
        return scheduleService.create(schedule);
    }

    @PutMapping("{profileId}/schedule/{scheduleId}")
    @Operation(summary = "Update a schedule.")
    public Schedule update(@PathVariable("profileId") long profileId, @PathVariable("scheduleId") long scheduleId, final Schedule schedule) {
        verifyScheduleExists(scheduleId);
        return scheduleService.update(schedule);
    }

    private void verifyProfileExists(final long id) {
        if (isNull(profileService.get(id))) {
            throw new NotFoundException();
        }
    }

    private void verifyScheduleExists(final long id) {
        if (Objects.isNull(scheduleService.get(id))) {
            throw new NotFoundException();
        }
    }
}
