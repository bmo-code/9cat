package com.multibrains.ninecat.service;

import com.multibrains.ninecat.domain.Profil;
import com.multibrains.ninecat.repository.ProfilRepository;
import com.multibrains.ninecat.service.dto.ProfilDTO;
import com.multibrains.ninecat.service.mapper.ProfilMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Profil.
 */
@Service
@Transactional
public class ProfilService {

    private final Logger log = LoggerFactory.getLogger(ProfilService.class);

    private final ProfilRepository profilRepository;

    private final ProfilMapper profilMapper;

    public ProfilService(ProfilRepository profilRepository, ProfilMapper profilMapper) {
        this.profilRepository = profilRepository;
        this.profilMapper = profilMapper;
    }

    /**
     * Save a profil.
     *
     * @param profilDTO the entity to save
     * @return the persisted entity
     */
    public ProfilDTO save(ProfilDTO profilDTO) {
        log.debug("Request to save Profil : {}", profilDTO);
        Profil profil = profilMapper.toEntity(profilDTO);
        profil = profilRepository.save(profil);
        return profilMapper.toDto(profil);
    }

    /**
     *  Get all the profils.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProfilDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Profils");
        return profilRepository.findAll(pageable)
            .map(profilMapper::toDto);
    }

    /**
     *  Get one profil by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ProfilDTO findOne(Long id) {
        log.debug("Request to get Profil : {}", id);
        Profil profil = profilRepository.findOne(id);
        return profilMapper.toDto(profil);
    }

    /**
     *  Delete the  profil by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Profil : {}", id);
        profilRepository.delete(id);
    }
}
