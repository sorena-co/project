package ir.samta.project.service;

import ir.samta.project.domain.CollageEducation;
import ir.samta.project.repository.CollageEducationRepository;
import ir.samta.project.repository.search.CollageEducationSearchRepository;
import ir.samta.project.service.dto.CollageEducationDTO;
import ir.samta.project.service.mapper.CollageEducationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CollageEducation.
 */
@Service
@Transactional
public class CollageEducationService {

    private final Logger log = LoggerFactory.getLogger(CollageEducationService.class);

    private final CollageEducationRepository collageEducationRepository;

    private final CollageEducationMapper collageEducationMapper;

    private final CollageEducationSearchRepository collageEducationSearchRepository;

    public CollageEducationService(CollageEducationRepository collageEducationRepository, CollageEducationMapper collageEducationMapper, CollageEducationSearchRepository collageEducationSearchRepository) {
        this.collageEducationRepository = collageEducationRepository;
        this.collageEducationMapper = collageEducationMapper;
        this.collageEducationSearchRepository = collageEducationSearchRepository;
    }

    /**
     * Save a collageEducation.
     *
     * @param collageEducationDTO the entity to save
     * @return the persisted entity
     */
    public CollageEducationDTO save(CollageEducationDTO collageEducationDTO) {
        log.debug("Request to save CollageEducation : {}", collageEducationDTO);
        CollageEducation collageEducation = collageEducationMapper.toEntity(collageEducationDTO);
        collageEducation = collageEducationRepository.save(collageEducation);
        CollageEducationDTO result = collageEducationMapper.toDto(collageEducation);
        collageEducationSearchRepository.save(collageEducation);
        return result;
    }

    /**
     * Get all the collageEducations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CollageEducationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CollageEducations");
        return collageEducationRepository.findAll(pageable)
            .map(collageEducationMapper::toDto);
    }


    /**
     * Get one collageEducation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<CollageEducationDTO> findOne(Long id) {
        log.debug("Request to get CollageEducation : {}", id);
        return collageEducationRepository.findById(id)
            .map(collageEducationMapper::toDto);
    }

    /**
     * Delete the collageEducation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CollageEducation : {}", id);
        collageEducationRepository.deleteById(id);
        collageEducationSearchRepository.deleteById(id);
    }

    /**
     * Search for the collageEducation corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CollageEducationDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CollageEducations for query {}", query);
        return collageEducationSearchRepository.search(queryStringQuery(query), pageable)
            .map(collageEducationMapper::toDto);
    }
}
