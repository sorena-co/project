package ir.samta.project.repository.search;

import ir.samta.project.domain.Action;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Action entity.
 */
public interface ActionSearchRepository extends ElasticsearchRepository<Action, Long> {
}
