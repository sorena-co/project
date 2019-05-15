package ir.samta.project.repository;

import ir.samta.project.domain.MainStep;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MainStep entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MainStepRepository extends JpaRepository<MainStep, Long> {

}
