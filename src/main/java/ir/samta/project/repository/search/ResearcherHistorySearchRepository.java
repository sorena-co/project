package ir.samta.project.repository.search;

import ir.samta.project.domain.ResearcherHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ResearcherHistory entity.
 */
public interface ResearcherHistorySearchRepository extends ElasticsearchRepository<ResearcherHistory, Long> {
}
