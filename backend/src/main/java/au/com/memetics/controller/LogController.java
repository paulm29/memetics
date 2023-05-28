package au.com.memetics.controller;

import au.com.memetics.entity.Log4JavaScriptEntry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@Slf4j
@Tag(name = "log", description = "Operations with log")
public class LogController {

    @PostMapping(value = "/log", consumes = APPLICATION_JSON_VALUE)
    @Operation(summary = "Post log entries")
    public void log(@RequestBody final List<Log4JavaScriptEntry> logEntries) {
        logEntries.forEach(this::log);
    }

    private void log(final Log4JavaScriptEntry logEntry) {
        String msg = logEntry.toString();
        switch (logEntry.getLevel()) {
            case DEBUG:
                log.debug(msg);
                break;
            case INFO:
                log.info(msg);
                break;
            case WARN:
                log.warn(msg);
                break;
            case ERROR:
                log.error(msg);
                break;
            default:
                log.debug(msg);
        }
    }
}
