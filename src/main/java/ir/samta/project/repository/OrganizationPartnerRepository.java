package ir.samta.project.repository;

import ir.samta.project.domain.OrganizationPartner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrganizationPartner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganizationPartnerRepository extends JpaRepository<OrganizationPartner, Long> {

}
