package au.com.memetics.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class BufferRetweet {
    Map<String, String> retweet = new HashMap<>();
    boolean top;
}
