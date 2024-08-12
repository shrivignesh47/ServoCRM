package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Whatsappmarketing;
import com.mycompany.myapp.repository.WhatsappmarketingRepository;
import com.mycompany.myapp.service.WhatsappmarketingService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.ForwardedHeaderUtils;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Whatsappmarketing}.
 */
@RestController
@RequestMapping("/api/whatsappmarketings")
public class WhatsappmarketingResource {

    private static final Logger log = LoggerFactory.getLogger(WhatsappmarketingResource.class);

    private static final String ENTITY_NAME = "whatsappmarketing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WhatsappmarketingService whatsappmarketingService;

    private final WhatsappmarketingRepository whatsappmarketingRepository;

    public WhatsappmarketingResource(
        WhatsappmarketingService whatsappmarketingService,
        WhatsappmarketingRepository whatsappmarketingRepository
    ) {
        this.whatsappmarketingService = whatsappmarketingService;
        this.whatsappmarketingRepository = whatsappmarketingRepository;
    }

    /**
     * {@code POST  /whatsappmarketings} : Create a new whatsappmarketing.
     *
     * @param whatsappmarketing the whatsappmarketing to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new whatsappmarketing, or with status {@code 400 (Bad Request)} if the whatsappmarketing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Whatsappmarketing>> createWhatsappmarketing(@Valid @RequestBody Whatsappmarketing whatsappmarketing)
        throws URISyntaxException {
        log.debug("REST request to save Whatsappmarketing : {}", whatsappmarketing);
        if (whatsappmarketing.getId() != null) {
            throw new BadRequestAlertException("A new whatsappmarketing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return whatsappmarketingService
            .save(whatsappmarketing)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/whatsappmarketings/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /whatsappmarketings/:id} : Updates an existing whatsappmarketing.
     *
     * @param id the id of the whatsappmarketing to save.
     * @param whatsappmarketing the whatsappmarketing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated whatsappmarketing,
     * or with status {@code 400 (Bad Request)} if the whatsappmarketing is not valid,
     * or with status {@code 500 (Internal Server Error)} if the whatsappmarketing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Whatsappmarketing>> updateWhatsappmarketing(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Whatsappmarketing whatsappmarketing
    ) throws URISyntaxException {
        log.debug("REST request to update Whatsappmarketing : {}, {}", id, whatsappmarketing);
        if (whatsappmarketing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, whatsappmarketing.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return whatsappmarketingRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return whatsappmarketingService
                    .update(whatsappmarketing)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        result ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.getId()))
                                .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /whatsappmarketings/:id} : Partial updates given fields of an existing whatsappmarketing, field will ignore if it is null
     *
     * @param id the id of the whatsappmarketing to save.
     * @param whatsappmarketing the whatsappmarketing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated whatsappmarketing,
     * or with status {@code 400 (Bad Request)} if the whatsappmarketing is not valid,
     * or with status {@code 404 (Not Found)} if the whatsappmarketing is not found,
     * or with status {@code 500 (Internal Server Error)} if the whatsappmarketing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Whatsappmarketing>> partialUpdateWhatsappmarketing(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Whatsappmarketing whatsappmarketing
    ) throws URISyntaxException {
        log.debug("REST request to partial update Whatsappmarketing partially : {}, {}", id, whatsappmarketing);
        if (whatsappmarketing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, whatsappmarketing.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return whatsappmarketingRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Whatsappmarketing> result = whatsappmarketingService.partialUpdate(whatsappmarketing);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        res ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, res.getId()))
                                .body(res)
                    );
            });
    }

    /**
     * {@code GET  /whatsappmarketings} : get all the whatsappmarketings.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of whatsappmarketings in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Whatsappmarketing>>> getAllWhatsappmarketings(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Whatsappmarketings");
        return whatsappmarketingService
            .countAll()
            .zipWith(whatsappmarketingService.findAll(pageable).collectList())
            .map(
                countWithEntities ->
                    ResponseEntity.ok()
                        .headers(
                            PaginationUtil.generatePaginationHttpHeaders(
                                ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(), request.getHeaders()),
                                new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                            )
                        )
                        .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /whatsappmarketings/:id} : get the "id" whatsappmarketing.
     *
     * @param id the id of the whatsappmarketing to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the whatsappmarketing, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Whatsappmarketing>> getWhatsappmarketing(@PathVariable("id") String id) {
        log.debug("REST request to get Whatsappmarketing : {}", id);
        Mono<Whatsappmarketing> whatsappmarketing = whatsappmarketingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(whatsappmarketing);
    }

    /**
     * {@code DELETE  /whatsappmarketings/:id} : delete the "id" whatsappmarketing.
     *
     * @param id the id of the whatsappmarketing to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteWhatsappmarketing(@PathVariable("id") String id) {
        log.debug("REST request to delete Whatsappmarketing : {}", id);
        return whatsappmarketingService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id))
                        .build()
                )
            );
    }
}
