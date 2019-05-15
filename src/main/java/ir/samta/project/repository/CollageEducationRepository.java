package ir.samta.project.repository;

import ir.samta.project.domain.CollageEducation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CollageEducation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollageEducationRepository extends JpaRepository<CollageEducation, Long> {

}
