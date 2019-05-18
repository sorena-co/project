package ir.samta.project.repository;

import ir.samta.project.domain.Documents;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Documents, Long> {

    Page<Documents> findAllByProject_Id(Long projectId,Pageable pageable);
}
