package ir.samta.project.web.rest;
import ir.samta.project.service.CollageEducationService;
import ir.samta.project.web.rest.errors.BadRequestAlertException;
import ir.samta.project.web.rest.util.HeaderUtil;
import ir.samta.project.web.rest.util.PaginationUtil;
import ir.samta.project.service.dto.CollageEducationDTO;
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
 * REST controller for managing CollageEducation.
 */
@RestController
@RequestMapping("/api")
public class CollageEducationResource {

    private final Logger log = LoggerFactory.getLogger(CollageEducationResource.class);

    private static final String ENTITY_NAME = "collageEducation";

    private final CollageEducationService collageEducationService;

    public CollageEducationResource(CollageEducationService collageEducationService) {
        this.collageEducationService = collageEducationService;
    }

    /**
     * POST  /collage-educations : Create a new collageEducation.
     *
     * @param collageEducationDTO the collageEducationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new collageEducationDTO, or with status 400 (Bad Request) if the collageEducation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/collage-educations")
    public ResponseEntity<CollageEducationDTO> createCollageEducation(@RequestBody CollageEducationDTO collageEducationDTO) throws URISyntaxException {
        log.debug("REST request to save CollageEducation : {}", collageEducationDTO);
        if (collageEducationDTO.getId() != null) {
            throw new BadRequestAlertException("A new collageEducation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CollageEducationDTO result = collageEducationService.save(collageEducationDTO);
        return ResponseEntity.created(new URI("/api/collage-educations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /collage-educations : Updates an existing collageEducation.
     *
     * @param collageEducationDTO the collageEducationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated collageEducationDTO,
     * or with status 400 (Bad Request) if the collageEducationDTO is not valid,
     * or with status 500 (Internal Server Error) if the collageEducationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/collage-educations")
    public ResponseEntity<CollageEducationDTO> updateCollageEducation(@RequestBody CollageEducationDTO collageEducationDTO) throws URISyntaxException {
        log.debug("REST request to update CollageEducation : {}", collageEducationDTO);
        if (collageEducationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CollageEducationDTO result = collageEducationService.save(collageEducationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, collageEducationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /collage-educations : get all the collageEducations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of collageEducations in body
     */
    @GetMapping("/collage-educations")
    public ResponseEntity<List<CollageEducationDTO>> getAllCollageEducations(Pageable pageable) {
        log.debug("REST request to get a page of CollageEducations");
        Page<CollageEducationDTO> page = collageEducationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/collage-educations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /collage-educations/:id : get the "id" collageEducation.
     *
     * @param id the id of the collageEducationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the collageEducationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/collage-educations/{id}")
    public ResponseEntity<CollageEducationDTO> getCollageEducation(@PathVariable Long id) {
        log.debug("REST request to get CollageEducation : {}", id);
        Optional<CollageEducationDTO> collageEducationDTO = collageEducationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(collageEducationDTO);
    }

    /**
     * DELETE  /collage-educations/:id : delete the "id" collageEducation.
     *
     * @param id the id of the collageEducationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/collage-educations/{id}")
    public ResponseEntity<Void> deleteCollageEducation(@PathVariable Long id) {
        log.debug("REST request to delete CollageEducation : {}", id);
        collageEducationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
