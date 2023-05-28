package au.com.memetics.controller;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.entity.Comment;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;
import au.com.memetics.entity.MemeSearchResults;
import au.com.memetics.mapping.OldMapper;
import au.com.memetics.service.CommentService;
import au.com.memetics.service.MemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Tag(name = "memes", description = "Operations with memes")
@RestController
@RequestMapping("/rest/memes")
@Slf4j
public class MemeController {
    private final OldMapper oldMapper;
    private final MemeService service;
    private final CommentService commentService;

    @Autowired
    public MemeController(final OldMapper oldMapper, final MemeService service, CommentService commentService) {
        this.oldMapper = oldMapper;
        this.service = service;
        this.commentService = commentService;
    }

    @GetMapping("/pages")
    @SuppressWarnings("unchecked")
    @Operation(summary = "Get all memes with pagination")
    public List<Meme> getAll(final @RequestParam("start") int start,
                             final @RequestParam("size") int size) {
        if (start >= 0 && size >= 0) {
            return service.getAllPagination(start, size);
        }
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get meme by id")
    public Meme getMeme(final @PathVariable("id") long id) {
        return verifyMemeExists(id);
    }

    @PostMapping
    @Operation(summary = "Create meme")
    @ResponseStatus(CREATED)
    public Meme create(@RequestBody Meme meme) {
        return service.create(meme);
    }

    @PutMapping("/{id}")
    public Meme update(final @PathVariable("id") long id, @RequestBody Meme meme) {
        verifyMemeExists(id);
        return service.update(meme);
    }

    @DeleteMapping("/{id}")
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Delete profile. Admin only to prevent abuse.")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable("id") long id, @RequestParam(value = "deleteFromImgur", required = false) Boolean deleteFromImgur) {
        verifyMemeExists(id);
        service.delete(id, deleteFromImgur);
    }

    @GetMapping
    @Operation(summary = "Search for memes.")
    @SuppressWarnings("unchecked")
    public MemeSearchResults search(@ModelAttribute MemeSearchCriteria criteria) {
        return service.search(criteria);
    }

    @GetMapping("random")
    @Operation(summary = "Get a random meme")
    public Meme getRandomMeme() {
        return service.getRandomMeme();
    }

    @GetMapping("count")
    @Operation(summary = "Return total number of memes along with the time the count was taken.")
    public ResponseEntity<Object> getCount() {
        long count = service.getCount();
        Date countDate = new Date();

        HttpHeaders httpHeaders = new HttpHeaders();
//        "count", count

        return ResponseEntity.ok().headers(httpHeaders)
                .lastModified(countDate.getTime()).build();
    }

//    @GetMapping("/export")
////    @Produces("text/csv")
//    @Operation(summary = "Export memes to CSV file.")
//    @SuppressWarnings("unchecked")
//    public CsvExport export(@ModelAttribute MemeFilterBean memeFilterBean) {
//        List<Meme> memes = service.find(mapper.map(memeFilterBean, MemeSearchCriteria.class));
//        List<MemeExportDTO> exports = mapper.mapAsList(memes, MemeExportDTO.class);
//
//        CsvExport csvExport = new CsvExport();
//        csvExport.setFilename("results.csv");
//        csvExport.setExports(exports);
//
//        return csvExport;
//    }

    @GetMapping("/liked")
    @SuppressWarnings("unchecked")
    public List<Meme> getLiked(@RequestParam("profileId") final long profileId) {
        return service.getLiked(profileId);
    }

    @GetMapping("/unprocessed")
    @SuppressWarnings("unchecked")
    public List<Meme> getUnprocessed(@RequestParam("profileId") final long profileId) {
        return service.getUnprocessed(profileId);
    }

    @PutMapping("/{id}/increment-usage")
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Increment usage. Used by admins for manual adjustments.")
    public void incrementUsage(final @PathVariable("id") long id, @RequestBody Meme meme) {
        verifyMemeExists(id);
        service.incrementUsage(id);
    }

    @PutMapping("/{id}/decrement-usage")
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Decrement usage. Used by admin for manual adjustments.")
    public void decrementUsage(final @PathVariable("id") long id, @RequestBody Meme meme) {
        verifyMemeExists(id);
        service.decrementUsage(id);
    }

    private Meme verifyMemeExists(final long id) {
        Meme meme = service.get(id);
        if (isNull(meme)) {
            throw new NotFoundException();
        }
        return meme;
    }

    @GetMapping("{memeId}/comments")
    @Operation(summary = "Get comments for a meme.")
    public List<Comment> getCommentsForMeme(@PathVariable("memeId") long memeId) {
        return commentService.getCommentsForMeme(memeId);
    }

    @GetMapping("{memeId}/comments/{commentId}")
    @Operation(summary = "Get a particular comment for a meme.")
    public Comment get(@PathVariable("memeId") long memeId, @PathVariable("commentId") long commentId) {
        Comment comment = commentService.get(commentId);
        if (comment == null) {
            throw new NotFoundException();
        }
        return comment;
    }

    @PostMapping("{memeId}/comments")
    @Operation(summary = "Create a new comment for a meme.")
    @ResponseStatus(CREATED)
    public Comment create(@PathVariable("memeId") long memeId, @RequestBody Comment comment) {
        return commentService.create(comment);
    }

    @PutMapping("{memeId}/comments/{commentId}")
    @Operation(summary = "Update a comment for a meme.")
    public Comment update(@PathVariable("memeId") long memeId, @PathVariable("commentId") long commentId, @RequestBody Comment comment) {
        verifyCommentExists(commentId);
        return commentService.update(comment);
    }

    @DeleteMapping("{memeId}/comments/{commentId}")
    @Operation(summary = "Delete a comment for a meme.")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable("memeId") long memeId, @PathVariable("commentId") long commentId) {
        verifyCommentExists(commentId);
        commentService.delete(commentId);
    }

    private void verifyCommentExists(final long id) {
        if (isNull(commentService.get(id))) {
            throw new NotFoundException();
        }
    }

}
