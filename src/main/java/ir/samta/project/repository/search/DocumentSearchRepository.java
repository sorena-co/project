package ir.samta.project.repository.search;

import ir.samta.project.domain.Documents;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Document entity.
 */
public interface DocumentSearchRepository extends ElasticsearchRepository<Documents, Long> {
}
