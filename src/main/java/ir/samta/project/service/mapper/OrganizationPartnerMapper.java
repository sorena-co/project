package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.OrganizationPartnerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrganizationPartner and its DTO OrganizationPartnerDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class})
public interface OrganizationPartnerMapper extends EntityMapper<OrganizationPartnerDTO, OrganizationPartner> {

    @Mapping(source = "document.id", target = "documentId")
    OrganizationPartnerDTO toDto(OrganizationPartner organizationPartner);

    @Mapping(source = "documentId", target = "document")
    OrganizationPartner toEntity(OrganizationPartnerDTO organizationPartnerDTO);

    default OrganizationPartner fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrganizationPartner organizationPartner = new OrganizationPartner();
        organizationPartner.setId(id);
        return organizationPartner;
    }
}
