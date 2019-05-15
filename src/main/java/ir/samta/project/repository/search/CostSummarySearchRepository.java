package ir.samta.project.repository.search;

import ir.samta.project.domain.CostSummary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CostSummary entity.
 */
public interface CostSummarySearchRepository extends ElasticsearchRepository<CostSummary, Long> {
}
