package com.multibrains.ninecat.repository;

import com.multibrains.ninecat.domain.Profil;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Profil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilRepository extends JpaRepository<Profil,Long> {
    
}
