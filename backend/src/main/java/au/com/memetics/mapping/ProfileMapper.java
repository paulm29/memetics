package au.com.memetics.mapping;

import au.com.memetics.controller.formsignin.Registration;
import au.com.memetics.dao.UserRepository;
import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.Profile;
import org.mapstruct.BeforeMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Mapper
public interface ProfileMapper {
    ProfileMapper INSTANCE = Mappers.getMapper( ProfileMapper.class );

    //    @Mapping(source = "numberOfSeats", target = "seatCount")
    Profile toEntity(ProfileDTO dto);

    Profile fromRegistration(Registration car);

    ProfileDTO toDto(Profile car);

    @BeforeMapping
    default void map(@MappingTarget Profile entity, ProfileDTO dto, @Context UserRepository userRepository) {
        entity = userRepository.findById(dto.getId()).orElse(null);

        Profile finalEntity = entity;
        Set<Follow> follows = dto.getFollowing().stream().map(followDTO -> {
            Optional<Follow> existing = finalEntity.getFollowing().stream().filter(f -> f.getId().equals(followDTO.getId())).findFirst();
            if (existing.isPresent()) {
                return existing.get();
            } else {
                Follow newFollow = new Follow();
                newFollow.setFollower(followDTO.getFollower());
                newFollow.setFollowing(followDTO.getFollowing());
                return newFollow;
            }
        }).collect(toSet());

        entity.getFollowing().clear();
        entity.getFollowing().addAll(follows);

        Set<Follow> followsFollowers = dto.getFollowers().stream().map(followDTO -> {
            Optional<Follow> existing = finalEntity.getFollowers().stream().filter(f -> f.getId().equals(followDTO.getId())).findFirst();
            if (existing.isPresent()) {
                return existing.get();
            } else {
                Follow newFollow = new Follow();
                newFollow.setFollower(followDTO.getFollower());
                newFollow.setFollowing(followDTO.getFollowing());
                return newFollow;
            }
        }).collect(toSet());

        entity.getFollowers().clear();
        entity.getFollowers().addAll(followsFollowers);
    }
}
