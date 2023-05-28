package au.com.memetics.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QueueItemMapper {

    QueueItemMapper INSTANCE = Mappers.getMapper( QueueItemMapper.class );

    //    @Mapping(source = "numberOfSeats", target = "seatCount")
//    QueueItem toEntity(QueueItemDTO car);
//
//    QueueItemDTO toDto(QueueItem car);
}
