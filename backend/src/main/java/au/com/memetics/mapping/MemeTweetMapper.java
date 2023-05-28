package au.com.memetics.mapping;

import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeTweet;
import au.com.memetics.entity.QueueItem;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemeTweetMapper {

    MemeTweetMapper INSTANCE = Mappers.getMapper( MemeTweetMapper.class );

    MemeTweet toDto(Meme car);

    MemeTweet fromQueueItem(QueueItem queueItem);
}
