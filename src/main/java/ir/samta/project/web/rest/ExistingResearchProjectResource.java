package ir.samta.project.web.rest;
import ir.samta.project.service.ExistingResearchProjectService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.ExistingResearchProjectDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;



/**
 * REST controller for managing ExistingResearchProject.
 */
@RestController
@RequestMapping("/api")
public class ExistingResearchProjectResource {

    private final Logger log = LoggerFactory.getLogger(ExistingResearchProjectResource.class);

    private static final String ENTITY_NAME = "existingResearchProject";

    private final ExistingResearchProjectService existingResearchProjectService;

    public ExistingResearchProjectResource(ExistingResearchProjectService existingResearchProjectService) {
        this.existingResearchProjectService = existingResearchProjectService;
    }

    /**
     * POST  /existing-research-projects : Create a new existingResearchProject.
     *
     * @param existingResearchProjectDTO the existingResearchProjectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new existingResearchProjectDTO, or with status 400 (Bad Request) if the existingResearchProject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/existing-research-projects")
    public ResponseEntity<ExistingResearchProjectDTO> createExistingResearchProject(@RequestBody ExistingResearchProjectDTO existingResearchProjectDTO) throws URISyntaxException {
        log.debug("REST request to save ExistingResearchProject : {}", existingResearchProjectDTO);
        if (existingResearchProjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new existingResearchProject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExistingResearchProjectDTO result = existingResearchProjectService.save(existingResearchProjectDTO);
        return ResponseEntity.created(new URI("/api/existing-research-projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /existing-research-projects : Updates an existing existingResearchProject.
     *
     * @param existingResearchProjectDTO the existingResearchProjectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated existingResearchProjectDTO,
     * or with status 400 (Bad Request) if the existingResearchProjectDTO is not valid,
     * or with status 500 (Internal Server Error) if the existingResearchProjectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/existing-research-projects")
    public ResponseEntity<ExistingResearchProjectDTO> updateExistingResearchProject(@RequestBody ExistingResearchProjectDTO existingResearchProjectDTO) throws URISyntaxException {
        log.debug("REST request to update ExistingResearchProject : {}", existingResearchProjectDTO);
        if (existingResearchProjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExistingResearchProjectDTO result = existingResearchProjectService.save(existingResearchProjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, existingResearchProjectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /existing-research-projects : get all the existingResearchProjects.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of existingResearchProjects in body
     */
    @GetMapping("/existing-research-projects")
    public ResponseEntity<List<ExistingResearchProjectDTO>> getAllExistingResearchProjects(Pageable pageable) {
        log.debug("REST request to get a page of ExistingResearchProjects");
        Page<ExistingResearchProjectDTO> page = existingResearchProjectService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/existing-research-projects");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /existing-research-projects/:id : get the "id" existingResearchProject.
     *
     * @param id the id of the existingResearchProjectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the existingResearchProjectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/existing-research-projects/{id}")
    public ResponseEntity<ExistingResearchProjectDTO> getExistingResearchProject(@PathVariable Long id) {
        log.debug("REST request to get ExistingResearchProject : {}", id);
        Optional<ExistingResearchProjectDTO> existingResearchProjectDTO = existingResearchProjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(existingResearchProjectDTO);
    }

    /**
     * DELETE  /existing-research-projects/:id : delete the "id" existingResearchProject.
     *
     * @param id the id of the existingResearchProjectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/existing-research-projects/{id}")
    public ResponseEntity<Void> deleteExistingResearchProject(@PathVariable Long id) {
        log.debug("REST request to delete ExistingResearchProject : {}", id);
        existingResearchProjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
