package ir.samta.project.service;

import ir.samta.project.domain.FinancialProject;
import ir.samta.project.domain.Project;
import ir.samta.project.domain.enumeration.FinancialProjectType;
import ir.samta.project.repository.FinancialProjectRepository;
import ir.samta.project.repository.ProjectRepository;
import ir.samta.project.security.SecurityUtils;
import ir.samta.project.service.dto.ProjectDTO;
import ir.samta.project.service.mapper.ProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;



/**
 * Service Implementation for managing Project.
 */
@Service
@Transactional
public class ProjectService {

    private final Logger log = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;


    private final FinancialProjectRepository financialProjectRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper
        , FinancialProjectRepository financialProjectRepository) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.financialProjectRepository = financialProjectRepository;
    }

    /**
     * Save a project.
     *
     * @param projectDTO the entity to save
     * @return the persisted entity
     */
    public ProjectDTO save(ProjectDTO projectDTO) {
        log.debug("Request to save Project : {}", projectDTO);
        Project project = projectMapper.toEntity(projectDTO);
        project.setCreateDate(Instant.now());

        project = projectRepository.save(project);
        FinancialProject financialProject = new FinancialProject();
        financialProject.setAmount(projectDTO.getAmountConfirmed());
        financialProject.setRegisterDate(ZonedDateTime.now());
        financialProject.setFinancialProjectType(FinancialProjectType.AMOUNT_CONFIRMED);
        financialProject.setProject(project);
        financialProjectRepository.save(financialProject);
        ProjectDTO result = projectMapper.toDto(project);
        return result;
    }

    /**
     * Get all the projects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Projects");
        return projectRepository.findAllByUserAccess(SecurityUtils.getCurrentUserLogin().get(), pageable)
            .map(projectMapper::toDto);
    }


    /**
     * Get one project by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ProjectDTO> findOne(Long id) {
        log.debug("Request to get Project : {}", id);
        return projectRepository.findById(id)
            .map(projectMapper::toDto);
    }

    /**
     * Delete the project by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Project : {}", id);
        projectRepository.deleteById(id);
    }

    public List<ProjectDTO> findAllWithOutAccess(Long level) {
        return projectMapper.toDto(projectRepository.findAllByLevel(level));
    }
}
