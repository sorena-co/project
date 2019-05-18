package ir.samta.project.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import ir.samta.project.service.DocumentWordService;
import ir.samta.project.service.dto.DocumentWordDTO;
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
 * REST controller for managing DocumentWord.
 */
@RestController
@RequestMapping("/api")
public class DocumentWordResource {

    private static final String ENTITY_NAME = "documentWord";
    private final Logger log = LoggerFactory.getLogger(DocumentWordResource.class);
    private final DocumentWordService documentWordService;

    public DocumentWordResource(DocumentWordService documentWordService) {
        this.documentWordService = documentWordService;
    }

    /**
     * POST  /document-words : Create a new documentWord.
     *
     * @param documentWordDTO the documentWordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentWordDTO, or with status 400 (Bad Request) if the documentWord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-words")
    public ResponseEntity<DocumentWordDTO> createDocumentWord(@RequestBody DocumentWordDTO documentWordDTO) throws URISyntaxException {
        log.debug("REST request to save DocumentWord : {}", documentWordDTO);
        if (documentWordDTO.getId() != null) {
            throw new BadRequestAlertException("A new documentWord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentWordDTO result = documentWordService.save(documentWordDTO);
        return ResponseEntity.created(new URI("/api/document-words/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-words : Updates an existing documentWord.
     *
     * @param documentWordDTO the documentWordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentWordDTO,
     * or with status 400 (Bad Request) if the documentWordDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentWordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-words")
    public ResponseEntity<DocumentWordDTO> updateDocumentWord(@RequestBody DocumentWordDTO documentWordDTO) throws URISyntaxException {
        log.debug("REST request to update DocumentWord : {}", documentWordDTO);
        if (documentWordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentWordDTO result = documentWordService.save(documentWordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentWordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-words : get all the documentWords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of documentWords in body
     */
    @GetMapping("/document-words/{documentId}/document")
    public ResponseEntity<List<DocumentWordDTO>> getAllDocumentWords(@PathVariable Long documentId, Pageable pageable) {
        log.debug("REST request to get a page of DocumentWords");
        Page<DocumentWordDTO> page = documentWordService.findAll(documentId,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/document-words");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /document-words/:id : get the "id" documentWord.
     *
     * @param id the id of the documentWordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentWordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/document-words/{id}")
    public ResponseEntity<DocumentWordDTO> getDocumentWord(@PathVariable Long id) {
        log.debug("REST request to get DocumentWord : {}", id);
        Optional<DocumentWordDTO> documentWordDTO = documentWordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(documentWordDTO);
    }

    /**
     * DELETE  /document-words/:id : delete the "id" documentWord.
     *
     * @param id the id of the documentWordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-words/{id}")
    public ResponseEntity<Void> deleteDocumentWord(@PathVariable Long id) {
        log.debug("REST request to delete DocumentWord : {}", id);
        documentWordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/document-words?query=:query : search for the documentWord corresponding
     * to the query.
     *
     * @param query    the query of the documentWord search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/document-words")
    public ResponseEntity<List<DocumentWordDTO>> searchDocumentWords(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DocumentWords for query {}", query);
        Page<DocumentWordDTO> page = documentWordService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/document-words");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
