package ir.samta.project.repository.search;

import ir.samta.project.domain.MainStep;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MainStep entity.
 */
public interface MainStepSearchRepository extends ElasticsearchRepository<MainStep, Long> {
}
