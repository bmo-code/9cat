package com.multibrains.ninecat.service.mapper;

import com.multibrains.ninecat.domain.*;
import com.multibrains.ninecat.service.dto.ProfileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Profile and its DTO ProfileDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface ProfileMapper extends EntityMapper <ProfileDTO, Profile> {

    @Mapping(source = "user.id", target = "userId")
    ProfileDTO toDto(Profile profile); 

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "posts", ignore = true)
    Profile toEntity(ProfileDTO profileDTO); 
    default Profile fromId(Long id) {
        if (id == null) {
            return null;
        }
        Profile profile = new Profile();
        profile.setId(id);
        return profile;
    }
}
