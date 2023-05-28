package au.com.memetics.entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemeSearchResults {
    private MemeSearchCriteria criteria;
    private Long totalResultsCount;
    private List<Meme> results = new ArrayList<>();
}
