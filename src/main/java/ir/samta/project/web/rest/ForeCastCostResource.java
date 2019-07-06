package ir.samta.project.web.rest;
import ir.samta.project.service.ForeCastCostService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.ForeCastCostDTO;
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
 * REST controller for managing ForeCastCost.
 */
@RestController
@RequestMapping("/api")
public class ForeCastCostResource {

    private final Logger log = LoggerFactory.getLogger(ForeCastCostResource.class);

    private static final String ENTITY_NAME = "foreCastCost";

    private final ForeCastCostService foreCastCostService;

    public ForeCastCostResource(ForeCastCostService foreCastCostService) {
        this.foreCastCostService = foreCastCostService;
    }

    /**
     * POST  /fore-cast-costs : Create a new foreCastCost.
     *
     * @param foreCastCostDTO the foreCastCostDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new foreCastCostDTO, or with status 400 (Bad Request) if the foreCastCost has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fore-cast-costs")
    public ResponseEntity<ForeCastCostDTO> createForeCastCost(@RequestBody ForeCastCostDTO foreCastCostDTO) throws URISyntaxException {
        log.debug("REST request to save ForeCastCost : {}", foreCastCostDTO);
        if (foreCastCostDTO.getId() != null) {
            throw new BadRequestAlertException("A new foreCastCost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ForeCastCostDTO result = foreCastCostService.save(foreCastCostDTO);
        return ResponseEntity.created(new URI("/api/fore-cast-costs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fore-cast-costs : Updates an existing foreCastCost.
     *
     * @param foreCastCostDTO the foreCastCostDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated foreCastCostDTO,
     * or with status 400 (Bad Request) if the foreCastCostDTO is not valid,
     * or with status 500 (Internal Server Error) if the foreCastCostDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fore-cast-costs")
    public ResponseEntity<ForeCastCostDTO> updateForeCastCost(@RequestBody ForeCastCostDTO foreCastCostDTO) throws URISyntaxException {
        log.debug("REST request to update ForeCastCost : {}", foreCastCostDTO);
        if (foreCastCostDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ForeCastCostDTO result = foreCastCostService.save(foreCastCostDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, foreCastCostDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fore-cast-costs : get all the foreCastCosts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of foreCastCosts in body
     */
    @GetMapping("/fore-cast-costs")
    public ResponseEntity<List<ForeCastCostDTO>> getAllForeCastCosts(Pageable pageable) {
        log.debug("REST request to get a page of ForeCastCosts");
        Page<ForeCastCostDTO> page = foreCastCostService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fore-cast-costs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /fore-cast-costs/:id : get the "id" foreCastCost.
     *
     * @param id the id of the foreCastCostDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the foreCastCostDTO, or with status 404 (Not Found)
     */
    @GetMapping("/fore-cast-costs/{id}")
    public ResponseEntity<ForeCastCostDTO> getForeCastCost(@PathVariable Long id) {
        log.debug("REST request to get ForeCastCost : {}", id);
        Optional<ForeCastCostDTO> foreCastCostDTO = foreCastCostService.findOne(id);
        return ResponseUtil.wrapOrNotFound(foreCastCostDTO);
    }

    /**
     * DELETE  /fore-cast-costs/:id : delete the "id" foreCastCost.
     *
     * @param id the id of the foreCastCostDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fore-cast-costs/{id}")
    public ResponseEntity<Void> deleteForeCastCost(@PathVariable Long id) {
        log.debug("REST request to delete ForeCastCost : {}", id);
        foreCastCostService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
