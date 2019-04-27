package ir.samta.project.repository.search;

import ir.samta.project.domain.Phase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Phase entity.
 */
public interface PhaseSearchRepository extends ElasticsearchRepository<Phase, Long> {
}
