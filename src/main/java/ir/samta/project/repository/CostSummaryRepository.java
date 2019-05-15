package ir.samta.project.repository;

import ir.samta.project.domain.CostSummary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostSummary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostSummaryRepository extends JpaRepository<CostSummary, Long> {

}
