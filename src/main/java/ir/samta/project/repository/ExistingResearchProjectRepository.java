package ir.samta.project.repository;

import ir.samta.project.domain.ExistingResearchProject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExistingResearchProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExistingResearchProjectRepository extends JpaRepository<ExistingResearchProject, Long> {

}
