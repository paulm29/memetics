package au.com.memetics.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.TemporalType.TIMESTAMP;


@Getter
@Setter
@Entity
@Table(name = "meme")
@SQLDelete(sql = "UPDATE meme SET is_active = 0 WHERE meme_id = ? AND version = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "is_active = 1")
@Schema(name = "Meme")
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Meme {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "meme_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @NotBlank
    @Size(max = 100)
    @Column(name = "title")
    private String title;

    @Column(name = "created_date")
    @Temporal(TIMESTAMP)
    private Date createdDate;

    @Column(name = "modified_date")
    @Temporal(TIMESTAMP)
    private Date modifiedDate;

    @Size(max = 280)
    @Column(name = "caption")
    private String caption;

    @Size(max = 100)
    @Column(name = "credits")
    private String credits;

    @Column(name = "original_content")
    private boolean originalContent;

    @NotBlank
    @Size(max = 100)
    @Column(name = "url")
    private String url;

    //    @JsonIgnore // prevent abuse
    @JsonProperty(access = WRITE_ONLY)
    @Column(name = "delete_link")
    private String deleteLink;

    @Column(name = "usage_count")
    private long usageCount;

    @Column(name = "duplicate")
    private long duplicate;

    @Version
    private long version;

    @Column(name = "IS_ACTIVE")
    private boolean active = true;
    @OneToMany(fetch = EAGER)
    @JoinColumn(name = "meme_id", nullable = false, insertable = false, updatable = false)
//    @OneToMany(mappedBy = "meme", fetch = EAGER)
//    @JsonIgnoreProperties(value = {"comments"}, allowSetters = true)
    private Set<Comment> comments = new HashSet<>(); // maintain order, but no duplicates
    @ManyToMany(fetch = EAGER, cascade = ALL)
    @JoinTable(name = "meme_tag",
            joinColumns = @JoinColumn(name = "meme_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new LinkedHashSet<>(); // maintain order, but no duplicates
    //    @OneToMany(mappedBy = "meme", fetch = EAGER)
//    @JsonIgnoreProperties(value = {"votes"}, allowSetters = true)
    @OneToMany(fetch = EAGER)
    @JoinColumn(name = "meme_id", nullable = false, insertable = false, updatable = false)
    private Set<Vote> votes = new HashSet<>();

    @PrePersist
    public void prePersist() {
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.modifiedDate = new Date();
    }

    public long getScore() {
        return votes.stream().mapToLong(Vote::getScore).sum();
    }

    public double getAverage() {
        return votes.stream().mapToLong(Vote::getScore).average().orElse(0);
    }

    public long getUpvotes() {
        return votes.stream().filter(vote -> vote.getScore() == 1).count();
    }

    public long getDownvotes() {
        return votes.stream().filter(vote -> vote.getScore() == -1).count();
    }
}
