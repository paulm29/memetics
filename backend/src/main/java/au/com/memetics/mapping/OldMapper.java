package au.com.memetics.mapping;

import org.springframework.stereotype.Component;

@Component
public class OldMapper {
//    private final StringToDateConverter stringToDateConverter;
//
//    @Autowired
//    public Mapper(StringToDateConverter stringToDateConverter) {
//        super(false);
//        this.stringToDateConverter = stringToDateConverter;
//        init();
//    }
//
//    @Override
//    protected void configure(final MapperFactory factory) {
//
//        factory.classMap(Profile.class, ProfileDTO.class)
//                .fieldAToB("id", "id")
//                .exclude("followers")
//                .exclude("following")
//                .exclude("hashtagFavourites")
//                .byDefault()
//                .register();
//
//        factory.classMap(Meme.class, MemeExportDTO.class)
//                .fieldAToB("id", "id")
//                .fieldAToB("profile.nickname", "nickname")
//                .fieldAToB("profile.nickname", "nickname")
//                .exclude("tags")
//                .byDefault()
//                .register();
//
//        factory.classMap(Registration.class, Profile.class)
//                .exclude("socialMediaSignin")
//                .byDefault()
//                .register();
//
//        factory.classMap(Tweet.class, TweetInfo.class)
//                .fieldAToB("id", "statusId")
//                .byDefault()
//                .register();
//
//        factory.classMap(QueueItem.class, MemeTweet.class)
//                .fieldAToB("meme.id", "memeId")
//                .fieldAToB("profile.id", "profileId")
//                .fieldAToB("meme.url", "imageUrl")
//                .byDefault()
//                .register();
//
////        factory.classMap(Term.class, ReferenceDataItem.class)
////                .fieldAToB("id", "code")
////                .fieldAToB("description", "description")
////                .byDefault()
////                .register();
//
//        factory.getConverterFactory().registerConverter(stringToDateConverter);
//    }
}
