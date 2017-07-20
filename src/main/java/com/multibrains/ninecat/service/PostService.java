package com.multibrains.ninecat.service;

import com.multibrains.ninecat.domain.Post;
import com.multibrains.ninecat.repository.PostRepository;
import com.multibrains.ninecat.service.dto.PostDTO;
import com.multibrains.ninecat.service.mapper.PostMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Post.
 */
@Service
@Transactional
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    /**
     * Save a post.
     *
     * @param postDTO the entity to save
     * @return the persisted entity
     */
    public PostDTO save(PostDTO postDTO) {
        log.debug("Request to save Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    /**
     *  Get all the posts.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        return postRepository.findAll(pageable)
            .map(postMapper::toDto);
    }

    /**
     *  Get one post by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public PostDTO findOne(Long id) {
        log.debug("Request to get Post : {}", id);
        Post post = postRepository.findOneWithEagerRelationships(id);
        return postMapper.toDto(post);
    }

    /**
     *  Delete the  post by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.delete(id);
    }

    public Integer getScore(Long id) {
        log.debug("Request to get the score of the post : {}", id);
        Post post = postRepository.findOne(id);
        Integer postScore = post.getScore();
        return postScore;
    }

    public Integer upVoteScore(Long id) {
        log.debug("REST request to up vote a post {}", id);
        Post post = postRepository.findOne(id);
        post.setScore(post.getScore() + 1);
        return post.getScore();
    }

    public Integer downVoteScore(Long id) {
        log.debug("REST request to down vote a post {}", id);
        Post post = postRepository.findOne(id);
        post.setScore(post.getScore() - 1);
        return post.getScore();
    }
}
