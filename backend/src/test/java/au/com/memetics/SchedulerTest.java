package au.com.memetics;

import au.com.memetics.entity.Profile;
import au.com.memetics.entity.Schedule;
import au.com.memetics.service.ScheduleService;
import au.com.memetics.service.Scheduler;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.assertThat;

public class SchedulerTest extends AbstractTest {
    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private Scheduler scheduler;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/queue_item_empty.xml", "classpath:dbunit/schedule_empty.xml"})
    public void shouldFindTimeInSchedule() throws Exception {
        setUpSchedule();

        assertThat(scheduler.checkSchedule(), hasSize(1));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/queue_item_empty.xml", "classpath:dbunit/schedule_empty.xml"})
    public void shouldNotFindTimeInSchedule() throws Exception {
        assertThat(scheduler.checkSchedule(), hasSize(0));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/queue_item.xml", "classpath:dbunit/schedule_empty.xml"})
    public void shouldGetQueueItem() throws Exception {
        assertThat(scheduler.getQueueItem(11L), notNullValue());
    }

    private void setUpSchedule() {
        Profile profile = new Profile();
        profile.setId(11L);

        Set<String> days = new HashSet<>();
        days.add(LocalDate.now().getDayOfWeek().toString());

        Set<LocalTime> times = new HashSet<>();
        times.add(LocalTime.now());

        Schedule schedule = Schedule.builder().profile(profile).days(days).times(times).build();
        scheduleService.create(schedule);
    }
}
