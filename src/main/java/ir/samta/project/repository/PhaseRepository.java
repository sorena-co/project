package ir.samta.project.repository;

import ir.samta.project.domain.Phase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Phase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhaseRepository extends JpaRepository<Phase, Long> {
    Page<Phase> findAllByProject_Id(Long projectId, Pageable pageable);

    List<Phase> findAllByProject_Id(Long projectId);
}
