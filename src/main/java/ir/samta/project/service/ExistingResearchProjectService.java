package ir.samta.project.service;

import ir.samta.project.domain.ExistingResearchProject;
import ir.samta.project.repository.ExistingResearchProjectRepository;
import ir.samta.project.repository.search.ExistingResearchProjectSearchRepository;
import ir.samta.project.service.dto.ExistingResearchProjectDTO;
import ir.samta.project.service.mapper.ExistingResearchProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ExistingResearchProject.
 */
@Service
@Transactional
public class ExistingResearchProjectService {

    private final Logger log = LoggerFactory.getLogger(ExistingResearchProjectService.class);

    private final ExistingResearchProjectRepository existingResearchProjectRepository;

    private final ExistingResearchProjectMapper existingResearchProjectMapper;

    private final ExistingResearchProjectSearchRepository existingResearchProjectSearchRepository;

    public ExistingResearchProjectService(ExistingResearchProjectRepository existingResearchProjectRepository, ExistingResearchProjectMapper existingResearchProjectMapper, ExistingResearchProjectSearchRepository existingResearchProjectSearchRepository) {
        this.existingResearchProjectRepository = existingResearchProjectRepository;
        this.existingResearchProjectMapper = existingResearchProjectMapper;
        this.existingResearchProjectSearchRepository = existingResearchProjectSearchRepository;
    }

    /**
     * Save a existingResearchProject.
     *
     * @param existingResearchProjectDTO the entity to save
     * @return the persisted entity
     */
    public ExistingResearchProjectDTO save(ExistingResearchProjectDTO existingResearchProjectDTO) {
        log.debug("Request to save ExistingResearchProject : {}", existingResearchProjectDTO);
        ExistingResearchProject existingResearchProject = existingResearchProjectMapper.toEntity(existingResearchProjectDTO);
        existingResearchProject = existingResearchProjectRepository.save(existingResearchProject);
        ExistingResearchProjectDTO result = existingResearchProjectMapper.toDto(existingResearchProject);
        existingResearchProjectSearchRepository.save(existingResearchProject);
        return result;
    }

    /**
     * Get all the existingResearchProjects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ExistingResearchProjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ExistingResearchProjects");
        return existingResearchProjectRepository.findAll(pageable)
            .map(existingResearchProjectMapper::toDto);
    }


    /**
     * Get one existingResearchProject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ExistingResearchProjectDTO> findOne(Long id) {
        log.debug("Request to get ExistingResearchProject : {}", id);
        return existingResearchProjectRepository.findById(id)
            .map(existingResearchProjectMapper::toDto);
    }

    /**
     * Delete the existingResearchProject by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ExistingResearchProject : {}", id);
        existingResearchProjectRepository.deleteById(id);
        existingResearchProjectSearchRepository.deleteById(id);
    }

    /**
     * Search for the existingResearchProject corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ExistingResearchProjectDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ExistingResearchProjects for query {}", query);
        return existingResearchProjectSearchRepository.search(queryStringQuery(query), pageable)
            .map(existingResearchProjectMapper::toDto);
    }
}
