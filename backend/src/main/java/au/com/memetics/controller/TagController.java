package au.com.memetics.controller;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;
import au.com.memetics.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@io.swagger.v3.oas.annotations.tags.Tag(name = "tags", description = "Operations with tags")
@RestController
@RequestMapping("/rest/tags")
@Slf4j
public class TagController {
    private final TagService service;

    @Autowired
    public TagController(final TagService tagService) {
        this.service = tagService;
    }

    @GetMapping
    @Operation(summary = "Get all tags")
    public List<Tag> getAll() {
        return service.getAll();
    }

    @GetMapping("stats")
    @Operation(summary = "Get stats for tags")
    public List<TagStat> getStats() {
        return service.getStats();
    }

    @GetMapping("stats-aggregated")
    @Operation(summary = "Get stats for tags with subcategories aggregated")
    public List<TagStatAggregated> getStatsWithSubcategoriesAggregated() {
        return service.getStatsWithSubcategoriesAggregated();
    }

    @GetMapping("unused")
    @Operation(summary = "Get unused tags")
    public List<Tag> getUnusedTags() {
        return service.getUnusedTags();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get tag by id")
    public Tag get(@PathVariable("id") long id) {
        Tag tag = service.get(id);
        if (tag == null) {
            throw new NotFoundException();
        }
        return tag;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a tag.")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable("id") long id) {
        verifyExists(id);
        service.delete(id);
    }

    private void verifyExists(final long id) {
        if (Objects.isNull(service.get(id))) {
            throw new NotFoundException();
        }
    }

    @PostMapping
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Create tag. Admin only.")
    @ResponseStatus(CREATED)
    public Tag create(@RequestBody Tag tag) {
        return service.create(tag);
    }
}
