package au.com.memetics.controller;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.entity.QueueItem;
import au.com.memetics.service.ProfileService;
import au.com.memetics.service.QueueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Tag(name = "queue", description = "Manage queue")
@RestController
@RequestMapping("/")
@Slf4j
public class QueueItemController {
    private final ProfileService profileService;
    private final QueueService queueService;

    @Autowired
    public QueueItemController(final ProfileService profileService, QueueService queueService) {
        this.profileService = profileService;
        this.queueService = queueService;
    }

    @DeleteMapping("/rest/queue")
    @Operation(summary = "Get all queue items (queue) for a profile")
    public void deleteAllQueues() {
        queueService.deleteAllQueues();
    }

    @GetMapping("/rest/profiles/{profileId}/queue")
    @Operation(summary = "Get all queue items (queue) for a profile")
    public List<QueueItem> getQueue(@PathVariable("profileId") long profileId) {
        return queueService.getQueueForProfile(profileId);
    }

    @PostMapping("/rest/profiles/{profileId}/queue")
    @Operation(summary = "Create queue item.")
    @ResponseStatus(CREATED)
    public QueueItem createQueueItem(@PathVariable("profileId") long profileId, @RequestBody QueueItem queueItem) {
        return queueService.create(queueItem);
    }

    @PutMapping("/rest/profiles/{profileId}/queue/{queueId}")
    @Operation(summary = "Update a QueueItem.")
    public QueueItem update(@PathVariable("profileId") long profileId, @PathVariable("queueId") long queueId, @RequestBody QueueItem queueItem) {
        verifyQueueExists(queueId);
        return queueService.update(queueItem);
    }

    @DeleteMapping("/rest/profiles/{profileId}/queue/{queueId}")
    @Operation(summary = "Delete queue item.")
    @ResponseStatus(NO_CONTENT)
    public void deleteQueueItem(@PathVariable("profileId") long profileId, @PathVariable("queueId") long queueId) {
        verifyQueueExists(queueId);
        queueService.delete(queueId);
    }

    private void verifyProfileExists(final long id) {
        if (isNull(profileService.get(id))) {
            throw new NotFoundException();
        }
    }

    private QueueItem verifyQueueExists(final long id) {
        QueueItem queueItem = queueService.get(id);
        if (Objects.isNull(queueItem)) {
            throw new NotFoundException();
        }
        return queueItem;
    }
}
