package au.com.memetics.service;


import au.com.memetics.dao.MemeDao;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;
import au.com.memetics.entity.MemeSearchResults;
import au.com.memetics.entity.Tag;
import com.github.imgur.ImageDeleteRequest;
import com.github.imgur.ImageDeleteResponse;
import com.github.imgur.ImgUr;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toSet;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@Slf4j
public class MemeService {
    private final MemeDao dao;
    private final TagService tagService;

    @Value("${imgurClientId}")
    private String imgurClientId;

    @Autowired
    public MemeService(final MemeDao memeDao, final TagService tagService) {
        this.dao = memeDao;
        this.tagService = tagService;
    }

    public long getCount() {
        return dao.count();
    }

    public List<Meme> getAll() {
        return dao.findAll();
    }

    public List<Meme> getAllPagination(final int start, final int size) {
        return dao.findAll().subList(start, size);
    }

    public List<Meme> find(final MemeSearchCriteria criteria) {
        return dao.findBy(criteria);
    }

    public MemeSearchResults search(MemeSearchCriteria criteria) {
        MemeSearchResults results = new MemeSearchResults();
        results.setCriteria(criteria);
        results.setTotalResultsCount(dao.findByCount(criteria));
        results.setResults(dao.findBy(criteria));
        return results;
    }

    @Transactional
    public Meme get(final long id) {
        return dao.findById(id).orElse(null);
    }

    public Meme getRandomMeme() {
        return dao.findRandom();
    }

    @Transactional
    public Meme create(final Meme meme) {
        processTags(meme);
        return dao.save(meme);
    }

    @Transactional
    public Meme update(final Meme meme) {
        processTags(meme);
        return dao.save(meme);
    }

    private void processTags(final Meme meme) {
        if (meme.getTags() != null) {
            Set<Tag> tags = meme.getTags().stream().map(tag -> {
                Tag existing = tagService.get(tag.getName());
                if (existing == null) {
                    existing = new Tag();
                    existing.setName(tag.getName());
                }
                return existing;
            }).collect(toSet());

            meme.getTags().clear();
            meme.getTags().addAll(tags);
        }
    }

    @Transactional
    public void delete(final Long id, final Boolean deleteFromImgur) {
        if (nonNull(deleteFromImgur) && deleteFromImgur) {
            String deleteLink = dao.getOne(id).getDeleteLink();
            if (isNotBlank(deleteLink)) {
                ImgUr imgur = new ImgUr(imgurClientId);
                ImageDeleteRequest imageDeleteRequest = new ImageDeleteRequest(deleteLink);
                try {
                    ImageDeleteResponse imageDeleteResponse = imgur.call(imageDeleteRequest);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        dao.deleteById(id);
    }

    @SuppressWarnings("unchecked")
    public List<Meme> getLiked(final long profileId) {
        return dao.findLiked(profileId);
    }

    @SuppressWarnings("unchecked")
    public List<Meme> getUnprocessed(final long profileId) {
        return dao.findUnprocessed(profileId);
    }

    public void incrementUsage(final long memeId) {
        Meme meme = get(memeId);
        meme.setUsageCount(meme.getUsageCount() + 1);
        dao.save(meme);
    }

    public void decrementUsage(final long memeId) {
        Meme meme = get(memeId);
        meme.setUsageCount(meme.getUsageCount() - 1);
        dao.save(meme);
    }

    long getMemeCountForProfile(long profileId) {
        return dao.countByProfileId(profileId);
    }

    List<String> getImageUrls() {
        return dao.getMemeUrls();
    }
}
