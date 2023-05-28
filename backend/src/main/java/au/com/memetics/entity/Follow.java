package au.com.memetics.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@EqualsAndHashCode
@Table(name = "follow")
//@Schema(name = "follow")
@NoArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @JsonIgnoreProperties(value = {"followers", "following"}, allowSetters = true)
    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
//    @NotFound(action = NotFoundAction.IGNORE)
    private Profile follower;

    @JsonIgnoreProperties(value = {"followers", "following"}, allowSetters = true)
    @ManyToOne
    @JoinColumn(name = "following_id", nullable = false)
//    @NotFound(action = NotFoundAction.IGNORE)
    private Profile following;

    @Version
    private long version;
}
