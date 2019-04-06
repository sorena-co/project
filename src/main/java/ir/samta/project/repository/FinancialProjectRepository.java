package ir.samta.project.repository;

import ir.samta.project.domain.FinancialProject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FinancialProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinancialProjectRepository extends JpaRepository<FinancialProject, Long> {

}
