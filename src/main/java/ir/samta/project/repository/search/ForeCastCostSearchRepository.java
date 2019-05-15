package ir.samta.project.repository.search;

import ir.samta.project.domain.ForeCastCost;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ForeCastCost entity.
 */
public interface ForeCastCostSearchRepository extends ElasticsearchRepository<ForeCastCost, Long> {
}
