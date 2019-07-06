package ir.samta.project.service;

import ir.samta.project.domain.OrganizationPartner;
import ir.samta.project.repository.OrganizationPartnerRepository;
import ir.samta.project.service.dto.OrganizationPartnerDTO;
import ir.samta.project.service.mapper.OrganizationPartnerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;



/**
 * Service Implementation for managing OrganizationPartner.
 */
@Service
@Transactional
public class OrganizationPartnerService {

    private final Logger log = LoggerFactory.getLogger(OrganizationPartnerService.class);

    private final OrganizationPartnerRepository organizationPartnerRepository;

    private final OrganizationPartnerMapper organizationPartnerMapper;

    public OrganizationPartnerService(OrganizationPartnerRepository organizationPartnerRepository, OrganizationPartnerMapper organizationPartnerMapper) {
        this.organizationPartnerRepository = organizationPartnerRepository;
        this.organizationPartnerMapper = organizationPartnerMapper;
    }

    /**
     * Save a organizationPartner.
     *
     * @param organizationPartnerDTO the entity to save
     * @return the persisted entity
     */
    public OrganizationPartnerDTO save(OrganizationPartnerDTO organizationPartnerDTO) {
        log.debug("Request to save OrganizationPartner : {}", organizationPartnerDTO);
        OrganizationPartner organizationPartner = organizationPartnerMapper.toEntity(organizationPartnerDTO);
        organizationPartner = organizationPartnerRepository.save(organizationPartner);
        OrganizationPartnerDTO result = organizationPartnerMapper.toDto(organizationPartner);
        return result;
    }

    /**
     * Get all the organizationPartners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<OrganizationPartnerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrganizationPartners");
        return organizationPartnerRepository.findAll(pageable)
            .map(organizationPartnerMapper::toDto);
    }


    /**
     * Get one organizationPartner by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<OrganizationPartnerDTO> findOne(Long id) {
        log.debug("Request to get OrganizationPartner : {}", id);
        return organizationPartnerRepository.findById(id)
            .map(organizationPartnerMapper::toDto);
    }

    /**
     * Delete the organizationPartner by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OrganizationPartner : {}", id);
        organizationPartnerRepository.deleteById(id);
    }
}
