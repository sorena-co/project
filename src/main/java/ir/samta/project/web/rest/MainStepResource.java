package ir.samta.project.web.rest;
import ir.samta.project.service.MainStepService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.MainStepDTO;
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

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing MainStep.
 */
@RestController
@RequestMapping("/api")
public class MainStepResource {

    private final Logger log = LoggerFactory.getLogger(MainStepResource.class);

    private static final String ENTITY_NAME = "mainStep";

    private final MainStepService mainStepService;

    public MainStepResource(MainStepService mainStepService) {
        this.mainStepService = mainStepService;
    }

    /**
     * POST  /main-steps : Create a new mainStep.
     *
     * @param mainStepDTO the mainStepDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mainStepDTO, or with status 400 (Bad Request) if the mainStep has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/main-steps")
    public ResponseEntity<MainStepDTO> createMainStep(@RequestBody MainStepDTO mainStepDTO) throws URISyntaxException {
        log.debug("REST request to save MainStep : {}", mainStepDTO);
        if (mainStepDTO.getId() != null) {
            throw new BadRequestAlertException("A new mainStep cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MainStepDTO result = mainStepService.save(mainStepDTO);
        return ResponseEntity.created(new URI("/api/main-steps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /main-steps : Updates an existing mainStep.
     *
     * @param mainStepDTO the mainStepDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mainStepDTO,
     * or with status 400 (Bad Request) if the mainStepDTO is not valid,
     * or with status 500 (Internal Server Error) if the mainStepDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/main-steps")
    public ResponseEntity<MainStepDTO> updateMainStep(@RequestBody MainStepDTO mainStepDTO) throws URISyntaxException {
        log.debug("REST request to update MainStep : {}", mainStepDTO);
        if (mainStepDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MainStepDTO result = mainStepService.save(mainStepDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mainStepDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /main-steps : get all the mainSteps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mainSteps in body
     */
    @GetMapping("/main-steps")
    public ResponseEntity<List<MainStepDTO>> getAllMainSteps(Pageable pageable) {
        log.debug("REST request to get a page of MainSteps");
        Page<MainStepDTO> page = mainStepService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/main-steps");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /main-steps/:id : get the "id" mainStep.
     *
     * @param id the id of the mainStepDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mainStepDTO, or with status 404 (Not Found)
     */
    @GetMapping("/main-steps/{id}")
    public ResponseEntity<MainStepDTO> getMainStep(@PathVariable Long id) {
        log.debug("REST request to get MainStep : {}", id);
        Optional<MainStepDTO> mainStepDTO = mainStepService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mainStepDTO);
    }

    /**
     * DELETE  /main-steps/:id : delete the "id" mainStep.
     *
     * @param id the id of the mainStepDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/main-steps/{id}")
    public ResponseEntity<Void> deleteMainStep(@PathVariable Long id) {
        log.debug("REST request to delete MainStep : {}", id);
        mainStepService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/main-steps?query=:query : search for the mainStep corresponding
     * to the query.
     *
     * @param query the query of the mainStep search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/main-steps")
    public ResponseEntity<List<MainStepDTO>> searchMainSteps(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of MainSteps for query {}", query);
        Page<MainStepDTO> page = mainStepService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/main-steps");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
