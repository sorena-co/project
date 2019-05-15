package ir.samta.project.repository.search;

import ir.samta.project.domain.CollageEducation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CollageEducation entity.
 */
public interface CollageEducationSearchRepository extends ElasticsearchRepository<CollageEducation, Long> {
}
