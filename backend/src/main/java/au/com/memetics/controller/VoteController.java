package au.com.memetics.controller;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.entity.Vote;
import au.com.memetics.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.CREATED;

@Tag(name = "votes", description = "Operations with votes")
@RestController
@RequestMapping("/rest/votes")
@Slf4j
public class VoteController {
    private final VoteService service;

    @Autowired
    public VoteController(final VoteService voteService) {
        this.service = voteService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get vote by id")
    public Vote get(@PathVariable("id") long id) {
        Vote vote = service.get(id);
        if (isNull(vote)) {
            throw new NotFoundException();
        }
        return vote;
    }

    @GetMapping("/meme/{memeId}")
    @Operation(summary = "Get votes for meme")
    public List<Vote> getByMeme(@RequestParam("memeId") long id) {
        return service.getByMemeId(id);
    }

    @GetMapping("/profile/{id}")
    @Operation(summary = "Get votes for profile")
    public List<Vote> getByProfile(@RequestParam("profileId") long id) {
        return service.getByProfileId(id);
    }

    @PostMapping
    @Operation(summary = "Create meme")
    @ResponseStatus(CREATED)
    public Vote create(@RequestBody Vote vote) {
        return service.create(vote);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update vote")
    public Vote update(@PathVariable("id") long id, @RequestBody Vote vote) {
        verifyExists(id);
        return service.update(vote);
    }

    private void verifyExists(final long id) {
        if (isNull(service.get(id))) {
            throw new NotFoundException();
        }
    }
}
