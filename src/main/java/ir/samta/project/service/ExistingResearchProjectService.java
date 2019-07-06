package ir.samta.project.service;

import ir.samta.project.domain.ExistingResearchProject;
import ir.samta.project.repository.ExistingResearchProjectRepository;
import ir.samta.project.service.dto.ExistingResearchProjectDTO;
import ir.samta.project.service.mapper.ExistingResearchProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing ExistingResearchProject.
 */
@Service
@Transactional
public class ExistingResearchProjectService {

    private final Logger log = LoggerFactory.getLogger(ExistingResearchProjectService.class);

    private final ExistingResearchProjectRepository existingResearchProjectRepository;

    private final ExistingResearchProjectMapper existingResearchProjectMapper;

    public ExistingResearchProjectService(ExistingResearchProjectRepository existingResearchProjectRepository, ExistingResearchProjectMapper existingResearchProjectMapper) {
        this.existingResearchProjectRepository = existingResearchProjectRepository;
        this.existingResearchProjectMapper = existingResearchProjectMapper;
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
    }
}
