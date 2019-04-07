package ir.samta.project.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import ir.samta.project.domain.enumeration.FinancialProjectType;
import ir.samta.project.service.FinancialProjectService;
import ir.samta.project.service.dto.FinancialProjectDTO;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FinancialProject.
 */
@RestController
@RequestMapping("/api")
public class FinancialProjectResource {

    private static final String ENTITY_NAME = "financialProject";
    private final Logger log = LoggerFactory.getLogger(FinancialProjectResource.class);
    private final FinancialProjectService financialProjectService;

    public FinancialProjectResource(FinancialProjectService financialProjectService) {
        this.financialProjectService = financialProjectService;
    }

    /**
     * POST  /financial-projects : Create a new financialProject.
     *
     * @param financialProjectDTO the financialProjectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new financialProjectDTO, or with status 400 (Bad Request) if the financialProject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/financial-projects")
    public ResponseEntity<FinancialProjectDTO> createFinancialProject(@RequestBody FinancialProjectDTO financialProjectDTO) throws URISyntaxException {
        log.debug("REST request to save FinancialProject : {}", financialProjectDTO);
        if (financialProjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new financialProject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FinancialProjectDTO result = financialProjectService.save(financialProjectDTO);
        return ResponseEntity.created(new URI("/api/financial-projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /financial-projects : Updates an existing financialProject.
     *
     * @param financialProjectDTO the financialProjectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated financialProjectDTO,
     * or with status 400 (Bad Request) if the financialProjectDTO is not valid,
     * or with status 500 (Internal Server Error) if the financialProjectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/financial-projects")
    public ResponseEntity<FinancialProjectDTO> updateFinancialProject(@RequestBody FinancialProjectDTO financialProjectDTO) throws URISyntaxException {
        log.debug("REST request to update FinancialProject : {}", financialProjectDTO);
        if (financialProjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FinancialProjectDTO result = financialProjectService.save(financialProjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, financialProjectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /financial-projects : get all the financialProjects.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of financialProjects in body
     */
    @GetMapping("/financial-projects/{projectId}/project")
    public ResponseEntity<List<FinancialProjectDTO>> getAllFinancialProjects(@PathVariable Long projectId, Pageable pageable) {
        log.debug("REST request to get a page of FinancialProjects");
        Page<FinancialProjectDTO> page = financialProjectService.findAll(projectId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/financial-projects");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /financial-projects/:id : get the "id" financialProject.
     *
     * @param id the id of the financialProjectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the financialProjectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/financial-projects/{id}")
    public ResponseEntity<FinancialProjectDTO> getFinancialProject(@PathVariable Long id) {
        log.debug("REST request to get FinancialProject : {}", id);
        Optional<FinancialProjectDTO> financialProjectDTO = financialProjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(financialProjectDTO);
    }

    /**
     * DELETE  /financial-projects/:id : delete the "id" financialProject.
     *
     * @param id the id of the financialProjectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/financial-projects/{id}")
    public ResponseEntity<Void> deleteFinancialProject(@PathVariable Long id) {
        log.debug("REST request to delete FinancialProject : {}", id);
        financialProjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/financial-projects?query=:query : search for the financialProject corresponding
     * to the query.
     *
     * @param query    the query of the financialProject search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/financial-projects")
    public ResponseEntity<List<FinancialProjectDTO>> searchFinancialProjects(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of FinancialProjects for query {}", query);
        Page<FinancialProjectDTO> page = financialProjectService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/financial-projects");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/financial-projects/find-by-project-type")
    public ResponseEntity<FinancialProjectDTO> getByProjectAndType(
        @RequestParam(value = "projectId") Long projectId,
        @RequestParam(value = "type") FinancialProjectType type
    ) {
        log.debug("REST request to get FinancialProject By Project Id and Type");
        FinancialProjectDTO financialProjectDTO = financialProjectService.findByProjectAndType(projectId,
            type);
        return ResponseEntity.ok(financialProjectDTO);
    }

    @GetMapping("/financial-projects/cost/{projectId}")
    public ResponseEntity<Long> getByProjectAndType(
        @PathVariable(value = "projectId") Long projectId
    ) {
        log.debug("REST request to get sum of cost FinancialProject By Project Id");
        Long costs = financialProjectService.getSumOfCostForProject(projectId);
        return ResponseEntity.ok(costs);
    }


}
