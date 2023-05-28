package au.com.memetics.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileStats {
    private long memesCreated;
    private long memesLikedByMe;
    private long memesByMeLikedByOthers;
    private long commentsMine;
    private long following;
    private long followers;
}
