package au.com.memetics.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@SqlResultSetMapping(
        name = "tagStatsAggregated",
        classes = {
                @ConstructorResult(
                        targetClass = TagStatAggregated.class,
                        columns = {
                                @ColumnResult(name = "category", type = String.class),
                                @ColumnResult(name = "weight", type = Long.class)
                        })
        })
//@Schema(name = "tagStat")
@NoArgsConstructor
public class TagStatAggregated {
    @Id
    @Column(name = "category")
    private String category;

    @Column(name = "weight")
    private long weight;

    public TagStatAggregated(final String category, final long weight) {
        this.category = category;
        this.weight = weight;
    }
}
