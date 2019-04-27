package ir.samta.project.service;

import ir.samta.project.domain.Phase;
import ir.samta.project.repository.PhaseRepository;
import ir.samta.project.repository.search.PhaseSearchRepository;
import ir.samta.project.service.dto.PhaseDTO;
import ir.samta.project.service.mapper.PhaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Phase.
 */
@Service
@Transactional
public class PhaseService {

    private final Logger log = LoggerFactory.getLogger(PhaseService.class);

    private final PhaseRepository phaseRepository;

    private final PhaseMapper phaseMapper;

    private final PhaseSearchRepository phaseSearchRepository;

    public PhaseService(PhaseRepository phaseRepository, PhaseMapper phaseMapper, PhaseSearchRepository phaseSearchRepository) {
        this.phaseRepository = phaseRepository;
        this.phaseMapper = phaseMapper;
        this.phaseSearchRepository = phaseSearchRepository;
    }

    /**
     * Save a phase.
     *
     * @param phaseDTO the entity to save
     * @return the persisted entity
     */
    public PhaseDTO save(PhaseDTO phaseDTO) {
        log.debug("Request to save Phase : {}", phaseDTO);
        Phase phase = phaseMapper.toEntity(phaseDTO);
        phase = phaseRepository.save(phase);
        PhaseDTO result = phaseMapper.toDto(phase);
        phaseSearchRepository.save(phase);
        return result;
    }

    /**
     * Get all the phases.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PhaseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Phases");
        return phaseRepository.findAll(pageable)
            .map(phaseMapper::toDto);
    }


    /**
     * Get one phase by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PhaseDTO> findOne(Long id) {
        log.debug("Request to get Phase : {}", id);
        return phaseRepository.findById(id)
            .map(phaseMapper::toDto);
    }

    /**
     * Delete the phase by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Phase : {}", id);
        phaseRepository.deleteById(id);
        phaseSearchRepository.deleteById(id);
    }

    /**
     * Search for the phase corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PhaseDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Phases for query {}", query);
        return phaseSearchRepository.search(queryStringQuery(query), pageable)
            .map(phaseMapper::toDto);
    }
}
