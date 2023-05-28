package au.com.memetics.service;

import au.com.memetics.controller.ApplicationConfig;
import au.com.memetics.entity.MemeTweet;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.QueueItem;
import au.com.memetics.entity.Schedule;
import au.com.memetics.mapping.MemeTweetMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;

@Component
@Slf4j
public class Scheduler {
    private static final int INITIAL_DELAY = 5 * 60 * 1000; // 5 minutes, enough time to check what's in queue while developing
    private static final int RATE = 5 * 60 * 1000; // 5 minutes
    private final ScheduleService scheduleService;
    private final QueueService queueService;
    private final TweetService tweetService;
    private final ApplicationConfig applicationConfig;

    public Scheduler(ScheduleService scheduleService, QueueService queueService, TweetService tweetService, ApplicationConfig applicationConfig) {
        this.scheduleService = scheduleService;
        this.queueService = queueService;
        this.tweetService = tweetService;
        this.applicationConfig = applicationConfig;
    }

    @Scheduled(initialDelay = INITIAL_DELAY, fixedRate = RATE)
    public void run() {
        log.info("Scheduler running at rate: " + RATE);
        checkSchedule().forEach(schedule -> sendTweetFromQueue(schedule.getProfile()));
    }

    public List<Schedule> checkSchedule() {
        List<Schedule> schedules = scheduleService.getAll();

        String currentDay = LocalDateTime.now().getDayOfWeek().toString();
        LocalTime lastTime = LocalTime.now().minus(RATE, ChronoUnit.MILLIS);
        LocalTime currentTime = LocalTime.now();

        return schedules.stream()
                .filter(Schedule::isTwitter)
                .filter(schedule -> schedule.hasDay(currentDay))
                .filter(schedule -> schedule.hasTimeWithinRange(lastTime, currentTime))
                .collect(toList());
    }

    private void sendTweetFromQueue(Profile profile) {
        log.info("sendTweetFromQueue");

        QueueItem queueItem = getQueueItem(profile.getId());

        if (nonNull(queueItem)) {
            log.info("Sending tweet for " + profile.getId() + " " + applicationConfig.isSendTweetsViaScheduler() + " at rate " + RATE);

            if (applicationConfig.isSendTweetsViaScheduler()) {
                MemeTweet memeTweet = MemeTweetMapper.INSTANCE.fromQueueItem(queueItem);
                memeTweet.setText(queueItem.getContent() + queueItem.getHashtags());

                tweetService.tweetMeme(tweetService.getConnectionForProfileUsername(profile.getUsername()), memeTweet);
                queueItem.setPosted(true);
                queueService.update(queueItem);
            }
        } else {
            log.info("No queue item found");
        }
    }

    public QueueItem getQueueItem(Long profileId) {
        log.info("getQueueItem: " + profileId);

        List<QueueItem> queue = queueService.getQueueForProfile(profileId);
        Optional<QueueItem> queueItem = queue.stream().filter(qi -> !qi.isPosted()).findFirst();
        return queueItem.orElse(null);
    }

}
