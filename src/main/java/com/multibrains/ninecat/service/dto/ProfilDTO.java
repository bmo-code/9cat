package com.multibrains.ninecat.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Profil entity.
 */
public class ProfilDTO implements Serializable {

    private Long id;

    private Integer score;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfilDTO profilDTO = (ProfilDTO) o;
        if(profilDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profilDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfilDTO{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            "}";
    }
}
