package ir.samta.project.repository;

import ir.samta.project.domain.Action;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Action entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    Page<Action> findAllByPhase_Id(Long phaseId, Pageable pageable);

    List<Action> findAllByPhase_Id(Long phaseId);

    Page<Action> findAllByPhase_Project_Id(Long projectId, Pageable pageable);
}
