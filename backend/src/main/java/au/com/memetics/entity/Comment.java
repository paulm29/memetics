package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@Table(name = "comment")
@Schema(name = "Comment")
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "comment_id")
    @Schema(readOnly = true)
    private Long id;

    //    @ManyToOne
//    @JoinColumn(name = "meme_id")
//    @JsonIgnoreProperties(value = {"votes", "comments"}, allowSetters = true)
    @Column(name = "meme_id")
    private long memeId;

    @ManyToOne
    @JoinColumn(name = "profile_profile_id", nullable = false)
    private Profile profile;

    @Column(name = "comment_text")
    private String commentText;

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
