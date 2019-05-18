package ir.samta.project.repository;

import ir.samta.project.domain.DocumentWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.stream.DoubleStream;


/**
 * Spring Data  repository for the DocumentWord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentWordRepository extends JpaRepository<DocumentWord, Long> {

    Page<DocumentWord> findAllByDocument_Id(Long documentId, Pageable pageable);
}
