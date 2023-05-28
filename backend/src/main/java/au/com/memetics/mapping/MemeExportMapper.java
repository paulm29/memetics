package au.com.memetics.mapping;

import au.com.memetics.dto.MemeExportDTO;
import au.com.memetics.entity.Meme;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface MemeExportMapper {

    MemeExportMapper INSTANCE = Mappers.getMapper( MemeExportMapper.class );

//    @Mapping(source = "numberOfSeats", target = "seatCount")
    Meme toEntity(MemeExportDTO car);

    MemeExportDTO toDto(Meme car);

    List<MemeExportDTO> toDtos(List<Meme> car);
}
