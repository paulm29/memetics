package au.com.memetics.mapping;

import au.com.memetics.dto.ReferenceDataItemDto;
import au.com.memetics.entity.ReferenceDataItem;
import com.afrozaar.wordpress.wpapi.v2.model.Term;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ReferenceDataItemDtoMapper {

    ReferenceDataItemDtoMapper INSTANCE = Mappers.getMapper( ReferenceDataItemDtoMapper.class );

    //    @Mapping(source = "numberOfSeats", target = "seatCount")
    ReferenceDataItem toEntity(ReferenceDataItemDto car);

    ReferenceDataItemDto toDto(ReferenceDataItem car);

    ReferenceDataItemDto fromTerm(Term car);

    List<ReferenceDataItemDto> fromTerms(List<Term> car);
}
