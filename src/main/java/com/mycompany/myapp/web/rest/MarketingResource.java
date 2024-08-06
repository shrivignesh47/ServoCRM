package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Marketing;
import com.mycompany.myapp.repository.MarketingRepository;
import com.mycompany.myapp.service.MarketingService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Marketing}.
 */
@RestController
@RequestMapping("/api/marketings")
public class MarketingResource {

    private static final Logger log = LoggerFactory.getLogger(MarketingResource.class);

    private static final String ENTITY_NAME = "marketing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarketingService marketingService;

    private final MarketingRepository marketingRepository;

    public MarketingResource(MarketingService marketingService, MarketingRepository marketingRepository) {
        this.marketingService = marketingService;
        this.marketingRepository = marketingRepository;
    }

    /**
     * {@code POST  /marketings} : Create a new marketing.
     *
     * @param marketing the marketing to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new marketing, or with status {@code 400 (Bad Request)} if the marketing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Marketing>> createMarketing(@Valid @RequestBody Marketing marketing) throws URISyntaxException {
        log.debug("REST request to save Marketing : {}", marketing);
        if (marketing.getId() != null) {
            throw new BadRequestAlertException("A new marketing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return marketingService
            .save(marketing)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/marketings/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /marketings/:id} : Updates an existing marketing.
     *
     * @param id the id of the marketing to save.
     * @param marketing the marketing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marketing,
     * or with status {@code 400 (Bad Request)} if the marketing is not valid,
     * or with status {@code 500 (Internal Server Error)} if the marketing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Marketing>> updateMarketing(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Marketing marketing
    ) throws URISyntaxException {
        log.debug("REST request to update Marketing : {}, {}", id, marketing);
        if (marketing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marketing.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return marketingRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return marketingService
                    .update(marketing)
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
     * {@code PATCH  /marketings/:id} : Partial updates given fields of an existing marketing, field will ignore if it is null
     *
     * @param id the id of the marketing to save.
     * @param marketing the marketing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marketing,
     * or with status {@code 400 (Bad Request)} if the marketing is not valid,
     * or with status {@code 404 (Not Found)} if the marketing is not found,
     * or with status {@code 500 (Internal Server Error)} if the marketing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Marketing>> partialUpdateMarketing(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Marketing marketing
    ) throws URISyntaxException {
        log.debug("REST request to partial update Marketing partially : {}, {}", id, marketing);
        if (marketing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marketing.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return marketingRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Marketing> result = marketingService.partialUpdate(marketing);

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
     * {@code GET  /marketings} : get all the marketings.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of marketings in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Marketing>>> getAllMarketings(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Marketings");
        return marketingService
            .countAll()
            .zipWith(marketingService.findAll(pageable).collectList())
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
     * {@code GET  /marketings/:id} : get the "id" marketing.
     *
     * @param id the id of the marketing to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the marketing, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Marketing>> getMarketing(@PathVariable("id") String id) {
        log.debug("REST request to get Marketing : {}", id);
        Mono<Marketing> marketing = marketingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(marketing);
    }

    /**
     * {@code DELETE  /marketings/:id} : delete the "id" marketing.
     *
     * @param id the id of the marketing to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteMarketing(@PathVariable("id") String id) {
        log.debug("REST request to delete Marketing : {}", id);
        return marketingService
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
