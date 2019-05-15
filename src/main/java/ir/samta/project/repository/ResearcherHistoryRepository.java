package ir.samta.project.repository;

import ir.samta.project.domain.ResearcherHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ResearcherHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResearcherHistoryRepository extends JpaRepository<ResearcherHistory, Long> {

}
