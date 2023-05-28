package au.com.memetics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

import com.github.imgur.ImageUploadRequest;
import com.github.imgur.ImageUploadResponse;
import com.github.imgur.ImgUr;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.Tag;

@Service
@Slf4j
public class UploadService {
    private static final String UNPROCESSED = "unprocessed";

    @Value("${imgurClientId}")
    private String imgurClientId;

    private final MemeService memeService;
    private final TagService tagService;

    @Autowired
    public UploadService(final MemeService memeService, final TagService tagService) {
        this.memeService = memeService;
        this.tagService = tagService;
    }

    public void upload(final MultipartFile file, final String filename, final String tag, final Profile profile) throws UploadException {
        log.info(profile.getUsername() + " uploading " + filename);

        ImgUr imgur = new ImgUr(imgurClientId);
        ImageUploadRequest imageUploadRequest;
        ImageUploadResponse imageUploadResponse;

        try {
            imageUploadRequest = new ImageUploadRequest.Builder().withImageData(file.getBytes()).build();
            imageUploadResponse = imgur.call(imageUploadRequest);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UploadException(e, e.getMessage());
        }

        Meme meme = new Meme();
        meme.setUrl(imageUploadResponse.getLink());
        meme.setDeleteLink(imageUploadResponse.getDeleteHash());
        meme.setProfile(profile);
        String title = filename;
        if (title.contains(".")) {
            title = title.substring(0, title.lastIndexOf('.'));
        }
        meme.setTitle(title);

        if (!UNPROCESSED.equals(tag)) {
            Tag tagObject = tagService.get(tag);
            if (tagObject == null) {
                tagObject = new Tag(tag);
            }
            meme.getTags().add(tagObject);
        }

        memeService.create(meme);
    }
}
