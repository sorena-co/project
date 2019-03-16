package ir.samta.project.repository;

import ir.samta.project.domain.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query(
        "select project from Project project " +
            "inner join project.users users " +
            "where users.login=:login "
    )
    Page<Project> findAllByUserAccess(@Param("login") String login, Pageable pageable);
}
