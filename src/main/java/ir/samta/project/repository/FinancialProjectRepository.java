package ir.samta.project.repository;

import ir.samta.project.domain.FinancialProject;
import ir.samta.project.domain.enumeration.FinancialProjectType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the FinancialProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinancialProjectRepository extends JpaRepository<FinancialProject, Long> {
    FinancialProject findFirstByProject_IdAndFinancialProjectType(Long projectId, FinancialProjectType type);

    @Query(
        "select distinct sum(fp.amount) from FinancialProject fp " +
            "inner join fp.project project " +
            "where project.id=:projectId and fp.financialProjectType in (:financialProjectTypes)"
    )
    Long getSumOfCostForProject(
        @Param("projectId") Long projectId,
        @Param("financialProjectTypes") List<FinancialProjectType> financialProjectTypes
    );

    Page<FinancialProject> findAllByProject_IdAndFinancialProjectType(Long projectId, FinancialProjectType type, Pageable pageable);

    Boolean existsAllByProject_IdAndFinancialProjectType(Long projectId, FinancialProjectType type);

    @Query(
        "select sum(financialProject.amount) from FinancialProject financialProject " +
            "inner join financialProject.project project " +
            "where project.id = :projectId and financialProject.financialProjectType=:type  "
    )
    Long getMainFinancialProject(@Param("projectId") Long projectId, @Param("type") FinancialProjectType type);
}
