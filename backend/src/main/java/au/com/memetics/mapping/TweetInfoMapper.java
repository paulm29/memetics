package au.com.memetics.mapping;

import au.com.memetics.entity.TweetInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.social.twitter.api.Tweet;

@Mapper
public interface TweetInfoMapper {

    TweetInfoMapper INSTANCE = Mappers.getMapper( TweetInfoMapper.class );

    //    @Mapping(source = "numberOfSeats", target = "seatCount")
    TweetInfo toEntity(Tweet car);

    TweetInfo toDto(TweetInfo car);
}
