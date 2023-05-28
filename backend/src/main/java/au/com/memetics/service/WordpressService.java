package au.com.memetics.service;

import au.com.memetics.dto.PostDto;
import au.com.memetics.dto.ReferenceDataItemDto;
import au.com.memetics.mapping.ReferenceDataItemDtoMapper;
import com.afrozaar.wordpress.wpapi.v2.Wordpress;
import com.afrozaar.wordpress.wpapi.v2.config.ClientConfig;
import com.afrozaar.wordpress.wpapi.v2.config.ClientFactory;
import com.afrozaar.wordpress.wpapi.v2.exception.PostCreateException;
import com.afrozaar.wordpress.wpapi.v2.exception.WpApiParsedException;
import com.afrozaar.wordpress.wpapi.v2.model.Media;
import com.afrozaar.wordpress.wpapi.v2.model.Post;
import com.afrozaar.wordpress.wpapi.v2.model.PostStatus;
import com.afrozaar.wordpress.wpapi.v2.model.builder.ContentBuilder;
import com.afrozaar.wordpress.wpapi.v2.model.builder.ExcerptBuilder;
import com.afrozaar.wordpress.wpapi.v2.model.builder.PostBuilder;
import com.afrozaar.wordpress.wpapi.v2.model.builder.TitleBuilder;
import com.afrozaar.wordpress.wpapi.v2.request.Request;
import com.afrozaar.wordpress.wpapi.v2.request.SearchRequest;
import com.afrozaar.wordpress.wpapi.v2.response.PagedResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.twitter.api.MediaEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.nonNull;

@Service
@Slf4j
public class WordpressService {
    private static final long TOP_10_CATEGORY = 3;
    private static final long TOP_20_CATEGORY = 4;
    private static final long FEATURED_CATEGORY = 16;
    private static final boolean usePermalinkEndpoint = false;
    private static final boolean debug = true;

    @Value("${wordpressBaseUrl:http://aupolnews.com}")
    private String wordpressBaseUrl;

    @Value("${wordpressUsername:admin}")
    private String wordpressUsername;

    @Value("${wordpressPassword:Babyg101}")
    private String wordpressPassword;

    public Media mediaCreate(MediaEntity mediaEntity) {
        final Wordpress client = getClient();

        Media media = new Media();
        media.setSourceUrl(mediaEntity.getMediaUrl());
//        Resource resource = mediaEntity.

        try {
            return client.createMedia(media, null);
        } catch (WpApiParsedException e) {
            e.printStackTrace();
        }
        return null;
    }


    public Post postCreate(PostDto postDto) {
        final Wordpress client = getClient();

        List<Long> categories = new ArrayList<>();
        if(nonNull(postDto.getCategory())) {
            categories.add(Integer.toUnsignedLong(postDto.getCategory()));
        } else {
            categories.add(TOP_10_CATEGORY);
            categories.add(FEATURED_CATEGORY);
        }
        final Post post = PostBuilder.aPost()
                .withTitle(TitleBuilder.aTitle().withRendered(postDto.getTitle()).build())
                .withExcerpt(ExcerptBuilder.anExcerpt().withRendered(postDto.getExcerpt()).build())
                .withContent(ContentBuilder.aContent().withRendered(postDto.getContent()).build())
                .withCategories(categories)
//                .withDate() // TODO
                .build();

        Post createdPost = null;
        try {
            log.info("Post", post);
            createdPost = client.createPost(post, PostStatus.draft);
        } catch (PostCreateException e) {
            log.error("Error creating post", e);
        }

        return createdPost;
    }

    public List<Post> postSearch() {
        final Wordpress client = getClient();
//        final PagedResponse<Post> response = client.search(SearchRequest.Builder.aSearchRequest(Post.class)
//                .withUri(Request.POSTS)
//                .withParam("filter[meta_key]", "baobab_indexed")
//                .withParam("filter[meta_compare]", "NOT EXISTS") //RestTemplate takes care of escaping values ('space' -> '%20')
//                .build());
        SearchRequest<Post> sr = SearchRequest.Builder.aSearchRequest(Post.class)
                        .withUri(Request.POSTS)
//                        .withFilter("title",episode.getTitle())
//                        .withFilter("status","draft")
                        .build();

        PagedResponse<Post> response = client.search(sr);

        return response.getList();
    }

    public List<ReferenceDataItemDto> getCategories() {
        final Wordpress client = getClient();

        return ReferenceDataItemDtoMapper.INSTANCE.fromTerms(client.getCategories());
    }

    private Wordpress getClient() {
        return ClientFactory.fromConfig(ClientConfig.of(wordpressBaseUrl, wordpressUsername, wordpressPassword, usePermalinkEndpoint, debug));
    }
}
