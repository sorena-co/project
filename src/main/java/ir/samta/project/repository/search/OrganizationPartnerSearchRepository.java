package ir.samta.project.repository.search;

import ir.samta.project.domain.OrganizationPartner;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrganizationPartner entity.
 */
public interface OrganizationPartnerSearchRepository extends ElasticsearchRepository<OrganizationPartner, Long> {
}
