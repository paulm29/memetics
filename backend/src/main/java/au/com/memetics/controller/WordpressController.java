package au.com.memetics.controller;

import au.com.memetics.dto.PostDto;
import au.com.memetics.service.WordpressService;
import com.afrozaar.wordpress.wpapi.v2.model.Post;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@Tag(name = "wordpress", description = "Operations with wordpress posts")
@RestController
@RequestMapping("/rest/posts")
@Slf4j
public class WordpressController {
    private final WordpressService wordpressService;

    public WordpressController(WordpressService wordpressService) {
        this.wordpressService = wordpressService;
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public Post postCreate(@RequestBody PostDto post) {
        return wordpressService.postCreate(post);
    }

    @GetMapping
    public List<Post> postSearch() {
        return wordpressService.postSearch();
    }
}
