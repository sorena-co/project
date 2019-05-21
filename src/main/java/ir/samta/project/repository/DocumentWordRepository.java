package ir.samta.project.repository;

import ir.samta.project.domain.DocumentWord;
import ir.samta.project.domain.enumeration.DocumentFileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the DocumentWord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentWordRepository extends JpaRepository<DocumentWord, Long> {

    Page<DocumentWord> findAllByDocument_Id(Long documentId, Pageable pageable);

    List<DocumentWord> findAllByDocument_Id(Long documentId);

    void deleteAllByDocument_IdAndType(Long documentId, DocumentFileType type);
}
