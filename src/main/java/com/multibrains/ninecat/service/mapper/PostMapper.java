package com.multibrains.ninecat.service.mapper;

import com.multibrains.ninecat.domain.*;
import com.multibrains.ninecat.service.dto.PostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Post and its DTO PostDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfilMapper.class, TagMapper.class, })
public interface PostMapper extends EntityMapper <PostDTO, Post> {

    @Mapping(source = "profil.id", target = "profilId")
    PostDTO toDto(Post post); 

    @Mapping(source = "profilId", target = "profil")
    Post toEntity(PostDTO postDTO); 
    default Post fromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
}
