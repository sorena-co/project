package ir.samta.project.repository;

import ir.samta.project.domain.ForeCastCost;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ForeCastCost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ForeCastCostRepository extends JpaRepository<ForeCastCost, Long> {

}
