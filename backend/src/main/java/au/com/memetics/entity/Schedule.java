package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@Table(name = "schedule")
@Schema(name = "Schedule")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Slf4j
public class Schedule {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "modified_date")
    private Date modifiedDate;

    @ElementCollection(targetClass = String.class, fetch = EAGER)
    @CollectionTable(name = "schedule_day", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "day", nullable = false)
    private Set<String> days = new HashSet<>();

    @ElementCollection(targetClass = LocalTime.class, fetch = EAGER)
    @CollectionTable(name = "schedule_time", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "time", nullable = false)
    private Set<LocalTime> times = new HashSet<>();
    @Version
    private long version;

    public boolean isTwitter() {
        return profile.isTwitter();
    }

    public boolean hasDay(String day) {
        for (String d : days) {
            if (day.equalsIgnoreCase(d)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasTimeWithinRange(LocalTime lastTime, LocalTime currentTime) {
        return times.stream().anyMatch(time -> {
            log.info("Time " + time + " is after lastTime " + lastTime + " : " + time.isAfter(lastTime));
            log.info("Time " + time + " is before currentTime " + currentTime + " : " + time.isBefore(currentTime));
            return time.isAfter(lastTime) && (time.equals(currentTime) || time.isBefore(currentTime));
        });
    }

    @PrePersist
    public void prePersist() {
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.modifiedDate = new Date();
    }
}
