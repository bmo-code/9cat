package com.multibrains.ninecat.service.mapper;

import com.multibrains.ninecat.domain.*;
import com.multibrains.ninecat.service.dto.ProfilDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Profil and its DTO ProfilDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface ProfilMapper extends EntityMapper <ProfilDTO, Profil> {

    @Mapping(source = "user.id", target = "userId")
    ProfilDTO toDto(Profil profil); 

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "posts", ignore = true)
    Profil toEntity(ProfilDTO profilDTO); 
    default Profil fromId(Long id) {
        if (id == null) {
            return null;
        }
        Profil profil = new Profil();
        profil.setId(id);
        return profil;
    }
}
