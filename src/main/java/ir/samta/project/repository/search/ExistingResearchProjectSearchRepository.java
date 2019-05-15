package ir.samta.project.repository.search;

import ir.samta.project.domain.ExistingResearchProject;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ExistingResearchProject entity.
 */
public interface ExistingResearchProjectSearchRepository extends ElasticsearchRepository<ExistingResearchProject, Long> {
}
