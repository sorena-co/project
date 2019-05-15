package ir.samta.project.service.mapper;

import ir.samta.project.domain.*;
import ir.samta.project.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {MainStepMapper.class, CollageEducationMapper.class, ResearcherHistoryMapper.class, ExistingResearchProjectMapper.class, OrganizationPartnerMapper.class, CostSummaryMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Documents> {

    @Mapping(source = "mainStep.id", target = "mainStepId")
    @Mapping(source = "mainStep.mainStep", target = "mainStepMainStep")
    @Mapping(source = "collageEducation.id", target = "collageEducationId")
    @Mapping(source = "collageEducation.fullName", target = "collageEducationFullName")
    @Mapping(source = "researcherHistory.id", target = "researcherHistoryId")
    @Mapping(source = "existingResearchProject.id", target = "existingResearchProjectId")
    @Mapping(source = "organizationPartner.id", target = "organizationPartnerId")
    @Mapping(source = "costSummary.id", target = "costSummaryId")
    @Mapping(source = "foreCastCostConsume.id", target = "foreCastCostConsumeId")
    @Mapping(source = "foreCastCostCost.id", target = "foreCastCostCostId")
    @Mapping(source = "foreCastCostSupport.id", target = "foreCastCostSupportId")
    @Mapping(source = "foreCastCostSpace.id", target = "foreCastCostSpaceId")
    @Mapping(source = "foreCastCostSellContract.id", target = "foreCastCostSellContractId")
    @Mapping(source = "foreCastCostOther.id", target = "foreCastCostOtherId")
    DocumentDTO toDto(Documents document);

    @Mapping(source = "mainStepId", target = "mainStep")
    @Mapping(source = "collageEducationId", target = "collageEducation")
    @Mapping(source = "researcherHistoryId", target = "researcherHistory")
    @Mapping(source = "existingResearchProjectId", target = "existingResearchProject")
    @Mapping(source = "organizationPartnerId", target = "organizationPartner")
    @Mapping(source = "costSummaryId", target = "costSummary")
    @Mapping(source = "foreCastCostConsumeId", target = "foreCastCostConsume")
    @Mapping(source = "foreCastCostCostId", target = "foreCastCostCost")
    @Mapping(source = "foreCastCostSupportId", target = "foreCastCostSupport")
    @Mapping(source = "foreCastCostSpaceId", target = "foreCastCostSpace")
    @Mapping(source = "foreCastCostSellContractId", target = "foreCastCostSellContract")
    @Mapping(source = "foreCastCostOtherId", target = "foreCastCostOther")
    Documents toEntity(DocumentDTO documentDTO);

    default Documents fromId(Long id) {
        if (id == null) {
            return null;
        }
        Documents document = new Documents();
        document.setId(id);
        return document;
    }
}
