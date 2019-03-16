package ir.samta.project.repository.search;

import ir.samta.project.domain.UserGroup;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserGroup entity.
 */
public interface UserGroupSearchRepository extends ElasticsearchRepository<UserGroup, Long> {
}
