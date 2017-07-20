package com.multibrains.ninecat.repository;

import com.multibrains.ninecat.domain.Profile;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long> {
    
}
