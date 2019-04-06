package ir.samta.project.repository.search;

import ir.samta.project.domain.FinancialProject;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FinancialProject entity.
 */
public interface FinancialProjectSearchRepository extends ElasticsearchRepository<FinancialProject, Long> {
}
