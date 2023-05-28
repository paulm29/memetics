package au.com.memetics.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@SqlResultSetMapping(
        name = "tagStats",
        classes = {
                @ConstructorResult(
                        targetClass = TagStat.class,
                        columns = {
                                @ColumnResult(name = "tagId", type = Long.class),
                                @ColumnResult(name = "text", type = String.class),
                                @ColumnResult(name = "weight", type = Long.class)
                        })
        })
//@Schema(name = "tagStat")
@NoArgsConstructor
public class TagStat {
    @Id
    @Column(name = "tagId")
    private Long tagId;

    @Column(name = "text")
    private String text;

    @Column(name = "weight")
    private long weight;

    public TagStat(final Long tagId, final String text, final long weight) {
        this.tagId = tagId;
        this.text = text;
        this.weight = weight;
    }
}
