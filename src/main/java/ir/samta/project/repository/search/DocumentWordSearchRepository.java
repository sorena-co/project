package ir.samta.project.repository.search;

import ir.samta.project.domain.DocumentWord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DocumentWord entity.
 */
public interface DocumentWordSearchRepository extends ElasticsearchRepository<DocumentWord, Long> {
}
