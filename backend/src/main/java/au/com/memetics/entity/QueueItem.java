package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@Table(name = "queue_item")
@Schema(name = "Queue item")
@NoArgsConstructor
@Where(clause = "posted = 0")
public class QueueItem {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "queue_item_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @OneToOne
    @JoinColumn(name = "meme_id") // note: can be nullable for text-only tweet
    private Meme meme;

    @Column(name = "content")
    private String content;

    @Column(name = "hashtags")
    private String hashtags;

    @Column(name = "posted")
    private boolean posted;

    @Column(name = "text_only")
    private boolean textOnly;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "modified_date")
    private Date modifiedDate;

    @Version
    private long version;

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
