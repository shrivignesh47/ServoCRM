package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Meetings;
import com.mycompany.myapp.repository.MeetingsRepository;
import com.mycompany.myapp.service.MeetingsService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Meetings}.
 */
@RestController
@RequestMapping("/api/meetings")
public class MeetingsResource {

    private static final Logger log = LoggerFactory.getLogger(MeetingsResource.class);

    private static final String ENTITY_NAME = "meetings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeetingsService meetingsService;

    private final MeetingsRepository meetingsRepository;

    public MeetingsResource(MeetingsService meetingsService, MeetingsRepository meetingsRepository) {
        this.meetingsService = meetingsService;
        this.meetingsRepository = meetingsRepository;
    }

    /**
     * {@code POST  /meetings} : Create a new meetings.
     *
     * @param meetings the meetings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new meetings, or with status {@code 400 (Bad Request)} if the meetings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Meetings>> createMeetings(@Valid @RequestBody Meetings meetings) throws URISyntaxException {
        log.debug("REST request to save Meetings : {}", meetings);
        if (meetings.getId() != null) {
            throw new BadRequestAlertException("A new meetings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return meetingsService
            .save(meetings)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/meetings/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /meetings/:id} : Updates an existing meetings.
     *
     * @param id the id of the meetings to save.
     * @param meetings the meetings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated meetings,
     * or with status {@code 400 (Bad Request)} if the meetings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the meetings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Meetings>> updateMeetings(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Meetings meetings
    ) throws URISyntaxException {
        log.debug("REST request to update Meetings : {}, {}", id, meetings);
        if (meetings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, meetings.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return meetingsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return meetingsService
                    .update(meetings)
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
     * {@code PATCH  /meetings/:id} : Partial updates given fields of an existing meetings, field will ignore if it is null
     *
     * @param id the id of the meetings to save.
     * @param meetings the meetings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated meetings,
     * or with status {@code 400 (Bad Request)} if the meetings is not valid,
     * or with status {@code 404 (Not Found)} if the meetings is not found,
     * or with status {@code 500 (Internal Server Error)} if the meetings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Meetings>> partialUpdateMeetings(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Meetings meetings
    ) throws URISyntaxException {
        log.debug("REST request to partial update Meetings partially : {}, {}", id, meetings);
        if (meetings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, meetings.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return meetingsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Meetings> result = meetingsService.partialUpdate(meetings);

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
     * {@code GET  /meetings} : get all the meetings.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of meetings in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Meetings>>> getAllMeetings(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Meetings");
        return meetingsService
            .countAll()
            .zipWith(meetingsService.findAll(pageable).collectList())
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
     * {@code GET  /meetings/:id} : get the "id" meetings.
     *
     * @param id the id of the meetings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the meetings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Meetings>> getMeetings(@PathVariable("id") String id) {
        log.debug("REST request to get Meetings : {}", id);
        Mono<Meetings> meetings = meetingsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(meetings);
    }

    /**
     * {@code DELETE  /meetings/:id} : delete the "id" meetings.
     *
     * @param id the id of the meetings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteMeetings(@PathVariable("id") String id) {
        log.debug("REST request to delete Meetings : {}", id);
        return meetingsService
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
