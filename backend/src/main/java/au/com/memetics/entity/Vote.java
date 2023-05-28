package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@Table(name = "vote")
@Schema(name = "Vote")
@NoArgsConstructor
public class Vote {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "vote_id")
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "meme_id")
//    @JsonIgnoreProperties(value = {"votes", "comments"}, allowSetters = true)
//    private Meme meme;

    @Column(name = "meme_id")
    private Long memeId;

    @Column(name = "profile_id")
    private Long profileId;

    @Column(name = "score")
    private Long score;

    @Version
    private long version;
}
