package au.com.memetics.entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class Log4JavaScriptEntry {
    @SuppressWarnings("WeakerAccess")
    public enum Log4JavascriptLevel {
        DEBUG, INFO, WARN, ERROR
    }

    private long timestamp;
    private Log4JavascriptLevel level;
    private String url;
    private List<String> message = new ArrayList<>();
}
